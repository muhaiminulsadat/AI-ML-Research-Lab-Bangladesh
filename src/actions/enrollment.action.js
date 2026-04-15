"use server";

import connectDB from "@/lib/db";
import {Enrollment} from "@/models/enrollment.model";
import {Course} from "@/models/course.model";
import {getCurrentUser} from "@/lib/auth";
import {convertToObject} from "@/lib/utility";

import {cacheTag, revalidateTag} from "next/cache";

// Helper to get enrollment state
export async function getEnrollment(courseId) {
  try {
    const session = await getCurrentUser();
    const user = session?.user;
    if (!user) {
      return {success: false, message: "Unauthorized", data: null};
    }

    await connectDB();
    const enrollment = await Enrollment.findOne({
      user: user.id,
      course: courseId,
    }).lean();

    return {
      success: true,
      data: enrollment ? convertToObject(enrollment) : null,
    };
  } catch (error) {
    console.error("Error fetching enrollment:", error);
    return {success: false, message: error.message};
  }
}

async function getCachedUserEnrollments(userId) {
  "use cache";
  cacheTag(`user-enrollments-${userId}`);

  await connectDB();

  const enrollments = await Enrollment.find({user: userId})
    .populate({
      path: "course",
      select: "title thumbnail difficulty modules tags",
    })
    .sort({updatedAt: -1})
    .lean();

  const enriched = enrollments
    .filter((e) => e.course)
    .map((e) => {
      const totalLectures =
        e.course.modules?.reduce(
          (acc, mod) => acc + (mod.lectures?.length || 0),
          0,
        ) || 0;
      return {
        ...e,
        totalLectures,
        progress:
          totalLectures > 0
            ? Math.round((e.completedLectures.length / totalLectures) * 100)
            : 0,
      };
    });

  return {
    success: true,
    data: convertToObject(enriched),
  };
}

export async function getUserEnrollments() {
  try {
    const session = await getCurrentUser();
    const user = session?.user;
    if (!user) {
      return {success: false, message: "Unauthorized", data: []};
    }

    return await getCachedUserEnrollments(user.id);
  } catch (error) {
    console.error("Error fetching user enrollments:", error);
    return {success: false, message: error.message, data: []};
  }
}

// Enroll in a Course
export async function enrollUser(courseId) {
  try {
    const session = await getCurrentUser();
    const user = session?.user;
    if (!user) {
      return {success: false, message: "Unauthorized"};
    }

    await connectDB();

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) return {success: false, message: "Course not found"};

    const existingEnrollment = await Enrollment.findOne({
      user: user.id,
      course: courseId,
    });

    if (existingEnrollment) {
      return {
        success: true,
        message: "Already enrolled",
        data: convertToObject(existingEnrollment),
      };
    }

    const newEnrollment = await Enrollment.create({
      user: user.id,
      course: courseId,
      completedLectures: [],
    });

    revalidateTag(`user-enrollments-${user.id}`);

    return {
      success: true,
      message: "Successfully enrolled in the course",
      data: convertToObject(newEnrollment),
    };
  } catch (error) {
    console.error("Error enrolling user:", error);
    return {success: false, message: error.message};
  }
}

// Toggle Lecture Completion
export async function toggleLectureComplete(courseId, lectureId) {
  try {
    const session = await getCurrentUser();
    const user = session?.user;
    if (!user) {
      return {success: false, message: "Unauthorized"};
    }

    await connectDB();

    const enrollment = await Enrollment.findOne({
      user: user.id,
      course: courseId,
    });

    if (!enrollment) {
      return {
        success: false,
        message: "You must enroll in the course first to save progress.",
      };
    }

    const isCompleted = enrollment.completedLectures.includes(lectureId);

    if (isCompleted) {
      enrollment.completedLectures = enrollment.completedLectures.filter(
        (id) => id.toString() !== lectureId.toString(),
      );
    } else {
      enrollment.completedLectures.push(lectureId);
    }

    const course = await Course.findById(courseId);
    if (course) {
      const totalLectures = course.modules.reduce(
        (acc, mod) => acc + (mod.lectures?.length || 0),
        0,
      );
      const allDone =
        enrollment.completedLectures.length >= totalLectures &&
        totalLectures > 0;
      enrollment.isCompleted = allDone;
      enrollment.completedAt = allDone ? new Date() : null;
    }

    await enrollment.save();

    revalidateTag(`user-enrollments-${user.id}`);

    return {
      success: true,
      message: isCompleted ? "Marked as uncompleted" : "Marked as completed",
      data: convertToObject(enrollment),
    };
  } catch (error) {
    console.error("Error toggling lecture completion:", error);
    return {success: false, message: error.message};
  }
}
