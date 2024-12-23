import express from "express";
import { studentControllers } from "./student.controller";

const router = express.Router();

router.get("/:id", studentControllers.getSingleStudent);
router.patch("/:id", studentControllers.updateStudent);
router.delete("/:id", studentControllers.deleteStudent);

router.get("/", studentControllers.getAllStudents);
export const StudentRouter = router;
