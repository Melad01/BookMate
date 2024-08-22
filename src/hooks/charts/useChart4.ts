import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";

const apiClient = new ApiClient("/TopCategories");

const useChart4 = () => {
  return useQuery({
    queryKey: ["TopCategories"],
    queryFn: apiClient.getChart,
  });
};

export default useChart4;
