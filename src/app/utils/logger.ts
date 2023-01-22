import { NumLessonsPerRoom, SubjectData } from "../data/subjects";
import type Lesson from "../classes/lesson";
import { DayData } from "../data/days";

export default class Logger {
  static checkAll(msg, numRooms: number, lessons: Lesson[]): void {
    // this.checkNumberOfLessons(msg,numRooms, lessons);
    this.checkNumberOfDays(msg, numRooms, lessons);
    this.checkNumberOfSubjects(msg, numRooms, lessons);
  }

  static checkNumberOfDays(msg, numRooms: number, lessons: Lesson[]): void {
    const clonedData: any = [];
    for (let roomIndx = 0; roomIndx < numRooms; roomIndx++) {
      clonedData.push(JSON.parse(JSON.stringify(DayData)));
    }

    let hasError = false;

    lessons.forEach((lesson) => {
      const roomIndx = lesson.room.id;
      const dayIndx = lesson.day.id;

      --clonedData[roomIndx][dayIndx].numberOfLessons;
      if (clonedData[roomIndx][dayIndx].numberOfLessons < 0) {
        hasError = true;
      }
    });

    hasError && this.logError(msg, "Number Of Days", clonedData);
  }

  static checkNumberOfSubjects(msg, numRooms: number, lessons: Lesson[]): void {
    const clonedData: any = [];

    for (let roomIndx = 0; roomIndx < numRooms; roomIndx++) {
      clonedData.push(JSON.parse(JSON.stringify(SubjectData)));
    }

    let hasError = false;

    lessons.forEach((lesson) => {
      const subjectIndx = lesson.subject.id;
      const roomIndx = lesson.room.id;

      --clonedData[roomIndx][subjectIndx].numLessons;

      if (clonedData[roomIndx][subjectIndx].numLessons < 0) {
        hasError = true;
      }
    });

    hasError && this.logError(msg, "Number Of Subjects", clonedData);
  }

  static checkNumberOfLessons(msg, numRooms, lessons: Lesson[]): void {
    const lessonsNum: number = lessons.length;
    // the number is hard coded for fixed number of lessons
    lessonsNum !== NumLessonsPerRoom * numRooms &&
      this.logError(msg, "Number Of Lessons", lessonsNum);
  }

  static logError(msg, type: string, content: any): void {
    console.error(msg, { type, content });
  }

  static logWarn(msg, type: string, content: any): void {
    console.warn(msg, { type, content });
  }
}
