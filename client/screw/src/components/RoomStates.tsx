import { Box, HStack, Heading, Text } from "@chakra-ui/react";
import useGameStore from "../store";
import ScoreTable from "./ScoreTable";
import roundArabicText from "../services/roundArabicText";
import { GrScorecard } from "react-icons/gr";

const RoomStates = () => {
  const room = useGameStore((s) => s.game.room);
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
        <Heading textAlign={"center"}>نقاط اللاعبين</Heading>
        <Box>
          <GrScorecard size={"40px"} />
        </Box>
      </HStack>
      {
        <HStack
          paddingTop={5}
          justifyContent={"center"}
          alignItems={"center"}
          fontSize={"1.5rem"}
          gap={2}
        >
          <Text>الجولة</Text>
          <Text color={"yellow"}>{roundArabicText(room.round)}</Text>
          {room.lap && (
            <>
              <Text>اللفة</Text>
              <Text color={"yellow"}>{room.lap}</Text>
            </>
          )}
          <Box paddingTop={"10px"}></Box>
        </HStack>
      }
      <ScoreTable />
    </Box>
  );
};

export default RoomStates;
