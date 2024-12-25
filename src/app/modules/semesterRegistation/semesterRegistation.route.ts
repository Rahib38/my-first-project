import express from "express";
import validateRequest from "../../utilis/validateRequest";
import { semesterRegistrationController } from "./semesterRegistation.controller";
import { SemesterRegistrationValidation } from "./semesterRegistation.validation";
const router = express.Router();

router.post(
  "/create-semester-registration",
  validateRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema
  ),
  semesterRegistrationController.createSemesterRegistration
);
