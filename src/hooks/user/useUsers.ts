import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";
import User from "../../types/User";

const apiClient = new ApiClient<User>("/api/Auth/getAllUsers");

const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: apiClient.getAll,
  });
};

export default useUsers;
