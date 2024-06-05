import {
  Box,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import  { useState } from "react";
import { FaMessage } from "react-icons/fa6";
import { socket } from "../connection/socket";
import useGameStore from "../store";
import { BsSendFill } from "react-icons/bs";
import RoomMessages from "./RoomMessages";

const RoomChat = () => {
  const [message, setMessage] = useState("");
  const myPlayer = useGameStore((s) => s.game.myPlayer);
  const sendMessage = () => {
    if (message == "" || message.length > 50) return;
    socket.emit("send-room-message", {
      message: {
        id: myPlayer.id,
        sender: myPlayer.name,
        content: message,
        avatar: myPlayer.avatar,
      },
      roomId: myPlayer.roomId,
    });
    setMessage("");
  };
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDir={"column"}
      alignItems={"center"}
      padding={5}
    >
      <HStack
        borderBottom={"1px solid white"}
        paddingBottom={5}
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
        gap={2}
      >
        <Heading textAlign={"center"}>دردشة الغرفة</Heading>
        <Box paddingTop={"15px"}>
          <FaMessage size={"35px"} />
        </Box>
      </HStack>
      <Text
        marginTop={5}
        padding={3}
        textAlign={"center"}
        border={"1px solid white"}
        borderRadius={"50px"}
      >
        خليك لطيف في الشات وصلي علي النبي ❤️
      </Text>
      <RoomMessages />
      <InputGroup>
        <Input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyUp={(e) => (e.key == "Enter" ? sendMessage() : null)}
          variant="flushed"
          placeholder="ادخل النص هنا"
          padding={5}
          maxLength={50}
        />
        <InputLeftElement>
          <Box _hover={{ cursor: "pointer" }}>
            <BsSendFill size={"20px"} onClick={sendMessage} />
          </Box>
        </InputLeftElement>
      </InputGroup>
    </Box>
  );
};

export default RoomChat;
