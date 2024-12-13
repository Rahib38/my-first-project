import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { Student } from "../student.model";
import { TStudent } from "../students/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { genereateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is no given, use deafult password

  userData.password = password || (config.default_password as string);

  // set student role

  userData.role = "student";

  // year semesterCode 4 digit number

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );
  // set manually generated it

  userData.id = genereateStudentId(admissionSemester);

  // create userData
  const newUser = await User.create(userData);
  // create student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
