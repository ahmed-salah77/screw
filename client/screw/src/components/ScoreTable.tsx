import {
  HStack,
  GridItem,
  Image,
  SimpleGrid,
  Text,
  Box,
} from "@chakra-ui/react";
import useGameStore from "../store";
import roundArabicText from "../services/roundArabicText";
import { IoIosCheckmark } from "react-icons/io";

const ScoreTable = () => {
  const players = useGameStore((s) => s.game.room.players);
  const scores = useGameStore((s) => s.game.room.scores);
  const room = useGameStore((s) => s.game.room);
  console.log(scores);

  let minScores = [1e9, 1e9, 1e9, 1e9, 1e9];
  scores.map((score, round) =>
    score.map((val) => {
      if (val != null) minScores[round] = Math.min(minScores[round], val);
    })
  );
  let sumScores = [0, 0, 0, 0];
  scores.map((score, round) =>
    score.map((val, idx) => {
      if (val && minScores[round] != val) sumScores[idx] += val;
    })
  );
  console.log(sumScores);

  console.log(minScores);

  return (
    <SimpleGrid
      marginTop={5}
      className="scores-table"
      width={"min(500px,100%)"}
      height={"400px"}
      overflow={"hidden"}
      columns={5}
    >
      <GridItem
        fontSize={"1rem"}
        transform={"rotate(-45deg)"}
        flexDir={"column-reverse"}
      >
        <Text w={"100%"} textAlign={"center"}>
          الجولة
        </Text>
        <Text textAlign="center" w={"100%"} borderBottom="1px solid white">
          اللاعب
        </Text>
      </GridItem>
      <GridItem outline={"1px solid white"} flexDirection={"column-reverse"}>
        {players[0] ? players[0].name : "-"}
        {players[0] && (
          <Image
            src={`/images/avatar-icons/${players[0].avatar}.png`}
            w={"40%"}
          />
        )}
      </GridItem>
      <GridItem outline={"1px solid white"} flexDirection={"column-reverse"}>
        {players[1] ? players[1].name : "-"}
        {players[1] && (
          <Image
            src={`/images/avatar-icons/${players[1].avatar}.png`}
            w={"40%"}
          />
        )}
      </GridItem>
      <GridItem outline={"1px solid white"} flexDirection={"column-reverse"}>
        {players[2] ? players[2].name : "-"}
        {players[2] && (
          <Image
            src={`/images/avatar-icons/${players[2].avatar}.png`}
            w={"40%"}
          />
        )}
      </GridItem>
      <GridItem outline={"1px solid white"} flexDirection={"column-reverse"}>
        {players[3] ? players[3].name : "-"}
        {players[3] && (
          <Image
            src={`/images/avatar-icons/${players[3].avatar}.png`}
            w={"40%"}
          />
        )}
      </GridItem>
      {scores.map((score, index) => {
        return (
          <>
            <GridItem outline={"1px solid white"} color={"yellow"}>
              <HStack position={"relative"}>
                {index == room.round && (
                  <Box className="ring-container">
                    <Box className="ringring"></Box>
                    <Box className="circle"></Box>
                  </Box>
                )}
                {index < room.round && (
                  <Box position={"absolute"} right={-8}>
                    <IoIosCheckmark color="green" size={"40px"} />
                  </Box>
                )}
                <Text>{roundArabicText(index)}</Text>
              </HStack>
            </GridItem>
            {score.map((num) =>
              num != null ? (
                <GridItem
                  outline={"1px solid white"}
                  background={num == minScores[index] ? "green" : "inherit"}
                >
                  {num == minScores[index] || num == 0 ? "صفر" : num}
                </GridItem>
              ) : (
                <GridItem outline={"1px solid white"}>-</GridItem>
              )
            )}
          </>
        );
      })}
      <GridItem>المجموع</GridItem>
      {sumScores.map((score) => (
        <GridItem borderRight={"1px solid white"}>{score}</GridItem>
      ))}
    </SimpleGrid>
  );
};

export default ScoreTable;
