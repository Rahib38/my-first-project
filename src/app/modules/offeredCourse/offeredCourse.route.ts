import express from "express";
import validateRequest from "../../utilis/validateRequest";
import { OfferedCoursesController } from "./offeredCourse.controller";
import { OfferedCourseValidations } from "./offeredCourse.validation";
const router = express.Router();
router.post(
  "/create-offered-course",
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCoursesController.createOfferedCourse
);
router.get("/:id", OfferedCoursesController.singleGetOfferedCourses);
router.patch(
  "/:id",
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCoursesController.updateOfferedCourses
);
router.get("/", OfferedCoursesController.getAllOfferedCourses);
export const OfferedCoursesRoutes = router;
