import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { SemesterRegistrationService } from "./semesterRegistation.service";

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.createSemesterRegistrationIntoDB(
        req.body
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester Registration is created successfully",
      data: result,
    });
  }
);

const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.getAllSemesterRegistrationIntoDB(
        req.query
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester Registration is retrieved successfully",
      data: result,
    });
  }
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await SemesterRegistrationService.getSingleSemesterRegistrationIntoDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester Registration is retrieved successfully",
      data: result,
    });
  }
);

const updateSemesterRegistration=catchAsync(async(req:Request,res:Response)=>{
    const {id}=req.params;
    const result = await SemesterRegistrationService.updateSemesterRegistrationIntoDB(id,req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semester Registration is retrieved successfully",
        data: result,
      });
})

export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration
};
