import httpStatus from "http-status";
import QueryBuilders from "../../builder/QueryBuilds";
import AppError from "../../Error/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TsemesterRegistration } from "./semesterRegistation.interface";
import { SemesterRegistration } from "./semesterRegistation.model";
import { RegistrationStatus } from "./SemesterRegistration.constant";

const createSemesterRegistrationIntoDB = async (
  payload: TsemesterRegistration
) => {
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: "UPCOMING" }, { status: "ONGOING" }],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is Already a ${isThereAnyUpcomingOrOngoingSemester.status}`
    );
  }

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
const getAllSemesterRegistrationIntoDB = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationQuery = new QueryBuilders(
    SemesterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};
const getSingleSemesterRegistrationIntoDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TsemesterRegistration>
) => {
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This academic semester not found!"
    );
  }
  const requestSemesterStatus = isSemesterRegistrationExists?.status;
  const requestStatus = payload?.status;
  if (requestSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${requestSemesterStatus}`
    );
  }

  if (
    requestSemesterStatus === RegistrationStatus.UPCOMING &&
    requestStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${requestSemesterStatus} to ${requestStatus}`
    );
  }
  if (
    requestSemesterStatus === RegistrationStatus.UPCOMING &&
    requestStatus === RegistrationStatus.ONGOING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${requestSemesterStatus} to ${requestStatus}`
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationIntoDB,
  getSingleSemesterRegistrationIntoDB,
  updateSemesterRegistrationIntoDB,
};
