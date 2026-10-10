import { Schema, model } from "mongoose";
import type { AppointmentDoc } from "../types/index";

const appointmentSchema = new Schema<AppointmentDoc>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  patientName: { type: String, required: true, trim: true, maxlength: 120 },
  appointmentDate: { type: String, required: true },
  appointmentTime: { type: String, required: true },
  appointmentType: {
    type: String,
    required: true,
    enum: [
      "General consultation",
      "Follow-up visit",
      "Medical check-up",
      "Laboratory request",
    ],
  },
  notes: { type: String, default: "", maxlength: 2000 },
  status: { type: String, enum: ["upcoming", "done"], default: "upcoming" },
});

appointmentSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    delete ret.userId;
    return ret;
  },
});

export const AppointmentModel = model<AppointmentDoc>(
  "Appointment",
  appointmentSchema,
);