import { Box, Image, Wrap } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
interface Props {
  handleChange: (idx: number) => void;
}
const Avatars = ({ handleChange }: Props) => {
  const [avatars, setAvatars] = useState<ReactNode[]>([]);
  useEffect(() => {
    let curAvatars = [];
    for (let i = 0; i < 136; i++) {
      curAvatars.push(
        <Box className="avatar-icon" key={i}>
          <Image
            borderRadius={"100%"}
            _hover={{ border: "2px solid #1070c4" }}
            onClick={() => handleChange(i)}
            w={"100px"}
            src={"/images/avatar-icons/" + i + ".png"}
          />
        </Box>
      );
    }
    setAvatars(curAvatars);
  }, []);

  return (
    <Wrap
      className="avatars-container"
      width={["100px", "400px", "500px", "700px"]}
      height={"min(100vh,600px)"}
      overflowY={"scroll"}
      position={"absolute"}
      style={{ backdropFilter: "blur(5px)" }}
      zIndex={10}
    >
      {avatars}
    </Wrap>
  );
};

export default Avatars;
