import express from "express";
import validateRequest from "../../utilis/validateRequest";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = express.Router();
router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.createAcademicSemester
);
router.get(
  "/:semesterId",
  AcademicSemesterControllers.getSingleAcademicSemester
);
router.patch(
  "/:semesterId",
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.updateAcademicSemester
);
router.get("/", AcademicSemesterControllers.getAcademicSemester);

// router.get("/:studentId", studentControllers.getSingleStudent);
// router.delete("/:studentId", studentControllers.deleteStudent);

// router.get("/", studentControllers.getAllStudents);
export const AcademicSemesterRoutes = router;
