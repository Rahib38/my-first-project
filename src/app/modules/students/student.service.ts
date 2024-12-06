import { Student } from "../student.model";
import { TStudent } from "./student.interface";

const createStudentIntoDB = async (studentData: TStudent) => {
  // const student = new Student (studentData);
  // if(await student.isUserExits(studentData.id)){
  //   throw new Error('User already exists')
  // }
  // const result = await student.save();
  if (await Student.isUserExists(studentData.id)) {
    throw new Error("User already exists");
  }
  const result = await Student.create(studentData);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{$match:{id:id}}])
  // const result = await Student.findOne({ id });
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id },{isDeleted:true});
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};
