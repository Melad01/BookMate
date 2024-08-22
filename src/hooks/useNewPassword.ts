import { useMutation } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const apiClient = new ApiClient("api/Auth/changePassword");

interface NewPasswordResponse {
  status: number;
  message: string;
  id: string;
  token: string;
}

interface NewPasswordData {
  email: string;
  password: string;
  token: string;
}

const useNewPassword = () => {
  return useMutation({
    mutationFn: ({ email, password, token }: NewPasswordData) =>
      apiClient.newPassword(email, password, token),
    onSuccess: (data: NewPasswordResponse) => {
      return data;
    },
  });
};

export default useNewPassword;
