import Day from "../classes/day";

const dayData = [
  {
    id: 0,
    name: "Sunday",
    numberOfLessons: 8,
  },
  {
    id: 1,
    name: "Monday",
    numberOfLessons: 7,
  },
  {
    id: 2,
    name: "Tuesday",
    numberOfLessons: 7,
  },
  {
    id: 3,
    name: "Wednesday",
    numberOfLessons: 7,
  },
  {
    id: 4,
    name: "Thursday",
    numberOfLessons: 7,
  },
];

const days: Day[] = [];

dayData.forEach((day) => {
  days.push(new Day(day.id, day.name, day.numberOfLessons));
});

export default days;

export { dayData as DayData };
