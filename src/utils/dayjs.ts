import dayjs from "dayjs";

declare module "dayjs" {
  interface Dayjs {
    lastWorkingDay(): dayjs.Dayjs;
  }
}

dayjs.prototype.lastWorkingDay = () => {
  const currentDay = dayjs();

  if (currentDay.day() === 6) {
    return currentDay.subtract(1, "day");
  } else if (currentDay.day() === 0) {
    return currentDay.subtract(2, "day");
  }
  return currentDay;
};

export default dayjs;
