/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilders from "../../builder/QueryBuilds";
import AppError from "../../Error/AppError";
import { CourseSearchAbleFields } from "./course.constant";
import { TCourse, TCoursefaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilders(
    Course.find().populate("preRequisiteCourses.course"),
    query
  )
    .search(CourseSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const singleCourseIntoDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course"
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,

      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );
    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update");
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      const deletedPreRequisitesCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        { new: true, runValidators: true, session }
      );
      if (!deletedPreRequisitesCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update");
      }
      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted
      );
      const newPreRequisitesCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        { new: true, runValidators: true, session }
      );
      if (!newPreRequisitesCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update");
      }

      const result = await Course.findById(id).populate(
        "preRequisiteCourses.course"
      );
      return result;
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update");
  }
};

const deleteCourseIntoDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDelete: true },
    { new: true }
  );
  return result;
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCoursefaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course:id,
      $addToSet: { faculties: { $each: payload } },
    },
    { upsert: true, new: true }
  );
  return result;
};
const removeFacultiesFromCourseIntoDB = async (
  id: string,
  payload: Partial<TCoursefaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
    $pull:{faculties:{$in:payload}}
    },
    { upsert: true, new: true }
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  singleCourseIntoDB,
  updateCourseIntoDB,
  deleteCourseIntoDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseIntoDB
};
