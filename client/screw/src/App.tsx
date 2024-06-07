import { useEffect } from "react";
import useSound from "use-sound";
import "./App.css";
import { socket } from "./connection/socket";
import useGameStore from "./store";
import EnterYourName from "./components/EnterYourName";
import Room from "./components/Room";
import Rooms from "./components/Rooms";
import takeCard from "/sounds/pick-card-from-top.mp3";
import throwCard from "/sounds/throw-card.mp3";
import cardDeal from "/sounds/card-deal.mp3";
import fail from "/sounds/fail.mp3";
import success from "/sounds/success.mp3";
function App() {
  const myPlayer = useGameStore((s) => s.game.myPlayer);
  const setRoom = useGameStore((s) => s.setRoom);
  const room = useGameStore((s) => s.game.room);
  const [takeCardSound] = useSound(takeCard, {
    volume: 1,
    playbackRate: 0.9,
  });
  const [throwCardSound] = useSound(throwCard, {
    volume: 2,
    playbackRate: 1,
  });
  const [cardDealSound] = useSound(cardDeal, {
    volume: 0.7,
    playbackRate: 1,
  });
  const [failSound] = useSound(fail, {
    volume: 0.2,
    playbackRate: 1,
  });
  const [sucessSound] = useSound(success, {
    volume: 1,
    playbackRate: 1,
  });
  useEffect(() => {
    socket.on("connect", () => {
      console.log("new connection from client: ", socket.id);
      socket.off("connect");
    });
    socket.on("reconnect", (attemptNumber) => {
      console.log("Reconnected to server. Attempt:", attemptNumber);
    });
    socket.on("disconnect", () => {
      socket.emit("leaveRoom", { roomId: room?.id, player: myPlayer });
    });
    socket.on("roomUpdated", (room) => {
      console.log("roomUpdated");
      setRoom(room);
      socket.off("roomUpdated");
    });
    socket.on("take-card-sound", () => {
      takeCardSound();
    });
    socket.on("throw-card-sound", () => {
      throwCardSound();
    });
    socket.on("card-deal-sound", () => {
      cardDealSound();
    });
    socket.on("good-basra-sound", () => {
      sucessSound();
    });
    socket.on("bad-basra-sound", () => {
      failSound();
    });
    return ()=>{
      socket.off("take-card-sound");
      socket.off("throw-card-sound");
      socket.off("card-deal-sound");
      socket.off("good-basra-sound");
      socket.off("bad-basra-sound");
      socket.off("roomUpdated");
    }
  }, [room]);
  socket.on("message", (message) => {
    console.log(message.text);
  });
  // return <Room />;
  if (myPlayer.name == "") {
    return <EnterYourName />;
  }
  if (myPlayer.isInRoom == false || room.players.length == 0) {
    // return <Rooms />;
    return <Rooms />;
  }
  return <Room />;
}

export default App;
