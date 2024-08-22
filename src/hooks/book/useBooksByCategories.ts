import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";
import Book from "../../types/Book";
import { useBookQueryStore } from "../../store";

const apiClient = new ApiClient<Book>("/Books/categories");

const useBooksByCategories = () => {
  const categories = useBookQueryStore((s) => s.bookQuery.genres);
  const key =
    categories?.length > 0
      ? `books?${categories
          .map((c) => `categoriesName=${c.CategoryName}`)
          .join("&")}`
      : ["books"];

  return useQuery<Book[], Error>({
    queryKey: [key],
    queryFn: async (): Promise<Book[]> => {
      if (categories?.length > 0) {
        return await apiClient.getAllByCategories(categories ?? []);
      } else {
        return await apiClient.getAll();
      }
    },
  });
};

export default useBooksByCategories;
