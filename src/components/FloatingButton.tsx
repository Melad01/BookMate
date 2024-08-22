import { IconButton, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AddBookModal from "./Modals/BookModal";
import { bgColor, color } from "../color";

const FloatingButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        borderRadius={25}
        bgColor={{ base: color(), lg: bgColor() }}
        aria-label="Add book"
        icon={<AddIcon />}
        position="fixed"
        bottom="4"
        right="4"
        zIndex="999"
        color={{ base: bgColor(), lg: color() }}
        size="lg"
        onClick={onOpen}
      />
      <AddBookModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export default FloatingButton;
