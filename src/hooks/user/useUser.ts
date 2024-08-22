import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";
import User from "../../types/User";

const useUser = (id: number | string) => {
  const apiClient = new ApiClient<User>("/users");

  return useQuery({
    queryKey: ["users", id],
    queryFn: () => apiClient.get(id),
  });
};

export default useUser;
