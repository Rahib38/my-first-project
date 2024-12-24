import { model, Schema } from "mongoose";
import {
  TCourse,
  TCoursefaculty,
  TPreRequisiteCourses,
} from "./course.interface";
const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  isDeleted: { type: Boolean, default: false },
});
const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    require: true,
  },
  prefix: {
    type: String,
    trim: true,
    require: true,
  },
  code: {
    type: Number,
    trim: true,
    require: true,
  },
  credits: {
    type: Number,
    trim: true,
    require: true,
  },
  isDeleted: { type: Boolean, default: false },
  preRequisiteCourses: [preRequisiteCoursesSchema],
});

export const Course = model<TCourse>("Course", courseSchema);

const courseFacultySchema = new Schema<TCoursefaculty>({
  course: { type: Schema.Types.ObjectId, ref: "Course", unique: true },
  faculties: [{ type: Schema.Types.ObjectId, ref: "Faculty" }],
});
export const CourseFaculty=model<TCoursefaculty>('CourseFaculty',courseFacultySchema)