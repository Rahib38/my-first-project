import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../utilis/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = express.Router();
router.post('/create-academic-semester',validateRequest(AcademicSemesterValidation.createAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester)

// router.get("/:studentId", studentControllers.getSingleStudent);
// router.delete("/:studentId", studentControllers.deleteStudent);

// router.get("/", studentControllers.getAllStudents);
export const AcademicSemesterRoutes = router;
