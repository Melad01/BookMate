import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";
import Book from "../../types/Book";

const apiClient = new ApiClient<Book>("/SearchByTitle");

const useBooksBySearch = (search?: string) => {
  return useQuery<Book[], Error>({
    queryKey: [search],
    queryFn: async (): Promise<Book[]> => {
      return apiClient.getBySearch(search);
    },
  });
};

export default useBooksBySearch;
