import { useMutation } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const apiClient = new ApiClient("api/Auth/logout");

const useLogout = () => {
  const singOut = useSignOut();
  const navigate = useNavigate();
  const toast = useToast();
  const [firstToastId, setFirstToastId] = useState<string | number | undefined>(
    undefined
  );
  const closeFirstToast = () => {
    if (firstToastId) {
      toast.close(firstToastId);
      setFirstToastId(undefined);
    }
  };

  return useMutation<void, Error, string>({
    mutationKey: ["logout"],
    mutationFn: (token: string) => apiClient.logout(token ?? ""),
    onMutate: () => {
      const id = toast({
        title: "Logging out...",
        status: "loading",
      });
      setFirstToastId(id);
    },
    onSuccess: () => {
      closeFirstToast();
      toast({
        title: "Logged out successfully.",
        status: "success",
        duration: 2000,
      });
      singOut();
      navigate("/login");
    },
    onError: (error) => {
      closeFirstToast();
      toast({
        title: "Something went wrong.",
        status: "error",
        duration: 2000,
      });
      throw new Error("Logout failed");
    },
  });
};

export default useLogout;
