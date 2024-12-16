import httpStatus  from 'http-status';
import { model, Schema } from "mongoose";
import { TAcademicSemester,  } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, months } from "./academicSemester.constains";
import AppError from "../../Error/AppError";

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      require: true,
      enum:AcademicSemesterName
    },
    year: {
      type: String,
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

academicSemesterSchema.pre('save',async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year : this.year,
    name: this.name
  })
  if(isSemesterExists){
    throw new AppError(httpStatus.NOT_FOUND,'Semester is already exists!')
  }
  next()
})


export const AcademicSemester = model<TAcademicSemester>("AcademicSemester",academicSemesterSchema,)