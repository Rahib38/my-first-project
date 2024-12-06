import express from "express";
import { studentControllers } from "./student.controller";

const router = express.Router();

router.post("/create-student", studentControllers.createStudent);
router.get("/", studentControllers.getAllStudents);
router.get("/:studentId", studentControllers.getSingleStudent);
router.delete("/:studentId", studentControllers.deleteStudent);

export const StudentRouter = router;
