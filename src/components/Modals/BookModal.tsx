import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Image,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import Book from "../../types/Book";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import { useFormik } from "formik";
import { bookSchema } from "../../Schemas";
import useAddBook from "../../hooks/book/useAddBook";
import useEditBook from "../../hooks/book/useEditBook";
import useBook from "../../hooks/book/useBook";
import Category from "../../types/Category";
import { bgColor, color, hoverColor } from "../../color";
import { customStylesInput } from "../../styles/customStylesInput";
import { categoryOptions, END_POINT } from "../../services/data";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  book?: Book;
}

const formatDate = (date: string | Date) => {
  const d = new Date(date);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const BookModal = ({ isOpen, onClose, book }: Props) => {
  const { mutate: addBook } = useAddBook();
  const { mutate: editBook } = useEditBook(book?.Title ?? "");

  const { data: theBook } = useBook(book?.Title ?? "");

  const {
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      title: book ? book.Title : "",
      author: book ? book.Author : "",
      categories: book ? book.Categories : [],
      ImageFile: book ? book.ImageFile : "",
      description: book ? book.Description : "",
      numberOfPages: book ? book.NumberOfPages : 1,
      releaseDate: formatDate(book ? book.PublishedYear : new Date()),
      pdf: book ? book.PdfFile : "",
      voice: book ? book.VoiceFile : "",
    },
    validationSchema: bookSchema,
    onSubmit: (values) => {
      const newBook: Book = {
        Title: values.title,
        Author: values.author,
        Categories: values.categories,
        ImageFile: values.ImageFile,
        Description: values.description,
        NumberOfPages: values.numberOfPages,
        PublishedYear: values.releaseDate,
        PdfFile: values.pdf,
        VoiceFile: values.voice,
      };

      if (book) {
        editBook(newBook);
        onClose();
      } else {
        addBook(newBook);
        onClose();
      }
      resetForm();
      setSelectedImage(null);
      setPdfPreviewUrl("");
      setVoicePreviewUrl("");
    },
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<File | null>(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState("");
  const [voicePreviewUrl, setVoicePreviewUrl] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      setFieldValue("ImageFile", event.target.files[0]);
    }
  };

  const handlePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedPdf(event.target.files[0]);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPdfPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(event.target.files[0]);
      setFieldValue("pdf", event.target.files[0]);
    }
  };

  const handleVoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedVoice(event.target.files[0]);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setVoicePreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(event.target.files[0]);
      setFieldValue("voice", event.target.files[0]);
    }
  };

  const handleCategoriesChange = (categories: MultiValue<Category>) => {
    const newCategories = categories.map((category) => ({
      CategoryID: category.CategoryID,
      CategoryName: category.CategoryName,
    }));
    setFieldValue("categories", newCategories);
  };

  const animatedComponents = makeAnimated();

  const handleModalClose = () => {
    resetForm();
    setSelectedImage(null);
    setPdfPreviewUrl("");
    setVoicePreviewUrl("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      size={{ base: "2xs", md: "lg" }}
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit}>
        <ModalContent width={{ base: "300px", sm: "400px" }} bgColor={color()}>
          <ModalHeader color={bgColor()}>
            {book ? "Edit book" : "Add a book"}
          </ModalHeader>
          <ModalCloseButton color={bgColor()} bgColor={color()} />
          <ModalBody pb={6}>
            {/* Title Input */}
            <FormControl isInvalid={!!errors.title && touched.title}>
              <FormLabel color={bgColor()}>Title:</FormLabel>
              <Input
                id="title"
                name="title"
                aria-label="title"
                placeholder="Title"
                defaultValue={values.title}
                borderColor={errors.title && touched.title ? "red" : bgColor()}
                fontWeight="normal"
                _placeholder={{ color: bgColor() }}
                focusBorderColor={
                  errors.title && touched.title ? "red" : bgColor()
                }
                onChange={handleChange}
                onBlur={handleBlur}
                color={bgColor()}
              />
              <FormErrorMessage>{errors.title}</FormErrorMessage>
            </FormControl>

            {/* Author Input */}
            <FormControl mt={4} isInvalid={!!errors.author && touched.author}>
              <FormLabel color={bgColor()}>Author:</FormLabel>
              <Input
                id="author"
                name="author"
                aria-label="author"
                placeholder="Author"
                defaultValue={values.author}
                borderColor={
                  errors.author && touched.author ? "red" : bgColor()
                }
                fontWeight="normal"
                _placeholder={{ color: bgColor() }}
                focusBorderColor={
                  errors.author && touched.author ? "red" : bgColor()
                }
                onChange={handleChange}
                onBlur={handleBlur}
                color={bgColor()}
              />
              <FormErrorMessage>{errors.author}</FormErrorMessage>
            </FormControl>

            {/* Categories Input */}
            <FormControl
              mt={4}
              isInvalid={!!errors.categories && touched.categories}
            >
              <FormLabel color={bgColor()}>Categories:</FormLabel>
              <Select
                id="categories"
                name="categories"
                aria-label="categories"
                onChange={(categories) => handleCategoriesChange(categories)}
                onBlur={handleBlur}
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={values.categories}
                isMulti
                placeholder="Categories"
                options={categoryOptions}
                getOptionValue={(option) => option.CategoryID.toString()}
                getOptionLabel={(option) => option.CategoryName}
                styles={customStylesInput}
              />
              <FormErrorMessage>
                {errors.categories && errors.categories.toString()}
              </FormErrorMessage>
            </FormControl>

            {/* Book Cover Input */}
            <FormControl mt={4}>
              <FormLabel color={bgColor()}>Book cover:</FormLabel>
              <Input
                id="imageUrl"
                name="imageUrl"
                aria-label="Book cover"
                placeholder="Book cover"
                fontWeight="normal"
                _placeholder={{ color: bgColor() }}
                focusBorderColor={bgColor()}
                onChange={handleImageChange}
                onBlur={handleBlur}
                type="file"
                accept="image/*"
                padding={1}
                marginBottom={2}
                color={bgColor()}
              />
              {selectedImage && (
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected Image"
                  objectFit="cover"
                  borderRadius="xl"
                  width="100%"
                  height="200px"
                />
              )}
              {!selectedImage && book && book.ImageUrl && (
                <Image
                  src={END_POINT + book.ImageUrl}
                  alt="Book Cover"
                  objectFit="cover"
                  borderRadius="xl"
                  width="100%"
                  height="200px"
                  loading="lazy"
                />
              )}
            </FormControl>

            {/* PDF Input */}
            <FormControl mt={4}>
              <FormLabel color={bgColor()}>Book file:</FormLabel>
              <Input
                id="pdf"
                name="pdf"
                aria-label="Book pdf"
                placeholder="Book pdf"
                fontWeight="normal"
                _placeholder={{ color: bgColor() }}
                focusBorderColor={bgColor()}
                onChange={handlePdfChange}
                onBlur={handleBlur}
                type="file"
                accept="application/pdf"
                padding={1}
                marginBottom={2}
                color={bgColor()}
              />
              {pdfPreviewUrl && (
                <embed
                  src={pdfPreviewUrl}
                  type="application/pdf"
                  width="100%"
                  height="200"
                  style={{ marginTop: "10px" }}
                />
              )}
              {book && theBook?.PdfUrl && !pdfPreviewUrl && (
                <embed
                  src={END_POINT + theBook.PdfUrl}
                  type="application/pdf"
                  width="350"
                  height="200"
                  style={{ marginTop: "10px" }}
                />
              )}
              <FormErrorMessage>{errors.pdf}</FormErrorMessage>
            </FormControl>

            {/* Voice Input */}
            <FormControl mt={4}>
              <FormLabel color={bgColor()}>Book voice file:</FormLabel>
              <Input
                id="voice"
                name="voice"
                aria-label="voice"
                placeholder="voice"
                fontWeight="normal"
                _placeholder={{ color: bgColor() }}
                focusBorderColor={bgColor()}
                onChange={handleVoiceChange}
                onBlur={handleBlur}
                type="file"
                accept="audio/*"
                padding={1}
                marginBottom={2}
                color={bgColor()}
              />
              {voicePreviewUrl && (
                <audio controls style={{ width: "100%" }}>
                  <source src={voicePreviewUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
              {book && theBook?.VoiceUrl && !voicePreviewUrl && (
                <audio controls style={{ width: "100%" }}>
                  <source
                    src={END_POINT + theBook.VoiceUrl}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
              )}
              <FormErrorMessage>{errors.voice}</FormErrorMessage>
            </FormControl>

            {/* Description Input */}
            <FormControl
              mt={4}
              isInvalid={!!errors.description && touched.description}
            >
              <FormLabel color={bgColor()}>Description:</FormLabel>
              <Input
                id="description"
                name="description"
                aria-label="Description"
                placeholder="Description"
                defaultValue={values.description}
                borderColor={
                  errors.description && touched.description ? "red" : bgColor()
                }
                fontWeight="normal"
                _placeholder={{ color: bgColor() }}
                focusBorderColor={
                  errors.description && touched.description ? "red" : bgColor()
                }
                onChange={handleChange}
                onBlur={handleBlur}
                color={bgColor()}
              />
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>

            {/* Number of Pages Input */}
            <FormControl
              mt={4}
              isInvalid={!!errors.numberOfPages && touched.numberOfPages}
            >
              <FormLabel color={bgColor()}>Number of pages:</FormLabel>
              <NumberInput
                id="number_of_pages"
                name="number_of_pages"
                aria-label="Number of pages"
                defaultValue={values.numberOfPages}
                borderColor={
                  errors.numberOfPages && touched.numberOfPages
                    ? "red"
                    : bgColor()
                }
                fontWeight="normal"
                _placeholder={{ color: bgColor() }}
                focusBorderColor={
                  errors.numberOfPages && touched.numberOfPages
                    ? "red"
                    : bgColor()
                }
                onChange={(value) =>
                  setFieldValue("numberOfPages", parseInt(value))
                }
                onBlur={handleBlur}
                min={1}
                color={bgColor()}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>{errors.numberOfPages}</FormErrorMessage>
            </FormControl>

            {/* Release Date Input */}
            <FormControl mt={4} isInvalid={!!errors.releaseDate}>
              <FormLabel color={bgColor()}>Release date:</FormLabel>
              <Input
                id="release_date"
                name="release_date"
                type="date"
                defaultValue={values.releaseDate}
                onChange={(event) =>
                  setFieldValue("releaseDate", event.target.value)
                }
                onBlur={handleBlur}
                color={bgColor()}
              />
              <FormErrorMessage>{errors.releaseDate}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              bgColor={color()}
              textColor={bgColor()}
              onClick={handleModalClose}
              mr={3}
              _hover={{ bgColor: "none" }}
            >
              Cancel
            </Button>
            <Button
              textColor={color()}
              bgColor={bgColor()}
              _hover={{ bgColor: hoverColor(), color: color() }}
              disabled={!isValid}
              type="submit"
            >
              {book ? "Edit" : "Add"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default BookModal;
