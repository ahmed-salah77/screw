import { v4 } from "uuid";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { socket } from "../connection/socket";
import useGameStore from "../store";

const StartGame = () => {
  const player = useGameStore((s) => s.game.myPlayer);
  const setPlayer = useGameStore((s) => s.setPlayer);
  const createNewRoom = useGameStore((s) => s.createRoom);
  const joinToRoom = useGameStore((s) => s.joinRoom);
  const createRoom = () => {
    const roomName = (document.getElementById("room_name") as HTMLInputElement)
      .value;
    const password = (
      document.getElementById("room_password") as HTMLInputElement
    ).value;
    const roomId = v4();
    console.log(roomId);
    setPlayer({
      ...player,
      isInRoom: true,
      room: roomId,
    });
    createNewRoom({
      id: roomId,
      name: roomName,
      host: player,
      numberOfPlayers: 1,
      players: [player],
      password,
      isRunningGame: false,
    });
    socket.emit("joinRoom", {
      roomId,
      player: { ...player, isInRoom: true, room: roomId },
      password: password,
      roomName,
    });
    alert("room id: " + roomId);
  };
  const joinRoom = () => {
    const roomId = (document.getElementById("room_id") as HTMLInputElement)
      .value;
    const roomPassword = (
      document.getElementById("room_password2") as HTMLInputElement
    ).value;
    socket.emit("joinRoom", {
      roomId: roomId,
      player: player,
      password: roomPassword,
    });
    socket.on("res", (res) => {
      if (res.message == "joined successfully") {
        joinToRoom(res.room);
        console.log("joined successfully");
      } else {
        console.log("wrong password");
      }
    });
  };
  return (
    <VStack padding={10}>
      <Heading>CREATE ROOM</Heading>
      <FormControl>
        <Input type="text" id="room_name"></Input>
        <FormLabel>Room Name</FormLabel>
        <Input type="password" id="room_password"></Input>
        <FormLabel>Room Password</FormLabel>
        <Button onClick={createRoom}>Create Room</Button>
      </FormControl>
      <Heading>OR</Heading>
      <Heading>JOIN ROOM</Heading>
      <FormControl>
        <Input type="text" id="room_id"></Input>
        <FormLabel>Room id</FormLabel>
        <Input type="password" id="room_password2"></Input>
        <FormLabel>Room Password</FormLabel>
        <Button onClick={joinRoom}>Join Room </Button>
      </FormControl>
    </VStack>
  );
};

export default StartGame;
