/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { ORDER } from "../constants/endpoints";
import { OrderType } from "../types/order.type";

const useOrderService = () => {
  const { callApi, loading, setIsLoading } = useApiService();

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

  const getAllOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await callApi("get", ORDER.GET_ALL);
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateOrderStatusByOrderId = useCallback(
    async (_id: string, status: string) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "patch",
          `${ORDER.DEFAULT}/${_id}/${ORDER.STATUS}`,
          { status }
        );
        return response?.data;
      } catch (e: any) {
        console.error("Lỗi khi cập nhật trạng thái đơn hàng:", e);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getOrdersByPage = useCallback(
    async (page: number = 1, limit: number = 10) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "get",
          `${ORDER.DEFAULT}?page=${page}&limit=${limit}`
        );
        return response?.data;
      } catch (error: any) {
        console.error("Lỗi khi lấy danh sách đơn hàng theo trang:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [callApi]
  );

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

  const searchOrdersByPhone = useCallback(async (phone: string) => {
    try {
      setIsLoading(true);
      const response = await callApi("get", `${ORDER.DEFAULT}/by-phone`, {
        params: { phone },
      });

      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi tìm đơn hàng theo số điện thoại:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    loading,
    getAllOrders,
    getOrdersByPage,
    updateOrderStatusByOrderId,
    setIsLoading,
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    searchOrdersByPhone,
  };
};

export default useOrderService;
