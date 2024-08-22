import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";

const apiClient = new ApiClient("/TopReaders");

const useChart3 = () => {
  return useQuery({
    queryKey: ["TopReaders"],
    queryFn: apiClient.getChart,
  });
};

export default useChart3;
