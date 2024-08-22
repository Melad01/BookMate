import { HStack, Show, Text, useColorMode } from "@chakra-ui/react";
import { FaMoon } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";
import { color } from "../color";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack marginLeft={2.5}>
      {colorMode === "dark" ? (
        <FaMoon
          color={color()}
          onClick={toggleColorMode}
          size={30}
          cursor="pointer"
        />
      ) : (
        <MdSunny
          color={color()}
          onClick={toggleColorMode}
          size={30}
          cursor="pointer"
        />
      )}
      <Show below="md">
        <Text color={color()} onClick={toggleColorMode} fontSize="2xl">
          {colorMode[0].toUpperCase() + colorMode.slice(1)} Mode
        </Text>
      </Show>
    </HStack>
  );
};

export default ColorModeSwitch;
