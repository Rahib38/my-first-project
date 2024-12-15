import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";

import sendResponse from "../../utilis/sendResponse";
import { academicDepartmentServices } from "./academicDeparment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department create successfully",
    data: result,
  });
});
const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.getAcademicDepartmentsIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department is retrived successfully",
    data: result,
  });
});
const singleGetAcademicDepartments = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await academicDepartmentServices.singleGetAcademicDepartmentsIntoDB(
      departmentId
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department are retrived successfully",
    data: result,
  });
});
const updateAcademicDepartments = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await academicDepartmentServices.updateGetAcademicDepartmentsIntoDB(
      departmentId,
      req.body
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department are update successfully",
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  singleGetAcademicDepartments,
  updateAcademicDepartments,
};
