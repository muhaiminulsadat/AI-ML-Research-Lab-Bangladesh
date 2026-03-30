"use server";

import connectDB from "@/lib/db";
import Enrollment from "@/models/enrollment.model";
import Course from "@/models/course.model";
import { getCurrentUser } from "@/lib/auth";
import { convertToObject } from "@/lib/utility";

// Helper to get enrollment state
export async function getEnrollment(courseId) {
  try {
    const session = await getCurrentUser();
    const user = session?.user;
    if (!user) {
      return { success: false, message: "Unauthorized", data: null };
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
    return { success: false, message: error.message };
  }
}

// Enroll in a Course
export async function enrollUser(courseId) {
  try {
    const session = await getCurrentUser();
    const user = session?.user;
    if (!user) {
      return { success: false, message: "Unauthorized" };
    }

    await connectDB();
    
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) return { success: false, message: "Course not found" };

    const existingEnrollment = await Enrollment.findOne({
      user: user.id,
      course: courseId,
    });

    if (existingEnrollment) {
      return { success: true, message: "Already enrolled", data: convertToObject(existingEnrollment) };
    }

    const newEnrollment = await Enrollment.create({
      user: user.id,
      course: courseId,
      completedLectures: [],
    });

    return {
      success: true,
      message: "Successfully enrolled in the course",
      data: convertToObject(newEnrollment),
    };
  } catch (error) {
    console.error("Error enrolling user:", error);
    return { success: false, message: error.message };
  }
}

// Toggle Lecture Completion
export async function toggleLectureComplete(courseId, lectureId) {
  try {
    const session = await getCurrentUser();
    const user = session?.user;
    if (!user) {
      return { success: false, message: "Unauthorized" };
    }

    await connectDB();

    const enrollment = await Enrollment.findOne({
      user: user.id,
      course: courseId,
    });

    if (!enrollment) {
      return { success: false, message: "You must enroll in the course first to save progress." };
    }

    // Check if the lecture is already completed
    const isCompleted = enrollment.completedLectures.includes(lectureId);

    if (isCompleted) {
      // Remove it
      enrollment.completedLectures = enrollment.completedLectures.filter(
        (id) => id.toString() !== lectureId.toString()
      );
    } else {
      // Add it
      enrollment.completedLectures.push(lectureId);
    }

    // Note: If you want to check if all lectures are completed to set `isCompleted: true`,
    // you would fetch the course modules, count total lectures, and compare here.
    // For now, we'll just handle lecture progress.

    await enrollment.save();

    return {
      success: true,
      message: isCompleted ? "Marked as uncompleted" : "Marked as completed",
      data: convertToObject(enrollment)
    };
  } catch (error) {
    console.error("Error toggling lecture completion:", error);
    return { success: false, message: error.message };
  }
}