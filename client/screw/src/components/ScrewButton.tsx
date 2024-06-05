import useGameStore from "../store";
import { Button } from "@chakra-ui/react";
import { socket } from "../connection/socket";

const ScrewButton = () => {
  const room = useGameStore((s) => s.game.room);
  const myPlayer = useGameStore((s) => s.game.myPlayer);
  return room.lap > 3 &&
    room.turn != -1 &&
    room.players[room.turn].id == myPlayer.id &&
    room.screw == "" &&
    room.case == 0 ? (
    <Button
      colorScheme="green"
      w={"100px"}
      paddingX={"50px"}
      onClick={() =>
        socket.emit("screw", { playerId: myPlayer.id, roomId: room.id })
      }
    >
      سكرو
    </Button>
  ) : (
    <></>
  );
};

export default ScrewButton;
