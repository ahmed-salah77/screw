import { useEffect, useState } from "react";
import { socket } from "../connection/socket";
import { Box, Button, HStack, Heading, SimpleGrid } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Td, TableContainer } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";

import useGameStore, { Room } from "../store";
import CreateGame from "./CreateGame";
import LobbyChat from "./LobbyChat";
import { FaUsers } from "react-icons/fa6";
import { RiRefreshFill } from "react-icons/ri";

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([
    {
      name: "Room1",
      roundState: "notStarted",
      numberOfPlayers: 3,
      password: "",
    } as Room,
    {
      name: "Room2",
      roundState: "running",
      numberOfPlayers: 4,
      password: "abc123",
    } as Room,
    {
      name: "Room3",
      roundState: "running",
      numberOfPlayers: 1,
      password: "abc123",
    } as Room,
    {
      name: "Room4",
      roundState: "notStarted",
      numberOfPlayers: 2,
      password: "",
    } as Room,
  ]);
  const player = useGameStore((s) => s.game.myPlayer);
  const setPlayer = useGameStore((s) => s.setPlayer);
  const handleJoin = (room: Room) => {
    if (room.password == "") {
      socket.emit("joinRoom", {
        roomId: room.id,
        player: { ...player, isInRoom: true, roomId: room.id },
        password: "",
      });
      socket.on("join-res", (res) => {
        if (res.message == "joined successfully")
          setPlayer({ ...player, isInRoom: true, roomId: room.id });
      });
    }
  };
  useEffect(() => {
    socket.emit("getRooms");
    socket.on("takeRooms", (rooms_data) => {
      console.log(rooms_data);
      setRooms(rooms_data);
    });
  }, []);

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
        <CreateGame />
      </Box>
      <Box width={{ base: "100vw", md: "100vw", xl: "50%" }} paddingTop={5}>
        <HStack
          borderBottom={"1px solid white"}
          paddingBottom={5}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          <Heading textAlign={"center"}>الغرف الحالية</Heading>
          <Box paddingTop={"10px"}>
            <FaUsers size={"40px"} />
          </Box>
        </HStack>
        <TableContainer fontSize={"min(1.5rem,4vw)"} overflow={"hidden"}>
          <Table variant="simple" size={{ base: "sm", md: "md", lg: "lg" }}>
            <Thead>
              <Tr>
                <Td>الاسم</Td>
                <Td>الحالة</Td>
                <Td>اللاعبين</Td>
                <Td></Td>
                <Td>
                  <Button
                    colorScheme="yellow"
                    w={"max(30px,70%)"}
                    onClick={() => socket.emit("getRooms")}
                    gap={1}
                  >
                    تحديث
                    <RiRefreshFill size={"20"} />
                  </Button>
                </Td>
              </Tr>
            </Thead>
            <Tbody>
              {rooms?.map((room, index) => (
                <Tr key={index}>
                  <Td>{room.name}</Td>
                  <Td>{room.roundState == "notStarted" ? "انتظار" : "جار"}</Td>
                  <Td>{room.numberOfPlayers} / 4</Td>
                  <Td>{room.password ? <FaLock color="red" /> : <></>}</Td>
                  <Td>
                    <Button
                      colorScheme="green"
                      w={"max(30px,70%)"}
                      onClick={() => handleJoin(room)}
                    >
                      انضمام
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            {/* <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot> */}
          </Table>
        </TableContainer>
      </Box>
      <Box
        borderLeft={{ base: "none", xl: "1px solid white" }}
        width={{ base: "100vw", xl: "25%" }}
      >
        <LobbyChat />
      </Box>
    </SimpleGrid>
  );
};

export default Rooms;
