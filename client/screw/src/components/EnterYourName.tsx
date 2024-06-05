import {
  Box,
  Button,
  Center,
  FormControl,
  Text,
  Input,
  VStack,
  FormLabel,
  Image,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import useGameStore from "../store";
import { socket } from "../connection/socket";
import Avatars from "./Avatars";

const EnterYourName = () => {
  const setPlayer = useGameStore((s) => s.setPlayer);
  const [username, setUsername] = useState<string>("");
  const [avatarId, setAvatarId] = useState(0);
  const showAvatars = () => {
    (
      document.querySelector(".avatars-container") as HTMLElement
    ).style.display = "flex";
    console.log("here");
  };
  const handleChangeAvatar = (avatar_idx: number) => {
    if (avatar_idx < 0 || avatar_idx > 135) return;
    setAvatarId(avatar_idx);
    (
      document.querySelector(".avatars-container") as HTMLElement
    ).style.display = "none";
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim().length == 0 || socket.id == undefined) return;
    console.log(username, avatarId);
    setPlayer({
      id: socket.id,
      name: username,
      avatar: avatarId.toString(),
      isInRoom: false,
      roomId: null,
      hand: 0,
    });
  };
  return (
    <Center h="100vh" w={"100vw"} color={"white"}>
      <VStack spacing={8}>
        <Text fontSize={["2xl", "3xl"]} fontWeight="bold" textAlign="center">
          مرحبًا بك في لعبة سكرو!
        </Text>
        <Center onClick={showAvatars} flexDir={"column"} gap={5}>
          <Image
            w={"150px"}
            className="avatar-img"
            src={"/images/avatar-icons/" + avatarId + ".png"}
          />
          <Button onClick={showAvatars} colorScheme="yellow">
            تغيير الافاتار
          </Button>
        </Center>
        <Avatars handleChange={handleChangeAvatar} />
        <Box w={["100%", "md"]}>
          <form onSubmit={handleSubmit}>
            <FormControl id="name">
              <FormLabel fontSize="xl" textAlign={"center"}>
                الاسم
              </FormLabel>
              <Input
                type="text"
                maxLength={10}
                onChange={(e) => setUsername(e.target.value)}
                value={username as string}
                required
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              mt={4}
              w="full"
              fontSize="xl"
            >
              البدء في اللعب
            </Button>
          </form>
        </Box>
      </VStack>
    </Center>
  );
};

export default EnterYourName;
