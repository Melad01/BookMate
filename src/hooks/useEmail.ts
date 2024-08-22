import { useMutation } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const apiClient = new ApiClient("/api/Auth/request-reset-password");

interface EmailResponse {
  token: string;
  message: string;
}

const useEmail = () => {
  return useMutation({
    mutationFn: (email: string) => apiClient.email(email),
    onSuccess: (data: EmailResponse) => {
      return data;
    },
  });
};

export default useEmail;
