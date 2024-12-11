import { model, Schema } from "mongoose";
import { TAcademicSemester,  } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, months } from "./academicSemester.constains";

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      require: true,
      enum:AcademicSemesterName
    },
    year: {
      type: Date,
      require: true,
    },
    code: {
      type: String,
      require: true,
      enum:AcademicSemesterCode
    },
    startMonth: {
      type: String,
      enum: months,
      required:true
    },
    endMonth: {
      type: String,
      enum: months,
      required:true
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicSemester = model<TAcademicSemester>("AcademicSemester",academicSemesterSchema,)