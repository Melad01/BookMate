import {
  Box,
  Button,
  Divider,
  GridItem,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import BookAttributes from "./BookAttributes";
import noImage from "../assets/no-image-placeholder.webp";
import ExpandableText from "./ExpandbleText";
import BookModal from "./Modals/BookModal";
import DeleteModal from "./Modals/DeleteModal";
import Book from "../types/Book";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { bgColor, color, hoverColor } from "../color";
import { END_POINT } from "../services/data";

interface Props {
  book: Book;
}

const BookDetails = ({ book }: Props) => {
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  return (
    <>
      <Heading margin={3}>
        <Link to="/books">
          <IoMdArrowRoundBack size={45} color={bgColor()} />
        </Link>
      </Heading>
      <SimpleGrid
        columns={{ base: 1, xl: 2 }}
        padding={{ base: 4, md: 5 }}
        spacing={{ base: 4, xl: 10 }}
        justifyContent="center"
      >
        <GridItem>
          <HStack justifyContent="space-between" marginBottom={2}>
            <Box>
              <Heading color={bgColor()} fontSize={{ base: 30, md: 41 }}>
                {book.Title}
              </Heading>
            </Box>
            <HStack>
              <Button
                bgColor={bgColor()}
                color={color()}
                size={{ base: "xs", md: "lg" }}
                onClick={onEditOpen}
                _hover={{ bgColor: hoverColor() }}
              >
                Edit
              </Button>
              console.log(book);
              <BookModal
                isOpen={isEditOpen}
                onOpen={onEditOpen}
                onClose={onEditClose}
                book={book}
              />
              <Button
                bgColor="#e70127"
                color={color()}
                size={{ base: "xs", md: "lg" }}
                onClick={onDeleteOpen}
                _hover={{ bgColor: "#fe0001" }}
              >
                Delete
              </Button>
              <DeleteModal
                isOpen={isDeleteOpen}
                onClose={onDeleteClose}
                onOpen={onDeleteOpen}
                children="book"
                title={book.Title ?? ""}
              />
            </HStack>
          </HStack>
          <Image
            src={book.ImageUrl ? END_POINT + book.ImageUrl : noImage}
            boxSize="fit-content"
            borderRadius={25}
            width="100%"
            height="450px"
            loading="lazy"
          />
        </GridItem>
        <GridItem>
          <Heading color={bgColor()}>Description:</Heading>
          <ExpandableText>{book.Description}</ExpandableText>
          <Divider height={5} color={bgColor()} />
          <BookAttributes book={book} />
        </GridItem>
      </SimpleGrid>
    </>
  );
};

export default BookDetails;
