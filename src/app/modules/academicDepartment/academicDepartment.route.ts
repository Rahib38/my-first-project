import express from "express";
import validateRequest from "../../utilis/validateRequest";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
const router = express.Router();
router.post(
  "/create-academic-department",
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.createAcademicDepartment
);
router.get(
  "/:departmentId",

  AcademicDepartmentControllers.singleGetAcademicDepartments
);
router.patch(
  "/:departmentId",
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.updateAcademicDepartments
);
router.get(
  "/",

  AcademicDepartmentControllers.getAllAcademicDepartments
);

export const AcademicDepartmentsRoutes = router;
