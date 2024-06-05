import useGameStore from "../store";
import { Button } from "@chakra-ui/react";
import roundArabicText from "../services/roundArabicText";
import { socket } from "../connection/socket";

const StartButton = () => {
  const room = useGameStore((s) => s.game.room);
  const myPlayer = useGameStore((s) => s.game.myPlayer);
  const startGame = () => {
    socket.emit("startGame", room.id);
  };
  return myPlayer.id == room.host && room.roundState == "notStarted" ? (
    <Button
      colorScheme="green"
      w={"120px"}
      paddingX={"50px"}
      zIndex={1}
      onClick={startGame}
    >
      بدأ الجولة {roundArabicText(room.round)}
    </Button>
  ) : (
    <></>
  );
};

export default StartButton;
