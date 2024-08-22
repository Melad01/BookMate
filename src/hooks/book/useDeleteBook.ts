import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";
import Book from "../../types/Book";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";

interface DeleteBookContext {
  previousBooks: Book[];
}

const apiClient = new ApiClient<Book>("/DeleteBook");

const useDeleteBook = (id: string) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [firstToastId, setFirstToastId] = useState<string | number | undefined>(
    undefined
  );
  const navigate = useNavigate();

  const closeFirstToast = () => {
    if (firstToastId) {
      toast.close(firstToastId);
      setFirstToastId(undefined);
    }
  };

  return useMutation<void, Error, string, DeleteBookContext>({
    mutationFn: () => apiClient.delete(id),
    onMutate: () => {
      const toastId = toast({
        title: "Deleting book...",
        status: "loading",
      });
      setFirstToastId(toastId);

      const previousBooks = queryClient.getQueryData<Book[]>(["books"]) || [];

      const updatedBooks = previousBooks.filter((book) => book.id !== id);
      queryClient.setQueryData<Book[]>(["books"], updatedBooks);

      return { previousBooks };
    },

    onSuccess: () => {
      closeFirstToast();
      queryClient.invalidateQueries(["books"]);
      toast({
        title: "Book deleted successfully.",
        status: "success",
        duration: 2000,
      });

      navigate("/books");
    },

    onError: (error, bookTitle, context) => {
      closeFirstToast();
      if (!context) throw new Error(error.message);

      queryClient.setQueryData<Book[]>(["books"], context.previousBooks);

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

export default useDeleteBook;
