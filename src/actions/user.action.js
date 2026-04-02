"use server";
import {auth, getAllUsers} from "@/lib/auth";
import connectDB from "@/lib/db";
import {convertToObject, requireAdmin} from "@/lib/utility";
import {User} from "@/models/user.model";
import {revalidatePath} from "next/cache";
import {headers} from "next/headers";
import {getCurrentUser} from "@/lib/auth";
import {Enrollment} from "@/models/enrollment.model";

import {z} from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  university: z.string().optional(),
});

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  bio: z.string().max(500, "Bio must be less than 500 characters.").optional(),
  university: z.string().optional(),
  researchInterests: z.array(z.string()).optional(),
  socialLinks: z.record(z.string().url("Invalid URL format.").or(z.string().length(0))).optional(),
  profileImage: z.string().url("Invalid image URL.").or(z.string().length(0)).optional(),
});

export async function registerUser(formData) {
  try {
    const validated = registerSchema.parse(formData);
    const {name, email, password, university} = validated;

    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        university,
      },
    });

    return {success: true, data: convertToObject(response)};
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {success: false, error: error.errors[0].message};
    }
    return {success: false, error: error.message};
  }
}

export async function loginUser(formData) {
  try {
    const {email, password} = formData;

    const response = await auth.api.signInEmail({
      body: {email, password},
    });

    return {success: true, data: convertToObject(response)};
  } catch (error) {
    return {success: false, error: error.message};
  }
}

export async function updateProfile(data) {
  try {
    const validated = profileSchema.parse(data);
    const response = await auth.api.updateUser({
      headers: await headers(),
      body: {
        name: validated.name,
        bio: validated.bio,
        university: validated.university,
        researchInterests: validated.researchInterests,
        socialLinks: JSON.stringify(validated.socialLinks),
        profileImage: validated.profileImage,
      },
    });

    revalidatePath("/profile");
    return {success: true, data: response};
  } catch (error) {
    if (error instanceof z.ZodError) {
       return {success: false, error: error.errors[0].message};
    }
    return {success: false, error: error.message};
  }
}

export async function getMemberStats() {
  try {
    const users = await getAllUsers();
    return {
      success: true,
      data: {
        total: users.length,
        members: users.filter((u) => u.role === "member").length,
        advisors: users.filter((u) => u.role === "advisor").length,
        corePanel: users.filter((u) => u.role === "core_panel").length,
      },
    };
  } catch (error) {
    return {success: false, error: error.message};
  }
}

export async function getMembers() {
  try {
    await connectDB();
    const users = await User.find({})
      .sort({createdAt: -1})
      .lean();
    return {success: true, data: convertToObject(users)};
  } catch (error) {
    return {success: false, error: error.message};
  }
}

export async function adminGetAllUsers() {
  try {
    await connectDB();

    const {authorized, response} = await requireAdmin();
    if (!authorized) return response;

    const allUsers = await User.find({})
      .sort({createdAt: -1})
      .lean();
    return {success: true, data: convertToObject(allUsers)};
  } catch (error) {
    console.error("adminGetAllUsers error:", error);
    return {success: false, message: error.message || "Something went wrong."};
  }
}

export async function changeRole(userId, role) {
  try {
    await connectDB();

    const {authorized, response} = await requireAdmin();
    if (!authorized) return response;

    const validRoles = ["member", "advisor", "core_panel", "admin"];
    if (!validRoles.includes(role)) {
      return {success: false, message: "Invalid role."};
    }

    await auth.api.setRole({
      body: {userId, role},
      headers: await headers(),
    });

    revalidatePath("/admin/members");
    revalidatePath("/members");

    return {success: true, message: `Role updated to ${role}.`};
  } catch (error) {
    console.error("changeRole error:", error);
    return {success: false, message: error.message || "Something went wrong."};
  }
}

export async function deleteUser(userId) {
  try {
    await connectDB();

    const {authorized, response} = await requireAdmin();
    if (!authorized) return response;

    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return {success: false, message: "User not found."};
    }

    // Prevention: Cannot delete oneself or other admins easily if needed,
    // but here we allow it if they really want to.
    // However, safety first: check if user is the current user.
    const currentUser = await getCurrentUser();
    if (currentUser.user?.id === userId) {
      return {success: false, message: "You cannot delete your own account from here."};
    }

    // 1. Delete user via Better-Auth Admin API
    // This handles the primary 'user' collection, sessions, and accounts
    await auth.api.removeUser({
      body: {userId},
      headers: await headers(),
    });

    // 2. Cleanup associated enrollments (Mongoose related)
    await Enrollment.deleteMany({user: userId});

    revalidatePath("/admin/members");
    revalidatePath("/members");

    return {
      success: true,
      message: `User ${userToDelete.name} and all their data have been permanently deleted.`,
    };
  } catch (error) {
    console.error("deleteUser error:", error);
    return {success: false, message: error.message || "Something went wrong during deletion."};
  }
}
