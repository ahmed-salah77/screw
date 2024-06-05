import useGameStore from "../store";
import { Button } from "@chakra-ui/react";
import { socket } from "../connection/socket";

const EndTurnButton = () => {
  const room = useGameStore((s) => s.game.room);
  const myPlayer = useGameStore((s) => s.game.myPlayer);
  return room.turn != -1 && room.players[room.turn].id == myPlayer.id ? (
    <Button
      colorScheme="red"
      w={"100px"}
      paddingX={"50px"}
      onClick={() => socket.emit("endTurn", { roomId: room.id })}
    >
      انهاء الدور
    </Button>
  ) : (
    <></>
  );
};

export default EndTurnButton;
