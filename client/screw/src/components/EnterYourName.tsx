import {
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import useGameStore from "../store";
import { socket } from "../connection/socket";

const EnterYourName = () => {
  const setPlayer = useGameStore((s) => s.setPlayer);
  const [username, setUsername] = useState<string | null>(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      username == null ||
      username.trim().length == 0 ||
      socket.id == undefined
    )
      return;
    console.log(username);
    setPlayer({
      id: socket.id,
      name: username,
      isInRoom: false,
      room: null,
      cards: null,
    });
  };
  return (
    <FormControl height={"100vh"} width={"100%"}>
      <Center h={"100%"}>
        <VStack>
          <Heading>Please Enter your name</Heading>
          <Input id="username" onChange={(e) => setUsername(e.target.value)} />
          <Button onClick={handleSubmit}>Submit</Button>
        </VStack>
      </Center>
    </FormControl>
  );
};

export default EnterYourName;
