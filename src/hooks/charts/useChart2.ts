import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";
import Book from "../../types/Book";

const apiClient = new ApiClient("/TopReadBooks");

const useChart2 = () => {
  return useQuery<Book[], Error>({
    queryKey: ["TopReadBooks"],
    queryFn: apiClient.getChart,
  });
};

export default useChart2;
