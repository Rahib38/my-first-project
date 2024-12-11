import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";

const router = express.Router();
router.post('/create-academic-semester',AcademicSemesterControllers.createAcademicSemester)

// router.get("/:studentId", studentControllers.getSingleStudent);
// router.delete("/:studentId", studentControllers.deleteStudent);

// router.get("/", studentControllers.getAllStudents);
export const AcademicSemesterRoutes = router;
