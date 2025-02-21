/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { PRODUCT } from "../constants/endpoints";

const useProductService = () => {
  const { callApi, loading, setIsLoading } = useApiService();

  const getProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await callApi("get", PRODUCT.DEFAULT);
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);


  const getProductById = useCallback(async (_id: string) => {
    try {
      setIsLoading(true);
      const response = await callApi("get", `${PRODUCT.DEFAULT}/${_id}`);
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);


  const createProduct = useCallback(
    async ({
      name,
      description,
      categoryId,
      categoryName,
      imageUrls,
      brandId,
      brandName,
      brandImageUrl,
      unit,
      price,
      stock,
      details,
    }: {
      name: string;
      description: string;
      categoryId: string;
      categoryName: string;
      imageUrls: string[];
      brandId: string;
      brandName: string;
      brandImageUrl: string;
      unit: string;
      price: number;
      stock: number;
      details: { title: string; content: string }[];
    }) => {
      try {
        setIsLoading(true);
        console.log({
            name,
            description,
            category: { _id: categoryId, category_name: categoryName },
            image_url: imageUrls,
            brand: { _id: brandId, brand_name: brandName, image_url: brandImageUrl },
            unit,
            price,
            stock,
            details,
          })
        const response = await callApi("post", PRODUCT.DEFAULT, {
          name,
          description,
          category: { _id: categoryId, category_name: categoryName },
          image_url: imageUrls,
          brand: { _id: brandId, brand_name: brandName, image_url: brandImageUrl },
          unit,
          price,
          stock,
          details,
        });
        return response?.data;
      } catch (e: any) {
        console.error("Lỗi khi tạo sản phẩm:", e);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );


  const updateProduct = useCallback(
    async (
      id: string,
      {
        name,
        description,
        categoryId,
        categoryName,
        imageUrls,
        brandId,
        brandName,
        brandImageUrl,
        unit,
        price,
        stock,
        details,
      }: {
        name: string;
        description: string;
        categoryId: string;
        categoryName: string;
        imageUrls: string[];
        brandId: string;
        brandName: string;
        brandImageUrl: string;
        unit: string;
        price: number;
        stock: number;
        details: { title: string; content: string }[];
      }
    ) => {
      try {
        setIsLoading(true);
        const response = await callApi("put", `${PRODUCT.DEFAULT}/${id}`, {
          name,
          description,
          category: { _id: categoryId, category_name: categoryName },
          image_url: imageUrls,
          brand: { _id: brandId, brand_name: brandName, image_url: brandImageUrl },
          unit,
          price,
          stock,
          details,
        });
        return response?.data;
      } catch (e: any) {
        console.error("Lỗi khi cập nhật sản phẩm:", e);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    loading,
    setIsLoading,
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
  };
};

export default useProductService;
