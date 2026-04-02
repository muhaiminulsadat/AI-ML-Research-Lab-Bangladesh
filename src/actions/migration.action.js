"use server";
import connectDB from "@/lib/db";
import {User} from "@/models/user.model";
import {requireAdmin} from "@/lib/utility";

export async function runMigration() {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.authorized) return adminCheck.response;

    await connectDB();

    const users = await User.find({}).sort({createdAt: 1});
    let migratedCount = 0;

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      let updated = false;

      // 1. Restore Role if missing
      if (!user.role) {
        user.role = "member";
        updated = true;
      }

      // 2. Generate memberId if missing
      if (!user.memberId) {
        // Find existing IDs to avoid duplicates during loop
        const existingCount = await User.countDocuments({
          memberId: {$exists: true},
        });
        user.memberId = `ML-${(existingCount + 1).toString().padStart(4, "0")}`;
        updated = true;
      }

      if (updated) {
        await user.save();
        migratedCount++;
      }
    }

    return {
      success: true,
      message: `Migration complete. Updated ${migratedCount} users.`,
    };
  } catch (error) {
    console.error("Migration error:", error);
    return {success: false, message: error.message};
  }
}
