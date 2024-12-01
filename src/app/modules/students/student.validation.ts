import Joi from "joi";

// UserName Schema
const usernameValidationSchema = Joi.object({
  firstName: Joi.string()
    .min(5)
    .max(20)
    .required()
    .trim()
    .pattern(/^[A-Z][a-z]*$/)
    .messages({
      "string.pattern.base": "First name must start with an uppercase letter.",
      "string.min": "First name must be at least 5 characters long.",
      "string.max": "First name must not exceed 20 characters.",
      "any.required": "First name is required. Please provide a valid first name.",
    }),
  middleName: Joi.string().allow(null, ""),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      "string.pattern.base": "Last name must only contain alphabets.",
      "any.required": "Last name is required. Please provide a valid last name.",
    }),
});

// Guardian Schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    "any.required": "Father's name is required. Please provide a valid name.",
  }),
  fatherContactNo: Joi.string().required().messages({
    "any.required": "Father's contact number is required. Please provide a valid number.",
  }),
  fatherOccuption: Joi.string().required().messages({
    "any.required": "Father's occupation is required. Please provide a valid occupation.",
  }),
  motherName: Joi.string().required().messages({
    "any.required": "Mother's name is required. Please provide a valid name.",
  }),
  motherContactNo: Joi.string().required().messages({
    "any.required": "Mother's contact number is required. Please provide a valid number.",
  }),
  motherOccuption: Joi.string().required().messages({
    "any.required": "Mother's occupation is required. Please provide a valid occupation.",
  }),
});

// Local Guardian Schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Local guardian's name is required. Please provide a valid name.",
  }),
  contactNo: Joi.string().required().messages({
    "any.required": "Local guardian's contact number is required. Please provide a valid number.",
  }),
  occupation: Joi.string().required().messages({
    "any.required": "Local guardian's occupation is required. Please provide a valid occupation.",
  }),
  address: Joi.string().required().messages({
    "any.required": "Local guardian's address is required. Please provide a valid address.",
  }),
});

// Main Student Schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Student ID is required. Please provide a unique ID.",
  }),
  name: usernameValidationSchema.required().messages({
    "any.required": "Student's name details are required.",
  }),
  gender: Joi.string()
    .valid("male", "female", "other")
    .required()
    .messages({
      "any.only": "Gender must be 'male', 'female', or 'other'.",
      "any.required": "Gender is required. Please select a valid option.",
    }),
  dateOfBirth: Joi.string().isoDate().optional(),
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Please provide a valid email address.",
      "any.required": "Email is required. Please provide a valid email address.",
    }),
  contactNo: Joi.string().required().messages({
    "any.required": "Contact number is required. Please provide a valid number.",
  }),
  emergencyContactNo: Joi.string().required().messages({
    "any.required": "Emergency contact number is required. Please provide a valid number.",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required()
    .messages({
      "any.only": "Blood group must be one of 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', or 'O-'.",
      "any.required": "Blood group is required. Please select a valid blood group.",
    }),
  presentAddress: Joi.string().required().messages({
    "any.required": "Present address is required. Please provide a valid address.",
  }),
  permanentAddress: Joi.string().required().messages({
    "any.required": "Permanent address is required. Please provide a valid address.",
  }),
  guardian: guardianValidationSchema.required().messages({
    "any.required": "Guardian details are required.",
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    "any.required": "Local guardian details are required.",
  }),
  profileImage: Joi.string().uri().optional(),
  isActive: Joi.string()
    .valid("active", "block")
    .default("active")
    .messages({
      "any.only": "Status must be either 'active' or 'block'.",
    }),
});

export default studentValidationSchema ;
