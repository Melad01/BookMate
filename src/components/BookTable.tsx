import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import Book from "../types/Book";
import { bgColor, color } from "../color";

interface Props {
  books: Book[];
}

const BookTable = ({ books }: Props) => {
  return (
    <TableContainer>
      <Table variant="simple" size={{ base: "sm", md: "lg" }}>
        <Thead>
          <Tr bg={bgColor()} color={color()}>
            <Th color={color()}>Title</Th>
            <Th color={color()}>Author</Th>
          </Tr>
        </Thead>
        <Tbody>
          {books.map((book) => (
            <Tr key={book.Id} bg={bgColor()} color={color()}>
              <Td style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
                {book.Title}
              </Td>
              <Td style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
                {book.Author}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default BookTable;
