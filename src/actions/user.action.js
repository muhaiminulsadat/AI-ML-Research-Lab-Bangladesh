"use server";
import {auth, getAllUsers} from "@/lib/auth";
import connectDB from "@/lib/db";
import {convertToObject, requireAdmin} from "@/lib/utility";
import {User} from "@/models/user.model";
import {revalidatePath} from "next/cache";
import {headers} from "next/headers";
import {getCurrentUser} from "@/lib/auth";

export async function registerUser(formData) {
  try {
    const {name, email, password, university} = formData;

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
    const response = await auth.api.updateUser({
      headers: await headers(),
      body: {
        name: data.name,
        bio: data.bio,
        university: data.university,
        researchInterests: data.researchInterests,
        socialLinks: JSON.stringify(data.socialLinks),
        profileImage: data.profileImage,
      },
    });

    revalidatePath("/profile");
    return {success: true, data: response};
  } catch (error) {
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
        students: users.filter((u) => u.role === "student").length,
        researchers: users.filter((u) => u.role === "researcher").length,
      },
    };
  } catch (error) {
    return {success: false, error: error.message};
  }
}

export async function getMembers() {
  try {
    const users = await getAllUsers();
    return {success: true, data: convertToObject(users)};
  } catch (error) {
    return {success: false, error: error.message};
  }
}

export async function getApprovedMembers() {
  try {
    await connectDB();

    const {authorized, response} = await requireAdmin();
    if (!authorized) return response;

    const members = await User.find({isApproved: true})
      .sort({createdAt: -1})
      .lean();
    return {success: true, data: convertToObject(members)};
  } catch (error) {
    console.error("getApprovedMembers error:", error);
    return {success: false, message: error.message || "Something went wrong."};
  }
}

export async function revokeMember(userId) {
  try {
    await connectDB();

    const {authorized, response} = await requireAdmin();
    if (!authorized) return response;

    await auth.api.setRole({
      body: {userId, role: "general"},
      headers: await headers(),
    });

    await User.findByIdAndUpdate(userId, {
      isApproved: false,
      memberType: null,
    });

    return {success: true, message: "Member revoked successfully."};
  } catch (error) {
    console.error("revokeMember error:", error);
    return {success: false, message: error.message || "Something went wrong."};
  }
}
