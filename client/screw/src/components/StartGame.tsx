import { v4 } from "uuid";
import {
  Button,
  Center,
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
  const createRoom = () => {
    const roomName = (document.getElementById("room_name") as HTMLInputElement)
      .value;
    const password = (
      document.getElementById("room_password") as HTMLInputElement
    ).value;
    const roomId = v4();
    console.log(roomId);
    socket.emit("createRoom", {
      roomId,
      player: { ...player, isInRoom: true, room: roomId },
      password: password,
      roomName,
    });
    setPlayer({
      ...player,
      isInRoom: true,
      roomId: roomId,
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
      player: { ...player, isInRoom: true, roomId: roomId },
      password: roomPassword,
    });
    socket.on("Joined successfully", () => {
      console.log("here");
      setPlayer({ ...player, isInRoom: true, roomId: roomId });
    });
  };
  return (
    <Center w={"100vw"} h="100vh">
      <VStack padding={10} gap={5}>
        <Heading>إنشاء غرفة</Heading>
        <FormControl>
          <FormLabel>اسم الغرفة</FormLabel>
          <Input type="text" id="room_name" mb={5}></Input>
          <FormLabel>كلمة المرور للغرفة</FormLabel>
          <Input type="password" id="room_password" mb={5}></Input>
          <Button onClick={createRoom}>إنشاء</Button>
        </FormControl>
        <Heading>الانضمام إلى غرفة</Heading>
        <FormControl>
          <FormLabel>معرف الغرفة</FormLabel>
          <Input type="text" id="room_id" mb={5}></Input>
          <FormLabel>كلمة المرور للغرفة</FormLabel>
          <Input type="password" id="room_password2" mb={5}></Input>
          <Button onClick={joinRoom}>انضمام</Button>
        </FormControl>
      </VStack>
    </Center>
  );
};

export default StartGame;
