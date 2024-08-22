import {
  Box,
  Heading,
  IconButton,
  List,
  ListItem,
  SimpleGrid,
  Tag,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import StarRating from "./StarRating";
import Book from "../types/Book";
import { IoMdDownload } from "react-icons/io";
import { bgColor, color, hoverColor } from "../color";
import { END_POINT } from "../services/data";

interface Props {
  book: Book;
}

const BookAttributes = ({ book }: Props) => {
  return (
    <SimpleGrid columns={{ md: 2 }} marginTop={2} spacing={5}>
      <List spacing={2}>
        <Heading fontSize={{ base: 20, md: 30 }} color={bgColor()}>
          Genres:
        </Heading>
        <SimpleGrid
          columns={2}
          spacingY={{ base: 2, md: 1 }}
          spacingX={{ base: 1, md: 0.1 }}
        >
          {book.Categories?.map((category) => (
            <ListItem key={category.CategoryID}>
              <Tag
                bgColor={bgColor()}
                color={color()}
                _hover={{ bgColor: hoverColor(), color: color() }}
                cursor="pointer"
              >
                {category.CategoryName}
              </Tag>
            </ListItem>
          ))}
        </SimpleGrid>
      </List>
      <VStack alignItems="flex-start" spacing={0.1}>
        <Heading color={bgColor()} fontSize={{ base: 20, md: 30 }}>
          Author name:
        </Heading>
        <Text fontSize={23}>{book.Author}</Text>
      </VStack>
      <VStack alignItems="flex-start" spacing={0.1}>
        <Tooltip label={book.AverageRating?.toString()}>
          <Heading color={bgColor()} fontSize={{ base: 20, md: 30 }}>
            Rating:
          </Heading>
        </Tooltip>
        <StarRating rating={book.AverageRating} />
      </VStack>
      <VStack alignItems="flex-start" spacing={0.1}>
        <Heading color={bgColor()} fontSize={{ base: 20, md: 30 }}>
          Number of ratings:
        </Heading>
        <Text fontSize={23}>{book.RatingsCount}</Text>
      </VStack>
      <VStack alignItems="flex-start" spacing={0.1}>
        <Heading color={bgColor()} fontSize={{ base: 20, md: 30 }}>
          Release date:
        </Heading>
        <Text fontSize={23}>{book.PublishedYear}</Text>
      </VStack>
      <VStack alignItems="flex-start" spacing={0.1}>
        <Heading color={bgColor()} fontSize={{ base: 20, md: 30 }}>
          Number of pages:
        </Heading>
        <Text fontSize={23}>{book.NumberOfPages}</Text>
      </VStack>
      <VStack alignItems="flex-start" spacing={0.1}>
        <Heading color={bgColor()} fontSize={{ base: 20, md: 30 }}>
          Reading count:
        </Heading>
        <Text fontSize={23}>{book.ReadingCount}</Text>
      </VStack>
      {book.PdfUrl && (
        <a href={END_POINT + book.PdfUrl} target="_blank">
          <Box
            display="inline-flex"
            alignItems="center"
            justifyContent="start"
            p={1}
            color={bgColor()}
            borderRadius={20}
            _hover={{ bgColor: hoverColor(), color: color() }}
          >
            <Heading fontSize={{ base: 20, md: 30 }}>Pdf file</Heading>
            <IconButton
              aria-label="download pdf"
              variant="none"
              icon={<IoMdDownload size={30} />}
            />
          </Box>
        </a>
      )}
      {book.VoiceUrl && (
        <a href={END_POINT + book.VoiceUrl} target="_blank" download>
          <Box
            display="inline-flex"
            alignItems="center"
            justifyContent="start"
            p={1}
            color={bgColor()}
            borderRadius={20}
            _hover={{ bgColor: hoverColor(), color: color() }}
          >
            <Heading fontSize={{ base: 20, md: 30 }}>Voice file</Heading>
            <IconButton
              aria-label="download voice"
              variant="none"
              icon={<IoMdDownload size={30} />}
            />
          </Box>
        </a>
      )}
    </SimpleGrid>
  );
};

export default BookAttributes;
