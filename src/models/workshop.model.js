import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
    },
    venue: {
      type: String,
    },
    university: {
      type: String,
    },
    banner_image: {
      type: String, // URL
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "past"],
      default: "upcoming",
    },
    registration_open: {
      type: Boolean,
      default: true,
    },
    accepts_speakers: {
      type: Boolean,
      default: true,
    },
    seats_total: {
      type: Number,
    },
    seats_filled: {
      type: Number,
      default: 0,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    registration_deadline: {
      type: Date,
    },
    speaker_deadline: {
      type: Date,
    },
    max_speakers: {
      type: Number,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    collection: "workshops",
  },
);

export const Workshop =
  mongoose.models.Workshop || mongoose.model("Workshop", workshopSchema);
