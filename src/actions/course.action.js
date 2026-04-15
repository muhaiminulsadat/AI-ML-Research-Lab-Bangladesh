"use server";

import connectDB from "@/lib/db";
import {Course} from "@/models/course.model";
import {User} from "@/models/user.model";
import {requireAdmin, convertToObject} from "@/lib/utility";
import {getCurrentUser} from "@/lib/auth";
import {cacheTag, revalidateTag} from "next/cache";

import {z} from "zod";

const courseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  instructor: z.string().min(1, "Instructor ID is required."),
  difficulty: z
    .enum(["beginner", "intermediate", "advanced"])
    .default("beginner"),
  thumbnail: z
    .string()
    .url("Invalid thumbnail URL.")
    .optional()
    .or(z.string().length(0)),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional().default(false),
});

export async function createCourse(data) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) {
      return adminCheck.response;
    }

    const validated = courseSchema.parse(data);
    await connectDB();

    const newCourse = await Course.create({
      ...validated,
      modules: [],
    });

    revalidateTag("courses");

    return {
      success: true,
      message: "Course created successfully.",
      data: convertToObject(newCourse),
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
    console.error("Error creating course:", error);
    return {
      success: false,
      message: "Failed to create course. Please try again.",
    };
  }
}

async function getCachedCourses() {
  "use cache";
  cacheTag("courses");
  try {
    await connectDB();
    const courses = await Course.find({isPublished: true})
      .populate("instructor", "name email profileImage")
      .sort({createdAt: -1})
      .lean();

    return {
      success: true,
      message: "Courses retrieved successfully.",
      data: convertToObject(courses),
    };
  } catch (error) {
    console.error("Error fetching cached courses:", error);
    return {
      success: false,
      message: "Failed to fetch courses. Please try again.",
    };
  }
}

export async function getCourses(isAdminView = false) {
  if (!isAdminView) {
    return getCachedCourses();
  }

  try {
    await connectDB();

    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) {
      return adminCheck.response;
    }

    const courses = await Course.find({})
      .populate("instructor", "name email profileImage")
      .sort({createdAt: -1})
      .lean();

    return {
      success: true,
      message: "Courses retrieved successfully.",
      data: convertToObject(courses),
    };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return {
      success: false,
      message: "Failed to fetch courses. Please try again.",
    };
  }
}

async function getCachedCourseById(courseId) {
  "use cache";
  cacheTag(`courses-${courseId}`);
  try {
    await connectDB();

    const course = await Course.findOne({_id: courseId, isPublished: true})
      .populate("instructor", "name email profileImage")
      .lean();

    if (!course) {
      return {success: false, message: "Course not found."};
    }

    return {
      success: true,
      message: "Course retrieved successfully.",
      data: convertToObject(course),
    };
  } catch (error) {
    console.error("Error fetching cached course by ID:", error);
    return {
      success: false,
      message: "Failed to fetch course. Please try again.",
    };
  }
}

export async function getCourseById(courseId, isAdminView = false) {
  if (!isAdminView) {
    return getCachedCourseById(courseId);
  }

  try {
    await connectDB();

    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) {
      return adminCheck.response;
    }

    const course = await Course.findOne({_id: courseId})
      .populate("instructor", "name email profileImage")
      .lean();

    if (!course) {
      return {success: false, message: "Course not found."};
    }

    return {
      success: true,
      message: "Course retrieved successfully.",
      data: convertToObject(course),
    };
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    return {
      success: false,
      message: "Failed to fetch course. Please try again.",
    };
  }
}

/**
 * Adds a new module to a course. Admin only.
 */
export async function addModuleToCourse(courseId, data) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) {
      return adminCheck.response;
    }

    await connectDB();

    const {title} = data;

    if (!title) {
      return {success: false, message: "Module title is required."};
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return {success: false, message: "Course not found."};
    }

    // Determine order
    const nextOrder =
      course.modules.length > 0
        ? Math.max(...course.modules.map((m) => m.order)) + 1
        : 1;

    const newModule = {
      title,
      order: nextOrder,
      lectures: [],
    };

    course.modules.push(newModule);
    await course.save();

    return {
      success: true,
      message: "Module added successfully.",
      data: convertToObject(course),
    };
  } catch (error) {
    console.error("Error adding module:", error);
    return {success: false, message: "Failed to add module. Please try again."};
  }
}

/**
 * Toggles the publish state of a course. Admin only.
 */
export async function toggleCoursePublish(courseId, isPublished) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) {
      return adminCheck.response;
    }

    await connectDB();

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {isPublished},
      {returnDocument: 'after'},
    ).lean();

    if (!updatedCourse) {
      return {success: false, message: "Course not found."};
    }

    revalidateTag("courses");
    revalidateTag(`courses-${courseId}`);

    return {
      success: true,
      message: `Course ${isPublished ? "published" : "unpublished"} successfully.`,
      data: convertToObject(updatedCourse),
    };
  } catch (error) {
    console.error("Error publishing course:", error);
    return {success: false, message: "Failed to update course status."};
  }
}

/**
 * Adds a new lecture to a specific module in a course. Admin only.
 */
export async function addLectureToModule(courseId, moduleId, data) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) {
      return adminCheck.response;
    }

    await connectDB();

    const {title, youtubeId, duration} = data;

    if (!title || !youtubeId) {
      return {success: false, message: "Title and YouTube ID are required."};
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return {success: false, message: "Course not found."};
    }

    const module = course.modules.id(moduleId);
    if (!module) {
      return {success: false, message: "Module not found."};
    }

    // Determine order
    const nextOrder =
      module.lectures.length > 0
        ? Math.max(...module.lectures.map((l) => l.order)) + 1
        : 1;

    module.lectures.push({
      title,
      youtubeId,
      duration: duration || 0,
      order: nextOrder,
    });

    await course.save();

    revalidateTag("courses");
    revalidateTag(`courses-${courseId}`);

    return {
      success: true,
      message: "Lecture added successfully.",
      data: convertToObject(course),
    };
  } catch (error) {
    console.error("Error adding lecture:", error);
    return {
      success: false,
      message: "Failed to add lecture. Please try again.",
    };
  }
}

export async function updateCourse(courseId, data) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) return adminCheck.response;

    await connectDB();

    const {title, description, thumbnail, tags, difficulty} = data;

    if (!title || !description) {
      return {success: false, message: "Title and description are required."};
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        title,
        description,
        thumbnail: thumbnail || undefined,
        tags: tags || [],
        difficulty: difficulty || "beginner",
      },
      {returnDocument: 'after'},
    )
      .populate("instructor", "name email profileImage")
      .lean();

    if (!updatedCourse) {
      return {success: false, message: "Course not found."};
    }

    revalidateTag("courses");
    revalidateTag(`courses-${courseId}`);

    return {
      success: true,
      message: "Course updated successfully.",
      data: convertToObject(updatedCourse),
    };
  } catch (error) {
    console.error("Error updating course:", error);
    return {success: false, message: "Failed to update course."};
  }
}

export async function deleteCourse(courseId) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) return adminCheck.response;

    await connectDB();

    const deleted = await Course.findByIdAndDelete(courseId);

    if (!deleted) {
      return {success: false, message: "Course not found."};
    }

    revalidateTag("courses");
    revalidateTag(`courses-${courseId}`);

    return {success: true, message: "Course deleted successfully."};
  } catch (error) {
    console.error("Error deleting course:", error);
    return {success: false, message: "Failed to delete course."};
  }
}

export async function updateModule(courseId, moduleId, data) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) return adminCheck.response;

    await connectDB();

    const {title} = data;

    if (!title) {
      return {success: false, message: "Module title is required."};
    }

    const course = await Course.findById(courseId);
    if (!course) return {success: false, message: "Course not found."};

    const module = course.modules.id(moduleId);
    if (!module) return {success: false, message: "Module not found."};

    module.title = title;
    await course.save();

    revalidateTag("courses");
    revalidateTag(`courses-${courseId}`);

    return {
      success: true,
      message: "Module updated successfully.",
      data: convertToObject(course),
    };
  } catch (error) {
    console.error("Error updating module:", error);
    return {success: false, message: "Failed to update module."};
  }
}

export async function deleteModule(courseId, moduleId) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) return adminCheck.response;

    await connectDB();

    const course = await Course.findById(courseId);
    if (!course) return {success: false, message: "Course not found."};

    const module = course.modules.id(moduleId);
    if (!module) return {success: false, message: "Module not found."};

    course.modules.pull(moduleId);
    await course.save();

    revalidateTag("courses");
    revalidateTag(`courses-${courseId}`);

    return {
      success: true,
      message: "Module deleted successfully.",
      data: convertToObject(course),
    };
  } catch (error) {
    console.error("Error deleting module:", error);
    return {success: false, message: "Failed to delete module."};
  }
}

export async function updateLecture(courseId, moduleId, lectureId, data) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) return adminCheck.response;

    await connectDB();

    const {title, youtubeId, duration} = data;

    if (!title || !youtubeId) {
      return {success: false, message: "Title and YouTube ID are required."};
    }

    const course = await Course.findById(courseId);
    if (!course) return {success: false, message: "Course not found."};

    const module = course.modules.id(moduleId);
    if (!module) return {success: false, message: "Module not found."};

    const lecture = module.lectures.id(lectureId);
    if (!lecture) return {success: false, message: "Lecture not found."};

    lecture.title = title;
    lecture.youtubeId = youtubeId;
    lecture.duration = duration || 0;

    await course.save();

    revalidateTag("courses");
    revalidateTag(`courses-${courseId}`);

    return {
      success: true,
      message: "Lecture updated successfully.",
      data: convertToObject(course),
    };
  } catch (error) {
    console.error("Error updating lecture:", error);
    return {success: false, message: "Failed to update lecture."};
  }
}

export async function deleteLecture(courseId, moduleId, lectureId) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) return adminCheck.response;

    await connectDB();

    const course = await Course.findById(courseId);
    if (!course) return {success: false, message: "Course not found."};

    const module = course.modules.id(moduleId);
    if (!module) return {success: false, message: "Module not found."};

    module.lectures.pull(lectureId);
    await course.save();

    revalidateTag("courses");
    revalidateTag(`courses-${courseId}`);

    return {
      success: true,
      message: "Lecture deleted successfully.",
      data: convertToObject(course),
    };
  } catch (error) {
    console.error("Error deleting lecture:", error);
    return {success: false, message: "Failed to delete lecture."};
  }
}
