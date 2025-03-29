import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { SOP } from "../constants/endpoints"; 
const useSOPService = () => {
  const { callApi, loading, setIsLoading } = useApiService();

  const getSOPs = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await callApi("get", SOP.DEFAULT);
      console.log("SOP response:", response);
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi lấy danh sách SOP:", e);
    } finally {
      setIsLoading(false);
    }
  }, [callApi, setIsLoading]);

  const getSOPById = useCallback(async (_id: string) => {
    try {
      setIsLoading(true);
      const response = await callApi("get", `${SOP.DEFAULT}/${_id}`);
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi lấy chi tiết SOP:", e);
    } finally {
      setIsLoading(false);
    }
  }, [callApi, setIsLoading]);

  const createSOP = useCallback(async ({
    name,
    description,
    image_url,
    combo
  }: {
    name: string;
    description: string;
    image_url: string;
    combo: string[];
  }) => {
    try {
      setIsLoading(true);
      const response = await callApi("post", SOP.DEFAULT, {
        name,
        description,
        image_url,
        combo
      });
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi tạo SOP:", e);
    } finally {
      setIsLoading(false);
    }
  }, [callApi, setIsLoading]);

  const updateSOP = useCallback(async (
    id: string,
    {
      name,
      description,
      image_url
    }: {
      name?: string;
      description?: string;
      image_url?: string;
    }
  ) => {
    try {
      setIsLoading(true);
      const response = await callApi("put", `${SOP.DEFAULT}/${id}`, {
        name,
        description,
        image_url
      });
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi cập nhật SOP:", e);
    } finally {
      setIsLoading(false);
    }
  }, [callApi, setIsLoading]);

  const addProductToSOP = useCallback(async (
    id: string,
    productId: string
  ) => {
    try {
      setIsLoading(true);
      const response = await callApi("post", `${SOP.DEFAULT}/${id}/add-product`, {
        product_id: productId
      });
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi thêm sản phẩm vào SOP:", e);
    } finally {
      setIsLoading(false);
    }
  }, [callApi, setIsLoading]);

  const removeProductFromSOP = useCallback(async (
    id: string,
    productId: string
  ) => {
    try {
      setIsLoading(true);
      const response = await callApi("post", `${SOP.DEFAULT}/${id}/remove-product`, {
        product_id: productId
      });
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi xóa sản phẩm khỏi SOP:", e);
    } finally {
      setIsLoading(false);
    }
  }, [callApi, setIsLoading]);

  const deleteSOP = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const response = await callApi("delete", `${SOP.DEFAULT}/${id}`);
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi xóa SOP:", e);
    } finally {
      setIsLoading(false);
    }
  }, [callApi, setIsLoading]);

  return {
    loading,
    getSOPs,
    getSOPById,
    createSOP,
    updateSOP,
    addProductToSOP,
    removeProductFromSOP,
    deleteSOP
  };
};

export default useSOPService;