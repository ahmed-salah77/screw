import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { socket } from "../connection/socket";

interface Message {
  id:string;
  sender: string;
  content: string;
  avatar: string;
}
const LobbyMessages = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollToBottom = () => {
    if(messagesEndRef.current) messagesEndRef.current.scrollTop = messagesEndRef.current?.scrollHeight;
  };
  useLayoutEffect(() => {
    // Scroll to the bottom when a new message is received
    if (
      messagesEndRef.current &&
      (messagesEndRef.current.scrollTop == (messages.length - 12) * 34 + 16 ||
        messagesEndRef.current.scrollTop == 0)
    )
      scrollToBottom();
  }, [messages]);
  useEffect(() => {
    socket.on("lobby-message", (message: Message) => {
      if (messages.length < 50) {
        setMessages((messages) => [...messages, message]);
      } else {
        const messagesTmp = [...messages].splice(1, 49);
        console.log(messagesTmp);
        setMessages([...messagesTmp, message]);
      }
    });
    return () => {
      socket.off("lobby-message");
    };
  }, [messages]);
  return (
    <Box
      border={"1px solid white"}
      padding={5}
      borderRadius={"20px"}
      marginTop={"20px"}
      h={"400px"}
      w={"100%"}
    >
      <Box
        className="lobby-chat"
        overflowY={"auto"}
        h={"100%"}
        ref={messagesEndRef}
      >
        {messages.map((message, index) => (
          <HStack marginTop={1} key={index}>
            <Image
              w={"30px"}
              src={`images/avatar-icons/${message.avatar}.png`}
            />
            <Text h={"100%"}>{`[${message.sender}]:`}</Text>
            <Text w={"100%"} overflow={"clip"}>
              {`${message.content}`}
            </Text>
          </HStack>
        ))}
      </Box>
    </Box>
  );
};

export default LobbyMessages;
