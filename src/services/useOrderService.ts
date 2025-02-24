/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { ORDER } from "../constants/endpoints";
import { OrderType } from "../types/order.type";

const useOrderService = () => {
  const { callApi, loading, setIsLoading } = useApiService();

  // Lấy danh sách tất cả đơn hàng
  const getOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await callApi("get", ORDER.DEFAULT);
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Lấy chi tiết đơn hàng theo ID
  const getOrderById = useCallback(async (_id: string) => {
    try {
      setIsLoading(true);
      const response = await callApi("get", `${ORDER.DEFAULT}/${_id}`);
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Tạo đơn hàng mới
  const createOrder = useCallback(async (order: OrderType) => {
    try {
      setIsLoading(true);
      const response = await callApi("post", ORDER.DEFAULT, order);
      return response?.data;
    } catch (e: any) {
      console.error(
        "Lỗi khi tạo đơn hàng:",
        e?.response?.data || "Có lỗi xảy ra"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cập nhật đơn hàng theo ID
  const updateOrder = useCallback(
    async (_id: string, updatedOrder: Partial<OrderType>) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "put",
          `${ORDER.DEFAULT}/${_id}`,
          updatedOrder
        );
        return response?.data;
      } catch (e: any) {
        console.error("Lỗi khi cập nhật đơn hàng:", e);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Xóa đơn hàng theo ID
  const deleteOrder = useCallback(async (_id: string) => {
    try {
      setIsLoading(true);
      const response = await callApi("delete", `${ORDER.DEFAULT}/${_id}`);
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi xóa đơn hàng:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    loading,
    setIsLoading,
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
  };
};

export default useOrderService;
