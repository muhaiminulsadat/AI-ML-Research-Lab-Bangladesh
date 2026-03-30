import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    authors: {
      type: [String],
      required: true,
      validate: [
        (val) => val.length > 0,
        "A publication must have at least one author.",
      ],
    },
    status: {
      type: String,
      enum: ["ongoing", "published"],
      required: true,
      default: "ongoing",
    },
    venue: {
      type: String, // e.g., "NeurIPS", "CVPR", "ArXiv", or internal project ID
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    abstract: {
      type: String,
      trim: true,
    },
    paperUrl: {
      type: String,
      trim: true,
    },
    codeUrl: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "publication",
  },
);

export const Publication =
  mongoose.models.Publication || mongoose.model("Publication", publicationSchema);
