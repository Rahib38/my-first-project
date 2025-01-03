import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { UserService } from "./user.service";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  
  const result = await UserService.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is created successfully",
    data: result,
  });
});
export const UserController = {
  createStudent,
};
