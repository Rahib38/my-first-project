import  httpStatus  from 'http-status';
import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../Error/AppError";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFacultys",
    },
  },
  {
    timestamps: true,
  }
);

// academicDepartmentSchema.pre("save", async function (next) {
//   const isDepartmentExist = await AcademicDepartmentModel.findOne({
//     name: this.name,
//   });
//   if (isDepartmentExist) {
//     throw new AppError(httpStatus.NOT_FOUND,"This department is already exist!");
//   }
//   next();
// });
academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartmentModel.findOne(query);
  if (!isDepartmentExist) {
    throw new AppError(404,"This department does not exist!");
  }
  next();
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  "AcademicDepartmentModel",
  academicDepartmentSchema
);
