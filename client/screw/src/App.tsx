import { useEffect } from "react";
import "./App.css";
import { socket } from "./connection/socket";
import useGameStore from "./store";
import EnterYourName from "./components/EnterYourName";
import StartGame from "./components/StartGame";
import { Button, Heading, List, ListItem, Text } from "@chakra-ui/react";

function App() {
  const myPlayer = useGameStore((s) => s.game.myPlayer);
  const setRoom = useGameStore((s) => s.setRoom);
  const room = useGameStore((s) => s.game.room);
  const playersInRoom = useGameStore((s) => s.game.room.players);
  const leaveRoom = useGameStore((s) => s.leaveRoom);
  useEffect(() => {
    socket.on("connect", () => {
      // socket.emit("join", {
      //   name: "Ahmed" + socket.id?.slice(0, 3),
      //   room: "room1",
      // });
      console.log("new connection from client: ", socket.id);
    });
    socket.on("disconnect", () => {
      socket.emit("leaveRoom", { roomId: room?.id, player: myPlayer });
    });
    socket.on("roomUpdated", (room) => {
      console.log("room updated", room);
      setRoom(room);
    });
  }, [room]);
  socket.on("message", (message) => {
    console.log(message.text);
  });

  if (myPlayer.name == "") {
    return <EnterYourName />;
  }
  if (myPlayer.isInRoom == false) {
    return <StartGame />;
  }
  return (
    <>
      <Heading>
        Hello World My Name Is : {myPlayer.name}, I am in room {room.name}
      </Heading>
      <Text>Players in Room</Text>
      <List>
        {playersInRoom.map((player) => (
          <ListItem key={player.id}>{player.name}</ListItem>
        ))}
      </List>
      <Button
        colorScheme="red"
        onClick={() => {
          socket.emit("leaveRoom", { roomId: room.id, player: myPlayer });
          leaveRoom();
        }}
      >
        Leave Room
      </Button>
    </>
  );
}

export default App;
