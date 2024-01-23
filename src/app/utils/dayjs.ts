import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const defaultDateFormat = "DD/MM/YYYY";

export const dateToDDMMYYYY = (date: any) => {
  return dayjs(date).format(defaultDateFormat);
};

export const dateDifferenceFromToday = (date: string) => {
  return dayjs(date, defaultDateFormat).diff(dayjs().startOf('day'), "day");
};
