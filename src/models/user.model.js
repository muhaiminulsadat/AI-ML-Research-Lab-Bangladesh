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
    memberType: {
      type: String,
      enum: ["student", "researcher", null],
      default: null,
    },
    university: {
      type: String,
    },
    bio: {
      type: String,
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
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "user",
  },
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
