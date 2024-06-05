import { Box, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCircleXmark } from "react-icons/fa6";

interface Props {
  type: "success" | "fail" | "normal";
  children: ReactNode;
}
const Alert = ({ type, children }: Props) => {
  const icon = {
    success: <IoIosCheckmarkCircle />,
    fail: <FaCircleXmark />,
    normal: null,
  };
  const styles = {
    success: { bgColor: "#4CAF50!important" },
    fail: { bgColor: "#f44336!important" },
    normal: { bgColor: "#ffeb3b!important", color: "black" },
  };
  return (
    <Box
      {...styles[type]}
      zIndex={999999}
      borderRadius={"50px"}
      w={"min(100%,300px,min-content)"}
      paddingX={5}
      paddingY={2}
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      gap={"10px"}
      fontSize={"max(1vw,1rem)"}
    >
      <Text>{children}</Text>
      {icon[type]}
    </Box>
  );
};

export default Alert;
