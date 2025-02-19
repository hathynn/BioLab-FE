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
  const updateBrands = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await callApi("put", BRAND.DEFAULT);
      return response?.data;
    } catch (e: any) {
      // toast.error(e?.response?.data || "Failed to get upcoming semester");
    } finally {
      setIsLoading(false);
    }
  }, []);
  return {
    loading,
    setIsLoading,
    getBrands,
    updateBrands,
  };
};

export default useBrandService;