import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import validator from "validator";
import config from "../config";
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./students/student.interface";
const usernameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [
      true,
      "First name is required. Please provide a valid first name.",
    ],
    maxlength: [20, "first Name can be more than 20"],
    trim: true,
    minlength: [5, "first Name can be more  less than 5"],
    validate: {
      validator: function (value: string) {
        const firstName = value.charAt(0).toUpperCase() + value.slice(1);
        return firstName === value;
      },
      message: "{VALUE} is not in captalize format",
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [
      true,
      "Last name is required. Please provide a valid last name.",
    ],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: `{VALUE} is not valid`,
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required. Please provide a valid name."],
  },
  fatherContactNo: {
    type: String,
    required: [
      true,
      "Father's contact number is required. Please provide a valid number.",
    ],
  },
  fatherOccuption: {
    type: String,
    required: [
      true,
      "Father's occupation is required. Please provide a valid occupation.",
    ],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required. Please provide a valid name."],
  },
  motherContactNo: {
    type: String,
    required: [
      true,
      "Mother's contact number is required. Please provide a valid number.",
    ],
  },
  motherOccuption: {
    type: String,
    required: [
      true,
      "Mother's occupation is required. Please provide a valid occupation.",
    ],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [
      true,
      "Local guardian's name is required. Please provide a valid name.",
    ],
  },
  contactNo: {
    type: String,
    required: [
      true,
      "Local guardian's contact number is required. Please provide a valid number.",
    ],
  },
  occupation: {
    type: String,
    required: [
      true,
      "Local guardian's occupation is required. Please provide a valid occupation.",
    ],
  },
  address: {
    type: String,
    required: [
      true,
      "Local guardian's address is required. Please provide a valid address.",
    ],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, "Student ID is required. Please provide a unique ID."],
    unique: true,
  },
  password: {
    type: String,
    required: [
      true,
      "password  is required. Please provide a unique password.",
    ],
  },
  name: {
    type: usernameSchema,
    required: [true, "Student's name details are required."],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message:
        "{VALUE} is not a valid gender. Please select 'male', 'female', or 'other'.",
    },
    required: [true, "Gender is required. Please select a valid option."],
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: [
      true,
      "Email is required. Please provide a valid email address.",
    ],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: `{VALUE} eta kaj kore na`,
    },
  },
  contactNo: {
    type: String,
    required: [
      true,
      "Contact number is required. Please provide a valid number.",
    ],
  },
  emergencyContactNo: {
    type: String,
    required: [
      true,
      "Emergency contact number is required. Please provide a valid number.",
    ],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      message:
        "{VALUE} is not a valid blood group. Please select a valid option.",
    },
    required: [
      true,
      "Blood group is required. Please select a valid blood group.",
    ],
  },
  presentAddress: {
    type: String,
    required: [
      true,
      "Present address is required. Please provide a valid address.",
    ],
  },
  permanentAddress: {
    type: String,
    required: [
      true,
      "Permanent address is required. Please provide a valid address.",
    ],
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian details are required."],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local guardian details are required."],
  },
  profileImage: {
    type: String,
  },
  isActive: {
    type: String,
    enum: {
      values: ["active", "block"],
      message:
        "{VALUE} is not valid. Status must be either 'active' or 'block'.",
    },
    default: "active",
    required: [true, "Status is required. Please select 'active' or 'block'."],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},{
  toJSON:{
    virtuals:true
  }
});
// virtual
studentSchema.virtual('fullName').get(function(){
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})



// pre save middleware / hook:will work on create() save()
studentSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// post save middleware / hook
studentSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// query middleware
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// for static

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// for creating instance

// studentSchema.methods.isUserExits = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
