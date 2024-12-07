import config from "../../config";
import { TStudent } from "../students/student.interface";
import { NewUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const user: NewUser = {};

  // if password is no given, use deafult password

  user.password = password || (config.default_password as string);

  // set student role

  user.role = "student";

  // set manually generated it

  user.id = "2030100001";

  // create user
  const result = await User.create(user);
  // create student
  if (Object.keys(result).length) {
    studentData.id = result.id;
    studentData.user = result._id;
  }

  return result;
};

export const UserService = {
  createStudentIntoDB,
};
