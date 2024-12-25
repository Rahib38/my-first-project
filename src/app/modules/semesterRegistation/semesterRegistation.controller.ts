import  httpStatus  from 'http-status';
import { Request, Response } from "express";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { SemesterRegistrationService } from './semesterRegistation.service';

const createSemesterRegistration=catchAsync(
    async(req:Request,res:Response)=>{
const result= await SemesterRegistrationService.createSemesterRegistrationIntoDB(req.body)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:"Semester Registration is created successfully",
            data:result
        })
    }
)

export const semesterRegistrationController={
    createSemesterRegistration
}