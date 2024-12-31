import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { AcademicFacultys } from "../academicFaculty/academicFaculty.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistration } from "../semesterRegistation/semesterRegistation.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicSemester,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
  } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Semester registration not found!"
    );
  }
  const academicSemesters = isSemesterRegistrationExists.academicSemester;

  const isAcademicFacultyExists =
    await AcademicFacultys.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Faculty not found!");
  }
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Semester not found!");
  }
  const isAcademicDepartmentExists =
    await AcademicDepartmentModel.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Department not found!");
  }
  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "course not found!");
  }
  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "faculty not found!");
  }
  const isDepartmentBelongToFaculty = await AcademicDepartmentModel.findOne({
    academicFaculty,
    _id: academicDepartment,
  });
  if (isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This ${isAcademicDepartmentExists.name} is not belong to this ${isAcademicFacultyExists.name}`
    );
  }
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });
  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "offered course with same section is already exist!"
    );
  }
  const result = await OfferedCourse.create({ ...payload, academicSemesters });
  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {};

const getSingleOfferedCourseFromDB = async (id: string) => {};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Partial<TOfferedCourse>
) => {};

export const OfferedCoursesServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
