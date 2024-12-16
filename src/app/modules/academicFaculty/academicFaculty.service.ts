import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFacultys } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFacultys.create(payload);
  return result;
};
const getAcademicFacultysIntoDB = async () => {
  const result = await AcademicFacultys.find();
  return result;
};
const getSingleAcademicFacultyIntoDB = async (id: string) => {
  const result = await AcademicFacultys.findById(id);
  return result;
};
const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>
) => {
  const result = await AcademicFacultys.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getSingleAcademicFacultyIntoDB,
  getAcademicFacultysIntoDB,
  updateAcademicFacultyIntoDB,
};
