/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { POST_CATEGORY } from "../constants/endpoints";

const usePostCategoryService = () => {
  const { callApi, loading, setIsLoading } = useApiService();
  const getCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await callApi("get", POST_CATEGORY.DEFAULT);
      return response?.data;
    } catch (e: any) {
      // toast.error(e?.response?.data || "Failed to get upcoming semester");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const getCategoryById = useCallback(async (_id: string) => {
    try {
      setIsLoading(true);
      const response = await callApi("get", `${POST_CATEGORY.DEFAULT}/${_id}`);
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi lấy chi tiết Category:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const createCategory = useCallback(async (categoryName: string) => {
    try {
      setIsLoading(true);
      const response = await callApi("post", POST_CATEGORY.DEFAULT, {
        post_category_name: categoryName,
      });
      return response?.data;
    } catch (e: any) {
      console.error(
        "Lỗi khi tạo Category:",
        e?.response?.data || "Có lỗi xảy ra"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateCategory = useCallback(
    async (id: string, categoryName: string) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "put",
          `${POST_CATEGORY.DEFAULT}/${id}`,
          {
            post_category_name: categoryName,
          }
        );
        return response?.data;
      } catch (e: any) {
        console.error("Lỗi khi cập nhật category:", e);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    loading,
    setIsLoading,
    getCategories,
    updateCategory,
    createCategory,
    getCategoryById,
  };
};

export default usePostCategoryService;
