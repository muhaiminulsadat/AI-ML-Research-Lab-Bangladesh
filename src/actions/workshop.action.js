"use server";

import connectDB from "@/lib/db";
import {Workshop} from "@/models/workshop.model";
import {WorkshopRegistration} from "@/models/workshopRegistration.model";
import {User} from "@/models/user.model";
import {requireAdmin, convertToObject} from "@/lib/utility";
import {getCurrentUser} from "@/lib/auth";
import {sendWorkshopApprovalEmail} from "@/lib/mail";
import {z} from "zod";

// --- WORKSHOP SCHEMA VALIDATION ---

const workshopSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().optional().or(z.literal("")),
  venue: z.string().optional().or(z.literal("")),
  university: z.string().optional().or(z.literal("")),
  banner_image: z
    .string()
    .url("Invalid image URL")
    .optional()
    .or(z.literal("")),
  status: z.enum(["upcoming", "ongoing", "past"]).default("upcoming"),
  registration_open: z.boolean().default(true),
  accepts_speakers: z.boolean().default(true),
  seats_total: z.number().int().positive().optional().or(z.nan()),
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional(),
  registration_deadline: z.coerce.date().optional(),
  speaker_deadline: z.coerce.date().optional(),
  max_speakers: z.number().int().positive().optional().or(z.nan()),
});

// Helper for generating sluggified titles
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

// --- WORKSHOP ACTIONS ---

export async function getWorkshops(status) {
  try {
    await connectDB();
    const query = status ? {status} : {};
    const workshops = await Workshop.find(query).sort({createdAt: -1}).lean();

    return {
      success: true,
      data: convertToObject(workshops),
    };
  } catch (error) {
    console.error("Error fetching workshops:", error);
    return {success: false, message: "Failed to fetch workshops."};
  }
}

export async function getWorkshopBySlug(slug) {
  try {
    await connectDB();
    const workshop = await Workshop.findOne({slug}).lean();

    if (!workshop) {
      return {success: false, message: "Workshop not found."};
    }

    return {
      success: true,
      data: convertToObject(workshop),
    };
  } catch (error) {
    console.error("Error fetching workshop by slug:", error);
    return {success: false, message: "Failed to fetch workshop."};
  }
}

export async function createWorkshop(data) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) return adminCheck.response;

    const validated = workshopSchema.parse(data);
    await connectDB();

    let slug = generateSlug(validated.title);
    let existingPath = await Workshop.findOne({slug});
    let counter = 1;
    while (existingPath) {
      slug = `${generateSlug(validated.title)}-${counter}`;
      existingPath = await Workshop.findOne({slug});
      counter++;
    }

    const newWorkshop = await Workshop.create({
      ...validated,
      slug,
      created_by: adminCheck.user.id,
    });

    return {
      success: true,
      message: "Workshop created successfully.",
      data: convertToObject(newWorkshop),
    };
  } catch (error) {
    if (error?.name === "ZodError") {
      return {
        success: false,
        message:
          error.issues?.[0]?.message ||
          error.errors?.[0]?.message ||
          "Validation error",
      };
    }
    console.error("Error creating workshop:", error);
    return {success: false, message: "Failed to create workshop."};
  }
}

export async function updateWorkshop(id, data) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) return adminCheck.response;

    const validated = workshopSchema.parse(data);
    await connectDB();

    const updated = await Workshop.findByIdAndUpdate(id, validated, {
      new: true,
    }).lean();

    if (!updated) {
      return {success: false, message: "Workshop not found."};
    }

    return {
      success: true,
      message: "Workshop updated successfully.",
      data: convertToObject(updated),
    };
  } catch (error) {
    if (error?.name === "ZodError") {
      return {
        success: false,
        message:
          error.issues?.[0]?.message ||
          error.errors?.[0]?.message ||
          "Validation error",
      };
    }
    console.error("Error updating workshop:", error);
    return {success: false, message: "Failed to update workshop."};
  }
}

export async function deleteWorkshop(id) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) return adminCheck.response;

    await connectDB();
    await Workshop.findByIdAndDelete(id);
    // Also delete associated registrations
    await WorkshopRegistration.deleteMany({workshop_id: id});

    return {success: true, message: "Workshop deleted successfully."};
  } catch (error) {
    console.error("Error deleting workshop:", error);
    return {success: false, message: "Failed to delete workshop."};
  }
}

// --- REGISTRATION SCHEMA VALIDATION ---

const registrationSchema = z.object({
  workshop_id: z.string().min(1, "Workshop ID is required"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  institution: z.string().min(2, "Institution is required"),
  designation: z.string().optional(),
  student_id: z.string().optional(),
  phone: z.string().optional(),
  participation_type: z.enum(["participant", "speaker"]),
  speaker_details: z
    .object({
      presentation_title: z.string().min(1, "Title is required"),
      abstract: z.string().min(1, "Abstract is required"),
      presentation_type: z.enum(["paper", "poster", "demo", "keynote"]),
      co_authors: z.string().optional(),
      file_url: z.string().optional(),
    })
    .optional(),
});

// --- REGISTRATION ACTIONS ---

export async function checkAlreadyRegistered(workshopId, email) {
  try {
    await connectDB();
    const existing = await WorkshopRegistration.findOne({
      workshop_id: workshopId,
      email: email.toLowerCase(),
    });
    return {success: true, registered: !!existing};
  } catch (error) {
    console.error("Error checking registration:", error);
    return {success: false, message: "Failed to check registration status."};
  }
}

export async function registerForWorkshop(formData) {
  try {
    await connectDB();
    const {user} = await getCurrentUser();
    let dataToValidate = {...formData};

    let isSiteUser = false;
    let userId = null;

    // Pull from session if logged in
    if (user) {
      isSiteUser = true;
      userId = user.id;

      const dbUser = await User.findById(user.id);
      dataToValidate = {
        ...dataToValidate,
        name: dbUser?.name || user.name,
        email: dbUser?.email || user.email,
        institution: dbUser?.university || dbUser?.institution || "",
      };
    }

    const validated = registrationSchema.parse(dataToValidate);

    // Ensure workshop exists and registration is open
    const workshop = await Workshop.findById(validated.workshop_id);
    if (!workshop) {
      return {success: false, message: "Workshop not found"};
    }
    if (!workshop.registration_open) {
      return {
        success: false,
        message: "Registration is currently closed for this workshop",
      };
    }
    if (workshop.seats_total && workshop.seats_filled >= workshop.seats_total) {
      return {success: false, message: "Workshop has reached maximum capacity"};
    }

    // Check for duplicate
    const existing = await WorkshopRegistration.findOne({
      workshop_id: validated.workshop_id,
      email: validated.email.toLowerCase(),
    });

    if (existing) {
      return {
        success: false,
        message: "You have already registered for this workshop",
      };
    }

    // Create registration
    const newRegistration = await WorkshopRegistration.create({
      ...validated,
      user_id: userId,
      is_site_user: isSiteUser,
    });

    // Increment seats
    await Workshop.findByIdAndUpdate(validated.workshop_id, {
      $inc: {seats_filled: 1},
    });

    return {
      success: true,
      message: "Successfully registered for the workshop!",
      data: convertToObject(newRegistration),
    };
  } catch (error) {
    if (error?.name === "ZodError") {
      return {
        success: false,
        message:
          error.issues?.[0]?.message ||
          error.errors?.[0]?.message ||
          "Validation error",
      };
    }
    console.error("Error registering for workshop:", error);
    return {
      success: false,
      message: error?.message || "Failed to register for workshop.",
    };
  }
}

export async function getMyRegistrations() {
  try {
    const {user} = await getCurrentUser();
    if (!user) {
      return {success: false, message: "Unauthorized"};
    }

    await connectDB();
    const registrations = await WorkshopRegistration.find({user_id: user.id})
      .populate(
        "workshop_id",
        "title slug start_date venue banner_image accepts_speakers",
      )
      .sort({createdAt: -1})
      .lean();

    return {
      success: true,
      data: convertToObject(registrations),
    };
  } catch (error) {
    console.error("Error fetching user registrations:", error);
    return {success: false, message: "Failed to fetch registrations."};
  }
}

export async function cancelRegistration(id) {
  try {
    const {user} = await getCurrentUser();
    if (!user) {
      return {success: false, message: "Unauthorized"};
    }

    await connectDB();
    const registration = await WorkshopRegistration.findById(id);

    if (!registration) {
      return {success: false, message: "Registration not found"};
    }

    if (registration.user_id?.toString() !== user.id) {
      return {
        success: false,
        message: "You can only cancel your own registrations",
      };
    }

    // Decrement workshop seats_filled
    await Workshop.findByIdAndUpdate(registration.workshop_id, {
      $inc: {seats_filled: -1},
    });

    await WorkshopRegistration.findByIdAndDelete(id);

    return {success: true, message: "Registration cancelled successfully"};
  } catch (error) {
    console.error("Error cancelling registration:", error);
    return {success: false, message: "Failed to cancel registration."};
  }
}

// --- ADMIN REGISTRATION ACTIONS ---

export async function getAllRegistrations(workshopId, type = "all") {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) return adminCheck.response;

    await connectDB();
    const query = {workshop_id: workshopId};
    if (type === "participant") query.participation_type = "participant";
    if (type === "speaker") query.participation_type = "speaker";

    const registrations = await WorkshopRegistration.find(query)
      .populate("user_id", "profileImage")
      .sort({createdAt: -1})
      .lean();

    return {
      success: true,
      data: convertToObject(registrations),
    };
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return {success: false, message: "Failed to fetch registrations."};
  }
}

export async function updateRegistrationStatus(id, status) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) return adminCheck.response;

    await connectDB();
    const updated = await WorkshopRegistration.findByIdAndUpdate(
      id,
      {
        status,
        reviewed_at: new Date(),
        reviewed_by: adminCheck.user.id,
      },
      {new: true},
    )
      .populate("workshop_id", "title")
      .lean();

    if (updated && status === "approved" && updated.email) {
      // Fire it asynchronously so we don't block the request response
      sendWorkshopApprovalEmail(
        updated.email,
        updated.name || "Participant",
        updated.workshop_id?.title || "ML & AI Research Lab Workshop",
      );
    }

    return {
      success: true,
      message: "Status updated successfully",
      data: convertToObject(updated),
    };
  } catch (error) {
    console.error("Error updating registration status:", error);
    return {success: false, message: "Failed to update status."};
  }
}

export async function updateSpeakerStatus(id, speakerStatus) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) return adminCheck.response;

    await connectDB();
    const updated = await WorkshopRegistration.findByIdAndUpdate(
      id,
      {
        speaker_status: speakerStatus,
        reviewed_at: new Date(),
        reviewed_by: adminCheck.user.id,
      },
      {new: true},
    ).lean();

    return {
      success: true,
      message: "Speaker status updated successfully",
      data: convertToObject(updated),
    };
  } catch (error) {
    console.error("Error updating speaker status:", error);
    return {success: false, message: "Failed to update speaker status."};
  }
}

export async function deleteWorkshopRegistration(id) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) return adminCheck.response;

    await connectDB();

    const registration = await WorkshopRegistration.findById(id);
    if (!registration) {
      return {success: false, message: "Registration not found."};
    }

    await Workshop.findByIdAndUpdate(registration.workshop_id, {
      $inc: {seats_filled: -1},
    });

    await WorkshopRegistration.findByIdAndDelete(id);

    return {success: true, message: "Registration removed successfully."};
  } catch (error) {
    console.error("Error deleting registration:", error);
    return {success: false, message: "Failed to remove registration."};
  }
}

export async function exportRegistrations(workshopId) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) return adminCheck.response;

    await connectDB();
    const registrations = await WorkshopRegistration.find({
      workshop_id: workshopId,
    })
      .populate("workshop_id", "title")
      .sort({createdAt: -1})
      .lean();

    return {
      success: true,
      data: convertToObject(registrations),
    };
  } catch (error) {
    console.error("Error exporting registrations:", error);
    return {success: false, message: "Failed to export registrations."};
  }
}
