import { useMutation } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";
import { useToast } from "@chakra-ui/react";

interface DeleteUserResponse {
  status: number;
  message: string;
}

const apiClient = new ApiClient("/deleteUserFromAdmin");

const useDeleteUser = (id: string) => {
  const toast = useToast();
  return useMutation({
    mutationFn: () => apiClient.deleteUser(id),
    onSuccess: (data: DeleteUserResponse) => {
      if (data.status === 200) {
        toast({
          title: "User deleted successfully.",
          status: "success",
          duration: 2000,
        });
      } else {
        toast({
          title: "Something went wrong.",
          status: "error",
          duration: 2000,
        });
      }
    },
  });
};

export default useDeleteUser;
