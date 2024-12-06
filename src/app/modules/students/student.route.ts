import express from "express";
import { studentControllers } from "./student.controller";

const router = express.Router();

router.post("/create-student", studentControllers.createStudent);
router.get("/:studentId", studentControllers.getSingleStudent);
router.delete("/:studentId", studentControllers.deleteStudent);

router.get("/", studentControllers.getAllStudents);
export const StudentRouter = router;
