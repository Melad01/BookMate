import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";
import Book from "../../types/Book";

const apiClient = new ApiClient<Book>("/Books");

const useBooks = () => {
  return useQuery<Book[], Error>({
    queryKey: ["books"],
    queryFn: apiClient.getAll,
  });
};

export default useBooks;
