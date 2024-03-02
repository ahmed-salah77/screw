const io = require("socket.io");

function manageRooms(server) {
  const socketServer = io(server, {
    cors: {
      origin: "*",
    },
  });

  // Store the active rooms
  const rooms = {};

  socketServer.on("connection", (socket) => {
    console.log("A user connected");

    // Join a room
    socket.on("joinRoom", ({ roomId, player, password, roomName }) => {
      // Create the room if it doesn't exist
      if (!rooms[roomId]) {
        rooms[roomId] = {
          id: roomId,
          name: roomName,
          host: player,
          numberOfPlayers: 1,
          players: [player],
          password,
          isRunningGame: false,
        };
        socket.join(roomId);
        console.log(player);
        console.log(`User ${player?.name} created room ${roomId}`);
      } else if (password == rooms[roomId].password) {
        rooms[roomId].players.push(player);
        rooms[roomId].numberOfPlayers++;

        // Join the room

        // Emit the updated room data to all clients in the room
        socket.join(roomId);
        socket.emit("res", {
          message: "joined successfully",
          room: rooms[roomId],
        });
        socketServer.to(roomId).emit("roomUpdated", rooms[roomId]);
        console.log(`User ${player.name} joined room ${roomId}`);
      } else {
        console.log(password, rooms[roomId].password);
        socket.emit("res", { message: "wrong password" });
      }
    });

    // Leave a room
    socket.on("leaveRoom", ({ roomId, player }) => {
      console.log(roomId, player);
      if (rooms[roomId]) {
        console.log(`User ${player.name} left room ${roomId}`);
        // Remove the player from the room
        rooms[roomId].players = rooms[roomId].players.filter(
          (_player) => _player.id !== player.id
        );

        // Leave the room
        socket.leave(roomId);

        // Emit the updated room data to all clients in the room
        socketServer.to(roomId).emit("roomUpdated", rooms[roomId]);
      }
    });

    // Disconnect event
    socket.on("disconnect", () => {
      console.log("A user disconnected");

      // Remove the player from all rooms
      for (const roomId in rooms) {
        rooms[roomId].players = rooms[roomId].players.filter(
          (player) => player.id !== socket.id
        );

        // Emit the updated room data to all clients in the room
        socketServer.to(roomId).emit("roomUpdated", rooms[roomId]);
      }
    });
  });
}

module.exports = manageRooms;
