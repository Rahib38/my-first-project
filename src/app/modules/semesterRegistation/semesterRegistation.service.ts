import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TsemesterRegistration } from "./semesterRegistation.interface";
import { SemesterRegistration } from "./semesterRegistation.model";

const createSemesterRegistrationIntoDB = async (
  payload: TsemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This academic semester not found!"
    );
  }
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This academic is already registered"
    );
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};
const getAllSemesterRegistrationIntoDB = async () => {};
const getSingleSemesterRegistrationIntoDB = async () => {};
const updateSemesterRegistrationIntoDB = async () => {};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationIntoDB,
  getSingleSemesterRegistrationIntoDB,
  updateSemesterRegistrationIntoDB,
};
