import type { Types } from "mongoose";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "admin" | "instructor";
  isActive: boolean;
}

export interface Course {
  code: string;
  title: string;
  units: number;
  semester: string;
}

export interface Submission {
  id: number;
  studentId: number;
  courseCode: string;
  repoUrl: string;
  submittedAt: Date;
  score?: number;
}

export interface Appointment {
  id: string;
  patientName: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  notes: string;
  status: "upcoming" | "done";
}

export type UserDoc = Omit<User, "id"> & {
  password: string;
};

export type SubmissionDoc = Omit<Submission, "id" | "studentId"> & {
  studentId: Types.ObjectId;
};

export type NewSubmissionBody = Pick<Submission, "courseCode" | "repoUrl">;

export type AppointmentDoc = Omit<Appointment, "id"> & {
  userId: Types.ObjectId;
};

export type NewAppointmentBody = Pick<
  Appointment,
  | "patientName"
  | "appointmentDate"
  | "appointmentTime"
  | "appointmentType"
  | "notes"
> & Partial<Pick<Appointment, "status">>;
