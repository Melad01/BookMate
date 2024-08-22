import { useColorModeValue } from "@chakra-ui/react";

export const color = () => {
  return useColorModeValue("#FFF9F0", "#363432");
};

export const bgColor = () => {
  return useColorModeValue("#76BA99", "#478567");
};

export const hoverColor = () => {
  return useColorModeValue("#6DE2A9", "#238b58");
};
