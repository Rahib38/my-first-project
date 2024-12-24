import express from "express";

import validateRequest from "../../utilis/validateRequest";
import { CourseControllers } from "./course.controller";
import { CourseValidation } from "./course.validation";

const router = express.Router();

router.post("/create-course", CourseControllers.createCourse);
router.get("/:id", CourseControllers.getSingleCourse);

router.patch(
  "/:id",
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse
);

router.put(
  "/:courseId/assign-faculties",
  validateRequest(CourseValidation.assignFacultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse
);
router.delete(
  "/:courseId/remove-faculties",
  validateRequest(CourseValidation.assignFacultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse
);

router.delete("/:id", CourseControllers.deleteCourse);

router.get("/", CourseControllers.getAllCourses);

export const CourseRoutes = router;
