import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { SOP_ORDER } from "../constants/endpoints";
import { message } from "antd";

interface CreateSOPOrderParams {
  customer_name: string;
  email: string;
  phone: string;
  payment_method: string;
  address: string;
  sop_id: string;
  quantity: number;
  subscription_info?: {
    is_continue: boolean;
    start_date: Date | string;
    duration_months: number;
    delivery_day: number;
  };
}

const useSOPOrderService = () => {
  const { callApi, loading, setIsLoading } = useApiService();

  const createSOPOrderPayment = useCallback(
    async (params: CreateSOPOrderParams) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "post",
          `${SOP_ORDER.DEFAULT}/payment`,
          params
        );
        return response?.data;
      } catch (e: any) {
        console.error("Lỗi khi tạo đơn hàng SOP:", e);
        message.error(e?.response?.data?.message || "Không thể tạo đơn hàng");
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );

  const getSOPOrderByOrderId = useCallback(async (_id: string) => {
    try {
      setIsLoading(true);
      const response = await callApi("get", `${SOP_ORDER.DEFAULT}/${_id}`);
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    loading,
    createSOPOrderPayment,
    getSOPOrderByOrderId,
  };
};

export default useSOPOrderService;
