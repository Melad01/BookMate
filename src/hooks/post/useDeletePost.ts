import { useMutation } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";
import Post from "../../types/Book";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const apiClient = new ApiClient<Post>("/api/PostWeb/deletePost");

const useDeletePost = (id: string) => {
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
    mutationFn: () => apiClient.deletePost(id),
    onMutate: () => {
      const toastId = toast({
        title: "Deleting post...",
        status: "loading",
      });
      setFirstToastId(toastId);
    },

    onSuccess: () => {
      closeFirstToast();
      toast({
        title: "Post deleted successfully.",
        status: "success",
        duration: 2000,
      });
    },

    onError: (error, postId, context) => {
      closeFirstToast();

      if (error.message === "Request timed out") {
        toast({
          title: "Request took too long, please try again.",
          status: "error",
          duration: 5000,
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

export default useDeletePost;
