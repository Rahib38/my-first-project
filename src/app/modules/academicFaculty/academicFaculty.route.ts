import express from "express";
import validateRequest from "../../utilis/validateRequest";
import { AcademicFacultyControllers } from "./academicFaculty.controller";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
const router = express.Router();
router.post(
  "/create-academic-faculty",
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.createAcademicFaculty
);
router.get(
  "/:facultyId",

  AcademicFacultyControllers.singleGetAcademicFacultys
);
router.patch(
  "/:facultyId",
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.updateAcademicFacultys
);
router.get(
  "/",

  AcademicFacultyControllers.getAllAcademicFacultys
);

export const AcademicFacultyRoutes = router;
