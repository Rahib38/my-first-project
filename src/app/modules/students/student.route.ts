import express from "express";
import { studentControllers } from "./student.controller";

const router = express.Router();

router.get("/:studentId", studentControllers.getSingleStudent);
router.patch("/:studentId", studentControllers.updateStudent);
router.delete("/:studentId", studentControllers.deleteStudent);

router.get("/", studentControllers.getAllStudents);
export const StudentRouter = router;
