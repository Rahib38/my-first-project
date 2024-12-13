import { TAcademicSemesterCode, TAcademicSemesterName, TAcademicSemesterNameCodeMapper, TMonths } from "./academicSemester.interface";

export const months: TMonths[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octobar",
    "November",
    "December",
  ];
 export const AcademicSemesterName:TAcademicSemesterName[]=['Autumn','Summar','Fall']
 export const AcademicSemesterCode:TAcademicSemesterCode[]=['01','02','03']
export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};