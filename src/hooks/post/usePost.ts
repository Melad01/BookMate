import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";
import Post from "../../types/Post";

const apiClient = new ApiClient<Post>("/api/PostWeb/getPost");

const usePost = (id: string) => {
  return useQuery<Post, Error>({
    queryKey: [""],
    queryFn: () => apiClient.getPost(id),
    retry: 3,
  });
};

export default usePost;
