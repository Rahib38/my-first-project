import { Schema, model } from "mongoose";
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from "./students/student.interface";

const usernameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [
      true,
      "first name chara hobe na vhai",
    ] /* ekhane protita field er modde evabe custom meassage dite hobe */,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  fatherOccuption: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContactNo: { type: String, required: true },
  motherOccuption: { type: String, required: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  contactNo: { type: String, required: true },

  occupation: { type: String, required: true },
  // occuption:{type:String,required:true},
  address: { type: String, required: true },
});
const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: {
    type: usernameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message:
        "{VALUE} is not supported.        the gender field can only be one of the following: 'Male','female',or'others'",
    } /** zoto gula enum ache sob jaygay evabe dite hobe  */,
    required: true,
  },
  dateOfBirth: {
    type: String,
  },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: { type: localGuardianSchema, required: true },
  profileImage: { type: String },
  isActive: {
    type: String,
    enum: ["active", "block"],
    default: "active",
    required: true,
  },
});

export const StudentModel = model<Student>("Student", studentSchema);
