export default class Room {
  constructor(private _id: number, private _name: string) {}

  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }
}
