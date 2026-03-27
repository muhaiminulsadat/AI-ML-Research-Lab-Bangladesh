"use server";

import connectDB from "@/lib/db";
import {Application} from "@/models/application.model";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {MongoClient} from "mongodb";
import {User} from "@/models/user.model";
import { requireAdmin } from "@/lib/utility";

export async function submitApplication(formData) {
  try {
    await connectDB();

    const existing = await Application.findOne({email: formData.email});
    if (existing) {
      return {
        success: false,
        message: "An application with this email already exists.",
      };
    }

    await Application.create({
      applicantName: formData.applicantName,
      email: formData.email,
      university: formData.university,
      applyingAs: formData.applyingAs,
      
    });
    return {success: true, message: "Application submitted successfully."};
  } catch (error) {
    console.error("submitApplication error:", error);
    return {success: false, message: error.message || "Something went wrong."};
  }
}

export async function getApplications() {
  const {authorized, response} = await requireAdmin();
  if (!authorized) return response;

  await connectDB();

  const applications = await Application.find({}).sort({createdAt: -1}).lean();
  return JSON.parse(JSON.stringify(applications));
}

export async function approveApplication(applicationId) {
  try {
    await connectDB();

    const {authorized, response} = await requireAdmin();
    if (!authorized) return response;

    const {user} = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return {success: false, message: "Unauthorized."};
    }

    const application = await Application.findById(applicationId);
    if (!application)
      return {success: false, message: "Application not found."};

    const tempPassword = "123456";
    // TODO: Wrap in MongoDB transaction
    const result = await auth.api.signUpEmail({
      body: {
        name: application.applicantName,
        email: application.email,
        password: tempPassword,
      },
    });

    if (!result?.user)
      return {success: false, message: "Failed to create user account."};

    await User.findByIdAndUpdate(result.user.id, {
      role: application.applyingAs,
      isApproved: true,
      university: application.university,
    });

    application.status = "approved";
    application.userId = result.user.id;
    await application.save();

    return {success: true, message: `Approved. Temp password: ${tempPassword}`};
  } catch (error) {
    console.error("approveApplication error:", error);
    return {success: false, message: error.message || "Something went wrong."};
  }
}

export async function rejectApplication(applicationId) {
  try {
    const {authorized, response} = await requireAdmin();
    if (!authorized) return response;

    await connectDB();
    await Application.findByIdAndUpdate(applicationId, {status: "rejected"});
    return {success: true, message: "Application rejected."};
  } catch (error) {
    console.error("rejectApplication error:", error);
    return {success: false, message: error.message || "Something went wrong."};
  }
}
