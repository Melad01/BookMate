import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";

const apiClient = new ApiClient("/CategoriesPercent");

const useChart1 = () => {
  return useQuery({
    queryKey: ["CategoriesPercent"],
    queryFn: apiClient.getChart,
  });
};

export default useChart1;
