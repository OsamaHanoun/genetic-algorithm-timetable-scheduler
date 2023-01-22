import subjects from "./data/subjects";
import getRooms from "./data/rooms";
import days from "./data/days";
import type Room from "./classes/room";
import type Day from "./classes/day";
import type Subject from "./classes/subject";
import Lesson from "./classes/lesson";

const population: Lesson[][] = [];

const generateFistGeneration = (totalPopulation, numberOfRooms) => {
  for (let index = 0; index < totalPopulation; index++) {
    population.push(generateTimetable(getRooms(numberOfRooms), days, subjects));
  }
  return population;
};

function generateTimetable(rooms: Room[], days: Day[], subjects: Subject[]) {
  const lessons: Lesson[] = [];

  for (const room of rooms) {
    const subjectsWithCounts = subjects.map((subject) => {
      return { count: subject.numLessons, subject };
    });
    for (const day of days) {
      for (let time = 0; time < day.numLessons; time++) {
        lessons.push(
          new Lesson(day, room, time, randomSubject(subjectsWithCounts))
        );
      }
    }
  }
  return lessons;
}

function randomSubject(subjectsWithCounts) {
  const randSubjectIndx = Math.floor(Math.random() * subjectsWithCounts.length);
  const randSubject: Subject = subjectsWithCounts[randSubjectIndx].subject;
  const remainingLessonsRandSubject = --subjectsWithCounts[randSubjectIndx]
    .count;

  if (remainingLessonsRandSubject === 0)
    subjectsWithCounts.splice(randSubjectIndx, 1);
  return randSubject;
}

export { generateFistGeneration };
