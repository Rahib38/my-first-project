import { Router } from "express";
import { AcademicDepartmentsRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { CourseRoutes } from "../modules/course/course.route";
import { FacultyRoutes } from "../modules/faculty/faculty.route";
import { OfferedCoursesRoutes } from "../modules/offeredCourse/offeredCourse.route";
import { SemesterRegistrationRoute } from "../modules/semesterRegistation/semesterRegistation.route";
import { StudentRouter } from "../modules/students/student.route";
import { UserRoutes } from "../modules/users/user.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/students",
    route: StudentRouter,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes,
  },
  {
    path: "/academic-facultys",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/academic-departments",
    route: AcademicDepartmentsRoutes,
  },
  {
    path: "/faculty",
    route: FacultyRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/course",
    route: CourseRoutes,
  },
  {
    path: "/semester-registrations",
    route: SemesterRegistrationRoute,
  },
  {
    path: "/offeredCourses",
    route: OfferedCoursesRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
