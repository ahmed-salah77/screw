import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
} from "@chakra-ui/react";
import  { useState } from "react";
import { IoGameController } from "react-icons/io5";
import { socket } from "../connection/socket";
import { v4 } from "uuid";
import useGameStore from "../store";

const CreateGame = () => {
  const player = useGameStore((s) => s.game.myPlayer);
  const setPlayer = useGameStore((s) => s.setPlayer);
  const [roomData, setRoomData] = useState({
    name: "",
    password: "",
  });
  const createRoom = () => {
    if (roomData.name == "") {
    }
    const roomId = v4();
    console.log(roomId);
    socket.emit("createRoom", {
      roomId,
      player: { ...player, isInRoom: true, room: roomId },
      password: roomData.password,
      roomName: roomData.name != "" ? roomData.name : `غرفة ${player.name}`,
    });
    setPlayer({
      ...player,
      isInRoom: true,
      roomId: roomId,
    });
  };
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDir={"column"}
      padding={5}
    >
      <HStack
        borderBottom={"1px solid white"}
        paddingBottom={5}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
      >
        <Heading textAlign={"center"}>انشاء غرفة</Heading>
        <Box paddingTop={"10px"}>
          <IoGameController size={"40px"} />
        </Box>
      </HStack>
      <FormControl marginTop={5}>
        <FormLabel>اسم الغرفة</FormLabel>
        <Input
          value={roomData.name}
          onChange={(e) => setRoomData({ ...roomData, name: e.target.value })}
          variant="flushed"
          type="text"
          id="room_name"
          mb={5}
          required
          minLength={3}
          maxLength={32}
        />
        <FormLabel>كلمة المرور للغرفة</FormLabel>
        <Input
          onChange={(e) =>
            setRoomData({ ...roomData, password: e.target.value })
          }
          variant="flushed"
          type="password"
          id="room_password"
          mb={5}
          maxLength={32}
        />
        <Button colorScheme="green" onClick={createRoom}>
          إنشاء
        </Button>
      </FormControl>
    </Box>
  );
};

export default CreateGame;
