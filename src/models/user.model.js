import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    university: {
      type: String,
    },
    designation: {
      type: String,
    },
    bio: {
      type: String,
    },
    role: {
      type: String,
      enum: ["member", "advisor", "core_panel", "admin"],
      default: "member",
    },
    memberId: {
      type: String,
      unique: true,
      index: true,
    },
    researchInterests: {
      type: [String],
      default: [],
    },
    socialLinks: {
      github: {type: String},
      linkedin: {type: String},
      googleScholar: {type: String},
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "user",
  },
);

// Pre-save hook to generate unique memberId
userSchema.pre("save", async function (next) {
  if (this.isNew && !this.memberId) {
    try {
      const User = mongoose.models.User || mongoose.model("User", userSchema);
      // Find the user with the highest numeric part of ML-XXXX
      const lastUser = await User.findOne(
        {memberId: /^ML-\d{4}$/},
        {memberId: 1},
      )
        .sort({memberId: -1})
        .lean();

      let nextNumber = 1;
      if (lastUser && lastUser.memberId) {
        const lastNumber = parseInt(lastUser.memberId.split("-")[1]);
        if (!isNaN(lastNumber)) {
          nextNumber = lastNumber + 1;
        }
      }

      this.memberId = `ML-${nextNumber.toString().padStart(4, "0")}`;
    } catch (error) {
      console.error("Error generating memberId:", error);
      // Fallback to timestamp to ensure uniqueness if logic fails
      this.memberId = `ML-TMP-${Date.now().toString().slice(-4)}`;
    }
  }
  next();
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
