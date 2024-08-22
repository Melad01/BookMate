import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";
import Report from "../../types/Report";

const apiClient = new ApiClient<Report>("/api/report/getReport");

const useReport = (id: string) => {
  return useQuery<Report, Error>({
    queryKey: [""],
    queryFn: () => apiClient.getReport(id),
    retry: 3,
  });
};

export default useReport;
