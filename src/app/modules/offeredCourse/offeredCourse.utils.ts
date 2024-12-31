import { TSchedule } from "./offeredCourse.interface";

export const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newScheule: TSchedule
) => {
  for (const schedule of assignedSchedules) {
    const existingStart = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEnd = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newScheule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newScheule.endTime}`);
    if (newStartTime < existingEnd && newEndTime > existingStart) {
      return true;
    }
  }
  return false;
};
