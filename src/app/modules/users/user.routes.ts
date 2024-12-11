import express from "express";

import validateRequest from "../../utilis/validateRequest";
import { createStudentValidationSchema } from "../students/student.zod.validation";
import { UserController } from "./user.controller";

const route = express.Router();

route.post(
  "/create-student",
  validateRequest(createStudentValidationSchema),
  UserController.createStudent
);
export const UserRoutes = route;
