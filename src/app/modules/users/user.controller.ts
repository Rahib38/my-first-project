import httpStatus  from 'http-status';
import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utilis/sendResponse";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;

    // const studentValidationData = studentZotValidationSchema.parse(studentData);
    const result = await UserService.createStudentIntoDB(password, studentData);


    sendResponse(res,{
      statusCode:httpStatus.OK,
      success: true,
      message: "Student is created successfully",
      data: result,
    })
  } catch (err) {
    next(err);
  }
};
export const UserController = {
  createStudent,
};
