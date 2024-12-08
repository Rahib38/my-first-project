import config from "../../config";
import { Student } from "../student.model";
import { TStudent } from "../students/student.interface";
import {  TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is no given, use deafult password

  userData.password = password || (config.default_password as string);

  // set student role

  userData.role = "student";

  // set manually generated it

  userData.id = "2030100001";

  // create userData
  const newUser = await User.create(userData);
  // create student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData)
    return newStudent
  }


};

export const UserService = {
  createStudentIntoDB,
};
