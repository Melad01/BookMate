import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";
import Book from "../../types/Book";

const apiClient = new ApiClient<Book>("/Books");

const useBook = (title: string) => {
  return useQuery<Book, Error>({
    queryKey: ["books", title],
    queryFn: () => apiClient.get(title),
    retry: 3,
  });
};

export default useBook;
