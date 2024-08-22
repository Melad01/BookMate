import { useRef, useState, useEffect } from "react";
import {
  Box,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router";
import { color, hoverColor } from "../color";
import useBooksBySearch from "../hooks/book/useBooksBySearch";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [searchText, setSearchText] = useState<string>(""); // State for search text
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1); // Track the selected index

  const { data: books, isLoading } = useBooksBySearch(searchText); // Use the useBooksBySearch hook
  const filteredBooks = books || [];

  // Use a single effect to handle location changes and dropdown visibility
  useEffect(() => {
    if (["/notifications", "/", "/profile"].includes(currentPath)) {
      setShowDropdown(false);
    }
  }, [currentPath]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);

    if (newSearchText.length > 0) {
      setShowDropdown(true);
      setSelectedIndex(-1); // Reset selected index on new search
    } else {
      setShowDropdown(false);
    }
  };

  const handleItemClick = (bookTitle: string) => {
    navigate(`/books/${bookTitle}`);
    setShowDropdown(false);
    if (ref.current) {
      ref.current.value = ""; // Clear the input value
      ref.current.blur(); // Remove focus from the input
    }
    document.body.focus(); // Set focus to the body to maintain accessibility
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return;

    switch (event.key) {
      case "ArrowDown":
        setSelectedIndex((prevIndex) =>
          prevIndex < filteredBooks.length - 1 ? prevIndex + 1 : 0
        );
        break;
      case "ArrowUp":
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : filteredBooks.length - 1
        );
        break;
      case "Enter":
        if (selectedIndex >= 0 && selectedIndex < filteredBooks.length) {
          handleItemClick(filteredBooks[selectedIndex].Title);
        }
        break;
      default:
        break;
    }
  };

  const handleBlur = () => {
    // Adding a timeout here to avoid the blur event firing too soon
    setTimeout(() => setShowDropdown(false), 100);
  };

  if (["/notifications", "/profile", "/users", "/"].includes(currentPath)) {
    return null;
  }

  return (
    <FormControl onSubmit={(e) => e.preventDefault()}>
      <InputGroup flex={1} size={{ base: "md", lg: "lg" }}>
        <InputLeftElement children={<BsSearch color={hoverColor()} />} />
        <Input
          ref={ref}
          placeholder="Search..."
          variant="solid"
          borderRadius={20}
          bgColor={color()}
          textColor={hoverColor()}
          _placeholder={{ color: hoverColor() }}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      </InputGroup>
      {showDropdown && (
        <Box
          mt={2}
          borderWidth={1}
          borderRadius="md"
          bgColor={color()}
          boxShadow="md"
          zIndex={1}
          position="absolute"
          width="100%"
        >
          <List>
            {isLoading && (
              <SkeletonText
                mx="3"
                my="3"
                noOfLines={5}
                spacing="3"
                skeletonHeight="5"
                color={"green"}
              />
            )}
            {books?.length === 0 ? (
              <Text padding={2} color={hoverColor()}>
                No books found.
              </Text>
            ) : (
              books?.map((book, index) => (
                <ListItem
                  key={index}
                  padding={2}
                  color={selectedIndex === index ? color() : hoverColor()}
                  bgColor={selectedIndex === index ? hoverColor() : undefined}
                  _hover={{ bgColor: hoverColor(), color: color() }}
                  onMouseDown={() => handleItemClick(book.Title)} // Using onMouseDown to prevent blur event from firing
                  cursor="pointer"
                >
                  {book.Title}
                </ListItem>
              ))
            )}
          </List>
        </Box>
      )}
    </FormControl>
  );
};

export default SearchInput;
