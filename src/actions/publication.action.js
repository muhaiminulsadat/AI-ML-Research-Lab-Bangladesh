"use server";

import connectDB from "@/lib/db";
import {Publication} from "@/models/publication.model";
import {getCurrentUser} from "@/lib/auth";
import {convertToObject, requireAdmin} from "@/lib/utility";
import {revalidatePath} from "next/cache";

export async function createPublication(data) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.success) return adminCheck;

    await connectDB();

    const newPublication = new Publication(data);
    await newPublication.save();

    revalidatePath("/admin/publications");
    revalidatePath("/research");

    return {
      success: true,
      message: "Publication created successfully",
      data: convertToObject(newPublication),
    };
  } catch (error) {
    console.error("Error creating publication:", error);
    return {success: false, message: error.message};
  }
}

export async function getPublications(statusFilter = null) {
  try {
    await connectDB();

    const query = statusFilter ? {status: statusFilter} : {};
    const publications = await Publication.find(query)
      .sort({date: -1})
      .lean();

    return {
      success: true,
      data: convertToObject(publications),
    };
  } catch (error) {
    console.error("Error fetching publications:", error);
    return {success: false, message: error.message};
  }
}

export async function updatePublication(id, data) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.success) return adminCheck;

    await connectDB();

    const updated = await Publication.findByIdAndUpdate(
      id,
      {$set: data},
      {new: true, runValidators: true},
    ).lean();

    if (!updated) {
      return {success: false, message: "Publication not found"};
    }

    revalidatePath("/admin/publications");
    revalidatePath("/research");

    return {
      success: true,
      message: "Publication updated successfully",
      data: convertToObject(updated),
    };
  } catch (error) {
    console.error("Error updating publication:", error);
    return {success: false, message: error.message};
  }
}

export async function deletePublication(id) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.success) return adminCheck;

    await connectDB();

    const deleted = await Publication.findByIdAndDelete(id);

    if (!deleted) {
      return {success: false, message: "Publication not found"};
    }

    revalidatePath("/admin/publications");
    revalidatePath("/research");

    return {
      success: true,
      message: "Publication deleted permanently",
    };
  } catch (error) {
    console.error("Error deleting publication:", error);
    return {success: false, message: error.message};
  }
}
