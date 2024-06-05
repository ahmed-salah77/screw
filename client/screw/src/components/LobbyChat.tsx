import {
  Box,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import LobbyMessages from "./LobbyMessages";
import { FaMessage } from "react-icons/fa6";
import { BsSendFill } from "react-icons/bs";
import { socket } from "../connection/socket";
import useGameStore from "../store";

const LobbyChat = () => {
  const [message, setMessage] = useState("");
  const myPlayer = useGameStore((s) => s.game.myPlayer);
  const sendMessage = () => {
    if (message == "" || message.length > 50) return;
    socket.emit("send-lobby-message", {
      id: myPlayer.id,
      sender: myPlayer.name,
      content: message,
      avatar: myPlayer.avatar,
    });
    setMessage("");
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
        <Heading textAlign={"center"}>دردشة عامة</Heading>
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
      <LobbyMessages />
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

export default LobbyChat;
