import { Box, Image } from "@chakra-ui/react";
import useGameStore, { Card as CardInterface, Room } from "../store";
import { useDrag, useDrop } from "react-dnd";
import { socket } from "../connection/socket";
import canDragCard from "../services/canDragCard";
import canDropCard from "../services/canDropCard";

interface Props {
  card: CardInterface;
  room: Room;
}
const Card = ({ card, room }: Props) => {
  const playerId = useGameStore((s) => s.game.myPlayer.id);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: card.owner == "topCard" ? "topCard" : "card",
      item: card,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [room, card]
  );
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ["card", room.case == 2 ? "topCard" : ""],
      drop: (Droppedcard: CardInterface) => {
        if (room.turn == -1 || room.players[room.turn].id !== playerId) return;
        console.log({ card, Droppedcard });
        if (
          card.owner == playerId &&
          Droppedcard.id == room.tableCard?.id &&
          room.case == 0
        ) {
          console.log("swaping");
          // swap my card with card table
          socket.emit("swapTwoCards", {
            roomId: room.id,
            card1Id: card.id,
            card2Id: Droppedcard.id,
          });
        } else if (
          card.id == room.tableCard?.id &&
          Droppedcard.owner == playerId &&
          room.case == 0
        ) {
          socket.emit("basra", {
            roomId: room.id,
            card1Id: card.id,
            card2Id: Droppedcard.id,
          });
        } else if (
          card.owner == playerId &&
          Droppedcard.owner == "topCard" &&
          room.case == 2
        ) {
          socket.emit("swapTakenCard", {
            roomId: room.id,
            cardId: card.id,
          });
        } else if (
          card.owner == "tableCard" &&
          Droppedcard.owner == "topCard" &&
          room.case == 2
        ) {
          socket.emit("throwTakenCard", {
            roomId: room.id,
          });
        } else if (
          card.owner != Droppedcard.owner &&
          (card.owner == playerId || Droppedcard.owner == playerId) &&
          Droppedcard.owner != "deck" &&
          Droppedcard.owner != "tableCard" &&
          Droppedcard.owner != "topCard" &&
          card.owner != "deck" &&
          card.owner != "tableCard" &&
          card.owner != "topCard" &&
          room.case == 8
        ) {
          socket.emit("takeAndGive", {
            roomId: room.id,
            card1Id: card.id,
            card2Id: Droppedcard.id,
          });
        } else if (
          card.owner == "tableCard" &&
          Droppedcard.owner == playerId &&
          room.case == 9
        ) {
          socket.emit("basraFunction", {
            cardId: Droppedcard.id,
            roomId: room.id,
          });
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [room, card]
  );

  const isDraggable = canDragCard(card);
  const isDroppable = canDropCard(card);

  return (
    <Box
      zIndex={card.zIndex}
      ref={isDroppable ? drop : null}
      borderRadius={"10%"}
      overflow={"hidden"}
      position={"absolute"}
      left={card.left}
      top={card.top}
      transition={"ease-in-out 1s"}
      transform={`rotate(${card.rotate})`}
      w={"6.5%"}
      // h={"10.1%"}
    >
      <Box
        ref={isDraggable ? drag : null}
        style={{
          opacity: isDragging ? 0 : 1,
        }}
        overflow={"hidden"}
      >
        <Image
          draggable={"false"}
          src={
            card.flipedTo == playerId || card.flipedTo == "all"
              ? card.image
              : "/images/cards/card-back.jpg"
          }
          borderRadius={"10%"}
        />
      </Box>
      {isOver && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "60px",
            width: "38px",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "yellow",
          }}
        />
      )}
    </Box>
  );
};

export default Card;
