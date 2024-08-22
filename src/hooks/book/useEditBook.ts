import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";
import Book from "../../types/Book";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

interface EditBookContext {
  previousBook: Book;
}

const apiClient = new ApiClient<Book>("/editBook");

const useEditBook = (bookId: string) => {
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

  return useMutation<Book, Error, Book, EditBookContext>({
    mutationFn: (book: Book) => apiClient.update(book, bookId ?? ""),
    onMutate: async (updatedBook) => {
      const id = toast({
        title: "Editing book...",
        status: "loading",
      });
      setFirstToastId(id);

      const previousBook = queryClient.getQueryData<Book>(["books", bookId]);

      queryClient.setQueryData<Book>(["books", bookId], updatedBook);

      return { previousBook: previousBook! };
    },

    onSuccess: () => {
      closeFirstToast();
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
      queryClient.invalidateQueries({
        queryKey: ["books", bookId],
      });

      toast({
        title: "Book edited successfully.",
        status: "success",
        duration: 2000,
      });
    },

    onError: (error, updatedBook, context) => {
      closeFirstToast();
      if (context?.previousBook) {
        queryClient.setQueryData<Book>(["books", bookId], context.previousBook);
      }

      if (error.message === "Request timed out") {
        toast({
          title: "Request took too long, please try again.",
          status: "error",
          duration: 2000,
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

export default useEditBook;
