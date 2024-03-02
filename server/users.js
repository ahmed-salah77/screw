var players = [];
const addUser = (player) => {
  players.push(player);
  console.log(players);
  return player;
};
const getUser = (id) => {
  const idx = users.findIndex((cur) => cur.id == id);
  if (id == -1) return null;
  return users[idx];
};
const getUsersInRoom = (room) => {
  return users.filter((u) => u.room == room);
};
const removeUser = (id) => {
  const idx = users.findIndex((cur) => cur.id == id);
  if (idx != -1) {
    const user = { ...users[idx] };
    users = users.filter((u) => u.id !== id);
    return user;
  }
  return null;
};

exports.addUser = addUser;
exports.getUser = getUser;
exports.removeUser = removeUser;
exports.getUsersInRoom = getUsersInRoom;
