"use server";
import {auth, getAllUsers} from "@/lib/auth";
import {convertToObject} from "@/lib/utility";
import {headers} from "next/headers";

export async function registerUser(formData) {
  try {
    const {name, email, password, role, university} = formData;

    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        role,
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
