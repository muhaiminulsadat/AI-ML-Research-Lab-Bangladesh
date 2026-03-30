"use server";

import connectDB from "@/lib/db";
import Course from "@/models/course.model";
import {requireAdmin, convertToObject} from "@/lib/utility";
import {getCurrentUser} from "@/lib/auth";

export async function createCourse(data) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) {
      return adminCheck.response;
    }

    await connectDB();

    const {
      title,
      description,
      instructor,
      difficulty,
      thumbnail,
      tags,
      isPublished,
    } = data;

    if (!title || !description || !instructor) {
      return {
        success: false,
        message: "Title, description, and instructor are required.",
      };
    }

    const newCourse = await Course.create({
      title,
      description,
      instructor,
      difficulty: difficulty || "beginner",
      thumbnail,
      tags: tags || [],
      isPublished: isPublished || false,
      modules: [],
    });

    return {
      success: true,
      message: "Course created successfully.",
      data: convertToObject(newCourse),
    };
  } catch (error) {
    console.error("Error creating course:", error);
    return {
      success: false,
      message: "Failed to create course. Please try again.",
    };
  }
}

export async function getCourses(isAdminView = false) {
  try {
    await connectDB();

    if (isAdminView) {
      const adminCheck = await requireAdmin();
      if (!adminCheck.authorized) {
        return adminCheck.response;
      }
    }

    const query = isAdminView ? {} : {isPublished: true};

    const courses = await Course.find(query)
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

export async function getCourseById(courseId, isAdminView = false) {
  try {
    await connectDB();

    if (isAdminView) {
      const adminCheck = await requireAdmin();
      if (!adminCheck.authorized) {
        return adminCheck.response;
      }
    }

    const query = {_id: courseId};
    if (!isAdminView) {
      query.isPublished = true;
    }

    const course = await Course.findOne(query)
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
      {new: true},
    ).lean();

    if (!updatedCourse) {
      return {success: false, message: "Course not found."};
    }

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
