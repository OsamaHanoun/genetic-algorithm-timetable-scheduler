import Lesson from "../classes/lesson";
import Day from "../classes/day";
import Subject from "../classes/subject";
import Room from "../classes/room";
import _ from "lodash";

class DataManipulation {
  static copyLessons(lessons: Lesson[]): Lesson[] {
    const lessonsCopy: Lesson[] = lessons.map((lesson) => {
      const { subject, day, room, time: timeCopy } = lesson;
      const subjectCopy = this.copySubject(subject);
      const dayCopy = this.copyDay(day);
      const roomCopy = this.copyRoom(room);
      const lessonCopy = new Lesson(dayCopy, roomCopy, timeCopy, subjectCopy);
      return lessonCopy;
    });
    return lessonsCopy;
  }

  static copySubjectsFromLessons(lessons: Lesson[]): Subject[] {
    const subjectCopy: Subject[] = lessons.map((lesson) =>
      this.copySubject(lesson.subject)
    );
    return subjectCopy;
  }

  static copyRoomsFromLessons(lessons: Lesson[]): Room[] {
    const roomCopy: Room[] = lessons.map((lesson) =>
      this.copyRoom(lesson.room)
    );
    return roomCopy;
  }

  static copySubject(subject): Subject {
    const { id, name, numLessons, maxPerDay, minPerDay, overNumDays } = subject;
    const subjectCopy = new Subject(
      id,
      name,
      numLessons,
      maxPerDay,
      minPerDay,
      overNumDays
    );
    return subjectCopy;
  }

  static copySubjects(subjects: Subject[]): Subject[] {
    const subjectsCopy = subjects.map((subject) => {
      return this.copySubject(subject);
    });
    return subjectsCopy;
  }

  static copyDay(day: Day): Day {
    const { id, name, numLessons } = day;
    const dayCopy: Day = new Day(id, name, numLessons);
    return dayCopy;
  }

  static copyRoom(room: Room): Room {
    const { id, name } = room;
    const roomCopy = new Room(id, name);
    return roomCopy;
  }

  static getRoomsOrderInLessonsById(lessons: Lesson[]): number[] {
    const roomsOrder: number[] = lessons.map((lesson) => {
      return this.getRoomIdFromLesson(lesson);
    });

    return roomsOrder;
  }

  static getRoomIdFromLesson(lesson: Lesson): number {
    const id: number = lesson.room.id;
    return id;
  }

  static destructLessonsToSubsetsByRoom(lessons: Lesson[]): Lesson[][] {
    let lessonsByRoom: any = [];

    lessons.forEach((lesson) => {
      const roomId = lesson.room.id;
      _.set(
        lessonsByRoom,
        [roomId, lessonsByRoom[roomId]?.length || 0],
        lesson
      );
    });

    return lessonsByRoom;
  }
}

export default DataManipulation;
