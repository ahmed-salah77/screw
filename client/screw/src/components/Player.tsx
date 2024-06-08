import useGameStore, {
  Player as playerInterface,
  Card as CardInterface,
} from "../store";
import { Text, Box, CircularProgress, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { socket } from "../connection/socket";
import canDropPlayer from "../services/canDropPlayer";
interface Props {
  player: playerInterface;
  number: number;
}
const Player = ({ player, number }: Props) => {
  const room = useGameStore((s) => s.game.room);
  const playerId = useGameStore((s) => s.game.myPlayer.id);
  const startTime = room.turnStartedTime;
  const [time, setTime] = useState(30);
  const calculateTimeRemaining = () => {
    const now = Date.now();
    const elapsedTime = now - startTime;
    const timeRemaining = Math.max(0, 30 * 1000 - elapsedTime);
    let second = (timeRemaining / 1000) % 60;
    setTime(second);
  };

  if (!player) return null;

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept:
        room.case == 0
          ? "topCard"
          : room.case == 5 ||
            room.case == 6 ||
            room.case == 10 ||
            room.case == 11
          ? "card"
          : "",
      drop: (Droppedcard: CardInterface) => {
        console.log("dropped to the player");
        // if (room.turn == -1 || room.players[room.turn].id !== playerId) return;
        if (Droppedcard.owner == "topCard") {
          socket.emit("takeTopCard", { number, player, roomId: room.id });
        } else if (Droppedcard.owner == playerId && room.case == 5) {
          socket.emit("seeYourCard", {
            number,
            player,
            cardId: Droppedcard.id,
            roomId: room.id,
          });
        } else if (Droppedcard.owner != playerId && room.case == 6) {
          socket.emit("seeOpponentCard", {
            number,
            player,
            cardId: Droppedcard.id,
            roomId: room.id,
          });
        } else if (
          room.case == 10 &&
          !room.seenCards.includes(Droppedcard.owner)
        ) {
          socket.emit("ka3bDayer", {
            number,
            player,
            cardId: Droppedcard.id,
            roomId: room.id,
          });
        }
        else if(room.case == 11 && Droppedcard.owner != player.id){
          socket.emit("5odBas", {
            player,
            cardId: Droppedcard.id,
            roomId: room.id,
          });
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [room, player]
  );
  useEffect(() => {
    const interval = setInterval(calculateTimeRemaining, 10);
    return () => {
      clearInterval(interval);
    };
  }, [room]);

  const isDroppable = canDropPlayer(player);
  return (
    <VStack
      ref={isDroppable ? drop : null}
      w="100%"
      h="100%"
      position={"relative"}
      textAlign={"center"}
    >
      {room.turn !== -1 &&
      room.players[room.turn].id == player.id &&
      room.roundState == "running" ? (
        <CircularProgress
          backgroundImage={`/images/avatar-icons/${player.avatar}.png`}
          backgroundSize={"80%"}
          backgroundRepeat={"no-repeat"}
          backgroundPosition={"center"}
          value={Math.round((time * 10) / 3)}
          position={"absolute"}
          size={"100%"}
          thickness="4%"
          color={time >= 10 ? "green" : "red"}
        ></CircularProgress>
      ) : (
        <Box
          backgroundImage={`/images/avatar-icons/${player.avatar}.png`}
          backgroundSize={"80%"}
          backgroundRepeat={"no-repeat"}
          backgroundPosition={"center"}
          position={"absolute"}
          w={"100%"}
          h={"100%"}
        ></Box>
      )}
      {isOver && (
        <Box
          borderRadius={"100%"}
          background={"yellow"}
          position={"absolute"}
          w={"80%"}
          h={"80%"}
          top={"10%"}
          opacity={"0.5"}
        ></Box>
      )}

      <Text
        color={"yellow"}
        fontSize={"1.2rem"}
        fontWeight={"bold"}
        // position={"absolute"}
        zIndex={"1"}
        right={"40%"}
        marginTop={"-10%"}
        textAlign={"center"}
        h={"min-content"}
      >
        {player.name}
      </Text>
      {room.screw == player.id && (
        <Text
          color={"green"}
          fontSize={["0.5rem", "1.1rem", "2.2rem"]}
          fontWeight={"bold"}
          // position={"absolute"}
          zIndex={"1"}
          right={"40%"}
          marginTop={"10%"}
          textAlign={"center"}
          h={"min-content"}
        >
          سكرو
        </Text>
      )}
    </VStack>
  );
};

export default Player;
