

import { Model } from "mongoose";
export type TGuardian = {
  fatherName: string;
  fatherOccuption: string;
  fatherContactNo: string;
  motherName: string;
  motherOccuption: string;
  motherContactNo: string;
};
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  email: string;
  profileImage?: string;
  isActive: "active" | "block";
  gender: "male" | "female" | "other";
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  isDeleted:boolean
};


// for creating static


export interface StudentModel extends Model<TStudent> {
isUserExists(id:string):Promise< TStudent | null>
}









// for creating instance


// export type StudentsMethods = {
//   isUserExits(id: string): Promise<TStudent| null>;
// };
// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentsMethods
// >;
