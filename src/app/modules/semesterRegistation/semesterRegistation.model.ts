import mongoose, { Schema } from "mongoose";

import { SemesterRegistrationStatus } from "./SemesterRegistration.constant";
import { TsemesterRegistration } from "./semesterRegistation.interface";

const semesterRegistrationSchema = new mongoose.Schema<TsemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "AcademicSemester",
    },
    status: {
      type: String,
      enum: SemesterRegistrationStatus,
      default: "UPCOMING",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  }
);
export const SemesterRegistration = mongoose.model<TsemesterRegistration>(
  "SemesterRegistration",
  semesterRegistrationSchema
);
