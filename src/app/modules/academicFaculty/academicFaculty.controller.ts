import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";

import sendResponse from "../../utilis/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty create successfully",
    data: result,
  });
});
const getAllAcademicFacultys = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAcademicFacultysIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty is retrived successfully",
    data: result,
  });
});
const singleGetAcademicFacultys = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyIntoDB(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty are retrived successfully",
    data: result,
  });
});
const updateAcademicFacultys = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty are update successfully",
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFacultys,
  singleGetAcademicFacultys,
  updateAcademicFacultys,
};
