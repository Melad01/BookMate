// src/components/BookGrid.js

import { Box, HStack, Hide, SimpleGrid, Text } from "@chakra-ui/react";
import BookCard from "./BookCard";
import AddBook from "./AddBook";
import BooksFilter from "./BooksFilter";
import FloatingButton from "./FloatingButton";
import CustomHeading from "./CustomHeading";
import useBooks from "../hooks/book/useBooks";
import BookCardSkeleton from "./BookCardSkeleton";
import { bgColor, color } from "../color";
import useBooksByCategories from "../hooks/book/useBooksByCategories";
import { useBookQueryStore } from "../store";

const BookGrid = () => {
  const categories = useBookQueryStore((s) => s.bookQuery.genres);
  const skeletons = Array.from({ length: 12 }, (_, i) => i + 1);

  const {
    data: books,
    isLoading: isBooksLoading,
    error: booksError,
  } = useBooks();

  const { data: filteredBooks, isLoading: isFilteredBooksLoading } =
    useBooksByCategories();

  if (booksError) return <p color="red">{booksError.message}</p>;

  return (
    <Box marginTop={6} bgColor={color()}>
      <CustomHeading>Books</CustomHeading>
      <HStack
        justifyContent="space-between"
        marginLeft={5}
        spacing={4}
        paddingRight={5}
      >
        <BooksFilter />
        <Hide below="lg">
          <AddBook />
        </Hide>
      </HStack>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        spacing={{ base: 3, lg: 5, xl: 6 }}
        padding={{ base: 3, lg: 5 }}
        justifyContent="center"
      >
        {/* Loading state for books with no categories */}
        {categories?.length === 0 &&
          isBooksLoading &&
          skeletons.map((skeleton) => <BookCardSkeleton key={skeleton} />)}

        {/* Display books when no categories are selected */}
        {categories?.length === 0 &&
          !isBooksLoading &&
          books?.map((book) => <BookCard key={book.Title} book={book} />)}

        {/* Loading state for books with categories */}
        {categories?.length > 0 &&
          isFilteredBooksLoading &&
          skeletons.map((skeleton) => <BookCardSkeleton key={skeleton} />)}

        {/* Display filtered books when categories are selected */}
        {categories?.length > 0 &&
          !isFilteredBooksLoading &&
          filteredBooks?.map((book) => (
            <BookCard key={book.Title} book={book} />
          ))}

        {/* No books found message when categories are selected and no books are returned */}
        {categories?.length > 0 &&
          !isFilteredBooksLoading &&
          filteredBooks?.length === 0 && (
            <Text fontSize={30} fontWeight="bold" color={bgColor()}>
              No books found in this category
            </Text>
          )}
      </SimpleGrid>
      <Hide above="lg">
        <FloatingButton />
      </Hide>
    </Box>
  );
};

export default BookGrid;
