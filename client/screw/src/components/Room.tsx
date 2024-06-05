import { Box, HStack, SimpleGrid } from "@chakra-ui/react";
import GameTable from "./GameTable";
import useGameStore from "../store";
import ScrewButton from "./ScrewButton";
import EndTurnButton from "./EndTurnButton";
import Alerts from "./Alerts";
import RoomStates from "./RoomStates";
import RoomChat from "./RoomChat";
import StartButton from "./StartButton";

const Room = () => {
  const room = useGameStore((s) => s.game.room);
  return (
    <SimpleGrid
      color={"white"}
      paddingTop={"5%"}
      display={"flex"}
      w={"100"}
      flexDir={{
        base: "column",
        sm: "column",
        md: "column",
        lg: "column",
        xl: "row-reverse",
      }}
      justifyContent={"space-between"}
      minH={"100vh"}
      gap={5}
    >
      <Box
        borderRight={{ base: "none", xl: "1px solid white" }}
        width={{ base: "100vw", xl: "25%" }}
      >
        <RoomStates />
      </Box>
      <Box
        width={{ base: "100vw", md: "100vw", xl: "50%" }}
        paddingTop={5}
        display={"flex"}
        justifyContent={"center"}
        flexDir={"column"}
        position={"relative"}
      >
        <Box
          w={"100%"}
          display={"flex"}
          alignItems={"center"}
          flexDir={"column"}
        >
          <Box position={"absolute"} top={-20}>
            <Alerts />
          </Box>
          <GameTable room={room} />
        </Box>
        <HStack
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          paddingTop={"10%"}
        >
          <ScrewButton />
          <EndTurnButton />
          <StartButton />
        </HStack>
      </Box>
      <Box
        borderLeft={{ base: "none", xl: "1px solid white" }}
        width={{ base: "100vw", xl: "25%" }}
      >
        <RoomChat />
      </Box>
    </SimpleGrid>
  );
};

export default Room;
