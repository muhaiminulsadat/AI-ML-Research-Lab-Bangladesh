import mongoose from "mongoose";

const speakerDetailsSchema = new mongoose.Schema(
  {
    presentation_title: {type: String},
    abstract: {type: String},
    presentation_type: {
      type: String,
      enum: ["paper", "poster", "demo", "keynote"],
    },
    co_authors: {type: String},
    file_url: {type: String},
  },
  {_id: false},
);

const workshopRegistrationSchema = new mongoose.Schema(
  {
    workshop_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workshop",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    is_site_user: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    institution: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
    },
    student_id: {
      type: String,
    },
    phone: {
      type: String,
    },
    participation_type: {
      type: String,
      enum: ["participant", "speaker"],
      required: true,
    },
    speaker_details: {
      type: speakerDetailsSchema,
      default: undefined,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    speaker_status: {
      type: String,
      enum: ["pending", "accepted", "rejected", null],
      default: null,
    },
    reviewed_at: {
      type: Date,
    },
    reviewed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "workshop_registrations",
  },
);

export const WorkshopRegistration =
  mongoose.models.WorkshopRegistration ||
  mongoose.model("WorkshopRegistration", workshopRegistrationSchema);
