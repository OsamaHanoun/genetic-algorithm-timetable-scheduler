import Room from "../classes/room";

const getRooms = (numRooms: number): Room[] => {
  let rooms: Room[] = [];
  for (let index = 0; index < numRooms; index++) {
    rooms.push(new Room(index, "room-" + index));
  }

  return rooms;
};
export default getRooms;
