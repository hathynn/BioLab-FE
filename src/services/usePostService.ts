/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { POST } from "../constants/endpoints";
import { PostCategoryType } from "../types/postCategory.type";

const usePostService = () => {
  const { callApi, loading, setIsLoading } = useApiService();
  const getPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await callApi("get", POST.DEFAULT);
      return response?.data;
    } catch (e: any) {
      // toast.error(e?.response?.data || "Failed to get upcoming semester");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const getPostById = useCallback(async (_id: string) => {
    try {
      setIsLoading(true);
      const response = await callApi("get", `${POST.DEFAULT}/${_id}`);
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi lấy chi tiết Post:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const createPost = useCallback(
    async (
      title: string,
      category: PostCategoryType[],
      post_contents: string,
      banner: string
    ) => {
      try {
        setIsLoading(true);
        const response = await callApi("post", POST.DEFAULT, {
          title: title,
          category: category,
          status: "PUBLISHED",
          banner: banner,
          post_contents: post_contents,
        });
        console.log(response?.data);
        return response?.data;
      } catch (e: any) {
        console.error(
          "Lỗi khi tạo Post:",
          e?.response?.data || "Có lỗi xảy ra"
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    loading,
    setIsLoading,
    getPosts,
    createPost,
    getPostById,
  };
};

export default usePostService;
