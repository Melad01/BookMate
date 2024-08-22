import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Tag,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdKeyboardVoice } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa6";
import StarRating from "./StarRating";
import DeleteModal from "./Modals/DeleteModal";
import { Link } from "react-router-dom";
import BookModal from "./Modals/BookModal";
import Book from "../types/Book";
import noImage from "../assets/no-image-placeholder.webp";
import { bgColor, color, hoverColor } from "../color";
import { useBookQueryStore } from "../store";
import Category from "../types/Category";
import { FaCheck } from "react-icons/fa6";
import { END_POINT } from "../services/data";

interface Props {
  book: Book;
}

const BookCard = ({ book }: Props) => {
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
  const categories = useBookQueryStore((s) => s.bookQuery.genres);
  const setCategories = useBookQueryStore((s) => s.setGenres);
  const includes = (category: Category) => {
    return categories?.some((c) => c.CategoryID === category.CategoryID);
  };

  return (
    <Card bgColor={bgColor()}>
      <CardHeader>
        <HStack justifyContent="space-between">
          <VStack alignItems="flex-start" spacing={1} width="88%">
            <Link to={`/books/${book.Title}`}>
              <Heading fontSize={20} color={color()}>
                {book.Title}
              </Heading>
            </Link>
            <Text fontSize={15} color={color()}>
              {book.Author}
            </Text>
          </VStack>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<BsThreeDotsVertical />}
              variant="outline"
              position="absolute"
              right={{ base: 1, md: 1 }}
              top={{ base: 5, md: 4 }}
              _hover={{ color: "none" }}
              textColor={color()}
              bgColor={bgColor()}
              borderColor={color()}
            />
            <MenuList p={0}>
              <MenuItem
                icon={<MdModeEditOutline size={20} color={bgColor()} />}
                onClick={onEditOpen}
                textColor={bgColor()}
                bgColor={color()}
                _hover={{ bgColor: hoverColor(), color: color() }}
              >
                Edit
              </MenuItem>
              <BookModal
                isOpen={isEditOpen}
                onOpen={onEditOpen}
                onClose={onEditClose}
                book={book}
              />
              <MenuItem
                icon={<MdDelete size={20} color="red" />}
                onClick={onDeleteOpen}
                textColor={bgColor()}
                bgColor={color()}
                _hover={{ bgColor: hoverColor(), color: color() }}
              >
                Delete
              </MenuItem>
              <DeleteModal
                isOpen={isDeleteOpen}
                onClose={onDeleteClose}
                onOpen={onDeleteOpen}
                children="book"
                title={book.Title ?? ""}
              />
              {book.PdfUrl && (
                <a href={END_POINT + book.PdfUrl} target="_blank" download>
                  <MenuItem
                    icon={<FaRegFilePdf size={20} color={bgColor()} />}
                    textColor={bgColor()}
                    bgColor={color()}
                    _hover={{ bgColor: hoverColor(), color: color() }}
                  >
                    Download pdf file
                  </MenuItem>
                </a>
              )}
              {book.VoiceUrl && (
                <a href={END_POINT + book.VoiceUrl} target="_blank" download>
                  <MenuItem
                    icon={<MdKeyboardVoice size={20} color={bgColor()} />}
                    textColor={bgColor()}
                    bgColor={color()}
                    _hover={{ bgColor: hoverColor(), color: color() }}
                  >
                    Download voice file
                  </MenuItem>
                </a>
              )}
            </MenuList>
          </Menu>
        </HStack>
      </CardHeader>
      <Divider color={color()} />
      <CardBody boxSize="fit-content">
        <Image
          borderRadius={30}
          src={book.ImageUrl ? END_POINT + book.ImageUrl : noImage}
          alt="Book Cover"
          boxSize="fit-content"
          width="100%"
          height="260px"
          loading="lazy"
        />
        <VStack marginTop={5} alignItems="flex-start">
          <HStack>
            <Tooltip label={book.AverageRating?.toString()}>
              <Text fontSize={20} color={color()}>
                Rating:
              </Text>
            </Tooltip>
            <StarRating rating={book.AverageRating} />
          </HStack>
          <HStack>
            <Stack direction="row" flexWrap="wrap">
              <Text fontSize={20} color={color()}>
                Categories:
              </Text>
              {book.Categories.map((category) => (
                <Tag
                  bgColor={includes(category) ? hoverColor() : color()}
                  color={includes(category) ? color() : bgColor()}
                  key={category.CategoryID}
                  marginTop={1}
                  padding={1}
                  _hover={{ bgColor: hoverColor(), color: color() }}
                  cursor="pointer"
                  fontWeight="bold"
                  onClick={() => {
                    if (includes(category))
                      setCategories(
                        categories.filter(
                          (c) => c.CategoryID !== category.CategoryID
                        )
                      );
                    else setCategories([...categories, category]);
                  }}
                >
                  {category.CategoryName}
                  {includes(category) && <FaCheck size={15} color={color()} />}
                </Tag>
              ))}
            </Stack>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default BookCard;
