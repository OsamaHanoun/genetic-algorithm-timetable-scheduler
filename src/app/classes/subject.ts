export default class Subject {
  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public get numLessons() {
    return this._numLessons;
  }

  public get maxPerDay() {
    return this._maxPerDay;
  }

  public get minPerDay() {
    return this._minPerDay;
  }

  public get overNumDays() {
    return this._overNumDays;
  }

  constructor(
    private _id: number,
    private _name: string,
    private _numLessons: number,
    private _maxPerDay: number,
    private _minPerDay: number,
    private _overNumDays: number
  ) {}
}