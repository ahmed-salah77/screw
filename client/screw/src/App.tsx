import { useEffect } from "react";
import "./App.css";
import { socket } from "./connection/socket";
import useGameStore from "./store";
import EnterYourName from "./components/EnterYourName";
import Room from "./components/Room";
import Rooms from "./components/Rooms";
function App() {
  const myPlayer = useGameStore((s) => s.game.myPlayer);
  const setRoom = useGameStore((s) => s.setRoom);
  const room = useGameStore((s) => s.game.room);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("new connection from client: ", socket.id);
      socket.off("connect");
    });
    socket.on("reconnect", (attemptNumber) => {
      console.log("Reconnected to server. Attempt:", attemptNumber);
    });
    socket.on("disconnect", () => {
      socket.emit("leaveRoom", { roomId: room?.id, player: myPlayer });
    });
    socket.on("roomUpdated", (room) => {
      console.log("roomUpdated");
      setRoom(room);
      socket.off("roomUpdated");
    });
  }, [room]);
  socket.on("message", (message) => {
    console.log(message.text);
  });
  // return <Room />;
  if (myPlayer.name == "") {
    return <EnterYourName />;
  }
  if (myPlayer.isInRoom == false || room.players.length == 0) {
    // return <Rooms />;
    return <Rooms />;
  }
  return <Room />;
}

export default App;
