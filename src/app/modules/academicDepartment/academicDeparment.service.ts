import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};
const getAcademicDepartmentsIntoDB = async () => {
  const result = await AcademicDepartmentModel.find().populate('academicFaculty');
  return result;
};
const singleGetAcademicDepartmentsIntoDB = async (id: string) => {
  const result = await AcademicDepartmentModel.findById(id);
  return result;
};
const updateGetAcademicDepartmentsIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>
) => {
  const result = await AcademicDepartmentModel.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAcademicDepartmentsIntoDB,
  singleGetAcademicDepartmentsIntoDB,
  updateGetAcademicDepartmentsIntoDB,
};
