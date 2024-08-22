import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";
import Book from "../../types/Book";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

interface AddBookContext {
  previousBooks: Book[];
}

const apiClient = new ApiClient<Book>("/addBook");

const useAddBook = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [firstToastId, setFirstToastId] = useState<string | number | undefined>(
    undefined
  );

  const closeFirstToast = () => {
    if (firstToastId) {
      toast.close(firstToastId);
      setFirstToastId(undefined);
    }
  };

  return useMutation<void, Error, Book, AddBookContext>({
    mutationFn: (book: Book) => apiClient.create(book),
    onMutate: (newBook: Book) => {
      const id = toast({
        title: "Adding book...",
        status: "loading",
        duration: 60000,
      });
      setFirstToastId(id);

      const previousBooks = queryClient.getQueryData<Book[]>(["books"]) || [];

      queryClient.setQueryData<Book[]>(["books"], (books = []) => [
        newBook,
        ...books,
      ]);

      return { previousBooks };
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      closeFirstToast();
      toast({
        title: "Book added successfully.",
        status: "success",
        duration: 2000,
      });
    },

    onError: (error, newBook, context) => {
      if (!context) throw new Error(error.message);

      queryClient.setQueryData<Book[]>(["books"], context.previousBooks);

      closeFirstToast();

      if (error.message === "Request timed out") {
        toast({
          title: "Request took too long, please try again.",
          status: "error",
          duration: 5000,
        });
      } else {
        toast({
          title: "Something went wrong.",
          status: "error",
          duration: 2000,
        });
      }
    },
  });
};

export default useAddBook;
