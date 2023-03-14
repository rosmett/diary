import moment from "moment";
import { end } from "pdfkit";
export default {
  startDate: new Date("2023-03-12"),
  endDate: new Date("2023-06-30"),
  expectedStartWeight: 98,
  fileName: "Journal-2022T2",
  margin: 5, // 5mm non-printable area
  gutter: 5, // Additional 5mm to allow for binding
};

export const todos = [
  { task: 'Reflection & Planning '},
  { task: 'Washing (20 mins)', days: [1,2,3,4,5] },
  { task: 'Clean out fridge', days: [6]}
]

export const getDates = (startDate, endDate) => {
  //get Saturday before startInput
  const startInput = moment(startDate),
    endInput = moment(endDate);

  console.log({
    startInput,
    endInput,
  });

  const margin = endInput <= 5? 0 : 7;
  const start = startInput.day(-1);
  const end = endInput.day(5 + margin);

  const totalWeeks = end.diff(start, "week");

  const dates = {
    startDate: new Date(start.year(), start.month(), start.date()),
    endDate: new Date(end.year(), end.month(), end.date()),
    totalWeeks,
  };
  console.log("dates: ", dates);

  return dates;
};
