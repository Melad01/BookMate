import { useColorModeValue } from "@chakra-ui/react";

const useColors = () => {
  const color = () => {
    return useColorModeValue("#FFF9F0", "#363432");
  };

  const bgColor = () => {
    return useColorModeValue("#76BA99", "#478567");
  };

  const hoverColor = () => {
    return useColorModeValue("#6DE2A9", "#238b58");
  };

  return { color, bgColor, hoverColor };
};

export default useColors;
