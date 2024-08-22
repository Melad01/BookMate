import { useMutation } from "@tanstack/react-query";
import UpdateUser from "../../types/UpdateUser";
import ApiClient from "../../services/apiClient";
import UpdateUserResponse from "../../types/UpdateUserResponse";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const apiClient = new ApiClient("/api/Auth/updateUser");

const useEditUser = () => {
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

  return useMutation({
    mutationFn: (user: UpdateUser) => apiClient.updateUser(user),
    onMutate: () => {
      const id = toast({
        title: "Editing profile...",
        status: "loading",
      });
      setFirstToastId(id);
    },
    onSuccess: (data: UpdateUserResponse) => {
      if (data.status === 200) {
        if (
          signIn({
            auth: {
              token: data.newToken,
              type: "Bearer",
            },
            userState: {
              email: data.email,
              uid: data.user_id,
            },
          })
        ) {
          closeFirstToast();

          toast({
            title: "Updated successfully.",
            status: "success",
            duration: 2000,
          });
        }
      } else {
        return data;
      }
    },
  });
};

export default useEditUser;
