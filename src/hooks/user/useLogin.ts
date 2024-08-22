import { useMutation } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";
import User from "../../types/User";
import LoginResponse from "../../types/LoginResponse";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const apiClient = new ApiClient("api/Auth/login");

const useLogin = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
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

  return useMutation<LoginResponse, Error, User>({
    mutationKey: ["login"],
    mutationFn: (user: User) => apiClient.login(user),
    onMutate: () => {
      const id = toast({
        title: "Logging in...",
        status: "loading",
      });
      setFirstToastId(id);
    },
    onSuccess: (data: LoginResponse) => {
      closeFirstToast();
      if (data.status === 200) {
        if (
          signIn({
            auth: {
              token: data.token,
              type: "Bearer",
            },
            userState: {
              email: data.email,
              uid: data.id,
            },
          })
        )
          toast({
            title: "Logged in successfully.",
            status: "success",
            duration: 2000,
          });
        navigate("/");
      } else {
        return data;
      }
    },
    onError: (error) => {
      closeFirstToast();

      if (error.message === "Request timed out") {
        toast({
          title: "Request took too long, please try again.",
          status: "error",
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

export default useLogin;
