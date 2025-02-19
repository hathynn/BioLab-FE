/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { BRAND } from "../constants/endpoints";

const useBrandService = () => {
  const { callApi, loading, setIsLoading } = useApiService();
  const getBrands = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await callApi("get", BRAND.DEFAULT);
      return response?.data;
    } catch (e: any) {
      // toast.error(e?.response?.data || "Failed to get upcoming semester");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const getBrandById = useCallback(async (_id: string) => {
    try {
      setIsLoading(true);
      const response = await callApi("get", `${BRAND.DEFAULT}/${_id}`);
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi lấy chi tiết brand:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);  
  const createBrands = useCallback(async (brandName: string, imageUrl: string) => {
    try {
      setIsLoading(true);
      const response = await callApi("post", BRAND.DEFAULT, {
        brand_name: brandName,
        image_url: imageUrl,
      });
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi tạo brand:", e?.response?.data || "Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const updateBrands = useCallback(async (id: string, brandName: string, imageUrl: string) => {
    try {
      setIsLoading(true);
      const response = await callApi("put", `${BRAND.DEFAULT}/${id}`, {
        brand_name: brandName,
        image_url: imageUrl,
      });
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi cập nhật brand:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return {
    loading,
    setIsLoading,
    getBrands,
    updateBrands,
    createBrands,
    getBrandById,
  };
};

export default useBrandService;