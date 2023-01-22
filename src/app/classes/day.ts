export default class Day {
  constructor(
    private _id: number,
    private _name: string,
    private _numLessons: number
  ) {}

  public get id() {
    return this._id;
  }
  public get name() {
    return this._name;
  }
  public get numLessons() {
    return this._numLessons;
  }
}
