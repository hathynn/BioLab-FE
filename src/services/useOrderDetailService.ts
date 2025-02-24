/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { ORDER_DETAIL } from "../constants/endpoints";
import { OrderDetailType } from "../types/orderDetail.type";

const useOrderDetailService = () => {
  const { callApi, loading, setIsLoading } = useApiService();

  // Lấy danh sách chi tiết đơn hàng theo order_id
  const getOrderDetailsByOrderId = useCallback(async (orderId: string) => {
    try {
      setIsLoading(true);
      const response = await callApi(
        "get",
        `${ORDER_DETAIL.DEFAULT}?order_id=${orderId}`
      );
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi lấy danh sách chi tiết đơn hàng:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Lấy chi tiết đơn hàng theo ID
  const getOrderDetailById = useCallback(async (_id: string) => {
    try {
      setIsLoading(true);
      const response = await callApi("get", `${ORDER_DETAIL.DEFAULT}/${_id}`);
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Tạo chi tiết đơn hàng mới
  const createOrderDetail = useCallback(
    async (orderDetail: OrderDetailType) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "post",
          ORDER_DETAIL.DEFAULT,
          orderDetail
        );
        return response?.data;
      } catch (e: any) {
        console.error(
          "Lỗi khi tạo chi tiết đơn hàng:",
          e?.response?.data || "Có lỗi xảy ra"
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Cập nhật chi tiết đơn hàng theo ID
  const updateOrderDetail = useCallback(
    async (_id: string, updatedOrderDetail: Partial<OrderDetailType>) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "put",
          `${ORDER_DETAIL.DEFAULT}/${_id}`,
          updatedOrderDetail
        );
        return response?.data;
      } catch (e: any) {
        console.error("Lỗi khi cập nhật chi tiết đơn hàng:", e);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Xóa chi tiết đơn hàng theo ID
  const deleteOrderDetail = useCallback(async (_id: string) => {
    try {
      setIsLoading(true);
      const response = await callApi(
        "delete",
        `${ORDER_DETAIL.DEFAULT}/${_id}`
      );
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi xóa chi tiết đơn hàng:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    loading,
    setIsLoading,
    getOrderDetailsByOrderId,
    getOrderDetailById,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail,
  };
};

export default useOrderDetailService;
