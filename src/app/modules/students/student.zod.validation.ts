import { z } from "zod";

// UserName Schema
const userNameZotValidationSchema = z.object({
  firstName: z
    .string()
    .min(5, { message: "First name must be at least 5 characters long." })
    .max(20, { message: "First name must not exceed 20 characters." })
    .regex(/^[A-Z][a-z]*$/, {
      message: "First name must start with an uppercase letter.",
    }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .regex(/^[A-Za-z]+$/, {
      message: "Last name must only contain alphabets.",
    })
    .nonempty({ message: "Last name is required. Please provide a valid last name." }),
});

// Guardian Schema
const guardianZotValidationSchema = z.object({
  fatherName: z
    .string()
    .nonempty({ message: "Father's name is required. Please provide a valid name." }),
  fatherContactNo: z
    .string()
    .nonempty({ message: "Father's contact number is required. Please provide a valid number." }),
  fatherOccuption: z
    .string()
    .nonempty({ message: "Father's occupation is required. Please provide a valid occupation." }),
  motherName: z
    .string()
    .nonempty({ message: "Mother's name is required. Please provide a valid name." }),
  motherContactNo: z
    .string()
    .nonempty({ message: "Mother's contact number is required. Please provide a valid number." }),
  motherOccuption: z
    .string()
    .nonempty({ message: "Mother's occupation is required. Please provide a valid occupation." }),
});

// Local Guardian Schema
const localGuardianZotValidationSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Local guardian's name is required. Please provide a valid name." }),
  contactNo: z
    .string()
    .nonempty({ message: "Local guardian's contact number is required. Please provide a valid number." }),
  occupation: z
    .string()
    .nonempty({ message: "Local guardian's occupation is required. Please provide a valid occupation." }),
  address: z
    .string()
    .nonempty({ message: "Local guardian's address is required. Please provide a valid address." }),
});

// Main Student Schema
const studentZotValidationSchema = z.object({
  id: z
    .string()
    .nonempty({ message: "Student ID is required. Please provide a unique ID." }),
  password: z
    .string().max(20)
    .nonempty({ message: "password is required. Please provide a unique password." }),
  name: userNameZotValidationSchema,
  gender: z
    .enum(["male", "female", "other"], {
      errorMap: () => ({
        message: "Gender must be 'male', 'female', or 'other'.",
      }),
    }),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .email({ message: "Please provide a valid email address." }),
  contactNo: z
    .string()
    .nonempty({ message: "Contact number is required. Please provide a valid number." }),
  emergencyContactNo: z
    .string()
    .nonempty({ message: "Emergency contact number is required. Please provide a valid number." }),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
      errorMap: () => ({
        message: "Blood group must be one of 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', or 'O-'.",
      }),
    }),
  presentAddress: z
    .string()
    .nonempty({ message: "Present address is required. Please provide a valid address." }),
  permanentAddress: z
    .string()
    .nonempty({ message: "Permanent address is required. Please provide a valid address." }),
  guardian: guardianZotValidationSchema,
  localGuardian: localGuardianZotValidationSchema,
  profileImage: z.string().optional(),
  isDeleted:z.boolean(),
  isActive: z
    .enum(["active", "block"], {
      errorMap: () => ({
        message: "Status must be either 'active' or 'block'.",
      }),
    })
    .default("active"),
});

export default studentZotValidationSchema ;
