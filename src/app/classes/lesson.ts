import type Day from "./day";
import type Room from "./room";
import type Subject from "./subject";

export default class Lesson {
  public get subject(): Subject {
    return this._subject;
  }

  public set subject(value: Subject) {
    this._subject = value;
  }

  public set room(value: Room) {
    this._room = value;
  }
  public get time() {
    return this._time;
  }

  public get room(): Room {
    return this._room;
  }

  public get day(): Day {
    return this._day;
  }

  constructor(
    private _day: Day,
    private _room: Room,
    private _time: number,
    private _subject: Subject
  ) {}
}
