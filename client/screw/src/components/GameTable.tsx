import { Box } from "@chakra-ui/react";
import useGameStore, { Room, Player as playerInterface } from "../store";
import Card from "./Card";
import Player from "./Player";
import { useEffect, useState } from "react";

const GameTable = ({ room }: { room: Room }) => {
  const playerPositions = [
    { bottom: "-10%", left: "40%" },
    { bottom: "40%", left: "90%" },
    { bottom: "90%", left: "40%" },
    { bottom: "40%", left: "-10%" },
  ];

  const players = useGameStore((s) => s.game.room.players);
  const deck = room.deck;
  const [cards, setCards] = useState<React.ReactNode[] | null>(null);

  const me = useGameStore((s) => s.game.myPlayer);
  const numberOfPlayers = useGameStore((s) => s.game.room.numberOfPlayers);
  const playersCopy = [...players];
  console.log(players);
  let cnt = 0;
  while (me.id !== playersCopy[0].id) {
    cnt++;
    playersCopy.push(playersCopy.shift() as playerInterface);
  }
  useEffect(() => {
    let cardsTmp = [] as React.ReactNode[];
    console.log("here Game TABLE " + room.turn);
    deck.map((card) => {
      cardsTmp.push(<Card key={card.id} card={card} room={room} />);
    });
    console.log("here from gametable");
    setCards(cardsTmp);
  }, [room]);

  return (
    <Box
      transform={`rotate(${cnt * 90}deg)`}
      backgroundImage={`url(/images/table.png)`}
      w={[300, 400, 600]}
      h={[300, 400, 600]}
      bgSize={[300, 400, 600]}
      bgPosition={"center"}
      bgRepeat={"no-repeat"}
      // boxSizing={"border-box"}
      position={"relative"}
    >
      {cards}
      {playerPositions.map((pos, index) =>
        index < numberOfPlayers ? (
          <Box
            key={index}
            transform={`rotate(${-cnt * 90}deg)`}
            position={"absolute"}
            w="20%"
            h={"20%"}
            {...pos}
          >
            <Player player={players[index]} number={index} />
          </Box>
        ) : (
          <></>
        )
      )}
    </Box>
  );
};

export default GameTable;
