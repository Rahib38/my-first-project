import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { OfferedCoursesServices } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCoursesServices.createOfferedCourseIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculties removed  succesfully",
    data: result,
  });
});
const getAllOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculties removed  succesfully",
    data: result,
  });
});
const singleGetOfferedCourses = catchAsync(
  async (req: Request, res: Response) => {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Faculties removed  succesfully",
      data: result,
    });
  }
);
const updateOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculties removed  succesfully",
    data: result,
  });
});

export const OfferedCoursesController = {
  createOfferedCourse,
  getAllOfferedCourses,
  singleGetOfferedCourses,
  updateOfferedCourses,
};
