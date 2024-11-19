export type Guardian = {
  fatherName: string;
  fatherOccuption: string;
  fatherContactNo: string;
  motherName: string;
  motherOccuption: string;
  motherContactNo: string;
};
export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type Student = {
  id: string;
  name: UserName;
  email: string;
  profileImage?: string;
  isActive: "active" | "block";
  gender: "male" | "female";
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
};
