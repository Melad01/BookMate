import { useMutation } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const apiClient = new ApiClient("/api/Auth/reset-password");

interface OTPResponse {
  message: string;
}

interface OTPData {
  email: string;
  otp: string;
  token: string;
}

const useOTP = () => {
  return useMutation({
    mutationFn: ({ email, otp, token }: OTPData) =>
      apiClient.otp(email, otp, token),
    onSuccess: (data: OTPResponse) => {
      return data;
    },
  });
};

export default useOTP;
