import { Button, useDisclosure } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import BookModal from "./Modals/BookModal";
import { bgColor, color, hoverColor } from "../color";

const AddBook = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        bgColor={bgColor()}
        color={color()}
        onClick={onOpen}
        leftIcon={<FaPlus />}
        _hover={{ bgColor: hoverColor(), color: color() }}
      >
        Add a book
      </Button>
      <BookModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export default AddBook;
