"use server";

import connectDB from "@/lib/db";
import {Application} from "@/models/application.model";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {User} from "@/models/user.model";
import {requireAdmin} from "@/lib/utility";

export async function submitApplication(formData) {
  try {
    await connectDB();

    const {applicantName, email, university, applyingAs, motivation} = formData;

    if (!applicantName || !email || !university || !applyingAs || !motivation) {
      return {success: false, message: "All fields are required."};
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {success: false, message: "Please enter a valid email address."};
    }

    const existingUser = await User.findOne({email});
    if (existingUser && existingUser.isApproved) {
      return {
        success: false,
        message: "An approved account with this email already exists.",
      };
    }

    const existingApplication = await Application.findOne({email});
    if (existingApplication) {
      return {
        success: false,
        message: "An application with this email already exists.",
      };
    }

    await Application.create({
      applicantName,
      email,
      university,
      applyingAs,
      motivation,
    });
    return {success: true, message: "Application submitted successfully."};
  } catch (error) {
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

    const application = await Application.findById(applicationId);
    if (!application) {
      return {success: false, message: "Application not found."};
    }

    let existingUser = await User.findOne({email: application.email});
    let userId = existingUser ? existingUser._id : null;
    const tempPassword = "123456";

    if (!existingUser) {
      const result = await auth.api.signUpEmail({
        body: {
          name: application.applicantName,
          email: application.email,
          password: tempPassword,
        },
        headers: await headers(),
      });

      if (!result?.user) {
        return {success: false, message: "Failed to create user account."};
      }

      userId = result.user.id;

      await auth.api.setRole({
        body: {userId, role: "member"},
        headers: await headers(),
      });
    }

    await User.findByIdAndUpdate(userId, {
      memberType: application.applyingAs,
      isApproved: true,
      university: application.university,
    });

    application.status = "approved";
    application.userId = userId;
    await application.save();

    return {success: true, message: `Approved. Temp password: ${tempPassword}`};
  } catch (error) {
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
