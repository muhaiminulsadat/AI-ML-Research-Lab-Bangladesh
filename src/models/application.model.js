import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    applicantName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    university: {
      type: String,
      required: true,
    },
    applyingAs: {
      type: String,
      enum: ["student", "researcher"],
      required: true,
    },
    motivation: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

export const Application =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);
