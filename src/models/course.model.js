import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  title: {type: String, required: true},
  youtubeId: {type: String, required: true},
  duration: {type: Number}, // duration in minutes
  order: {type: Number, required: true},
});

const moduleSchema = new mongoose.Schema({
  title: {type: String, required: true},
  order: {type: Number, required: true},
  lectures: [lectureSchema],
});

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String, // URL to the image
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    modules: [moduleSchema],
    isPublished: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "courses",
  },
);

export const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
