import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedLectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // Since lectures are subdocuments in Course, we don't necessarily have a standalone Lecture model,
        // but we can store their ObjectIds here.
      },
    ],
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
  },
  {timestamps: true},
);

// Prevent a user from enrolling in the same course multiple times
enrollmentSchema.index({user: 1, course: 1}, {unique: true});

const Enrollment =
  mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;
