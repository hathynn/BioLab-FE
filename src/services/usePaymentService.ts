import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { PAYMENT } from "../constants/endpoints";
import { PaymentType } from "../types/payment.type";

const usePaymentService = () => {
  const { callApi, loading, setIsLoading } = useApiService();

  // Tạo thanh toán
  const createPayment = useCallback(async (paymentData: PaymentType) => {
    try {
      setIsLoading(true);
      const response = await callApi(
        "post",
        `${PAYMENT.DEFAULT}/${PAYMENT.CREATE}/`,
        paymentData
      );

      return response?.data;
    } catch (e: any) {
      console.error(
        "Lỗi khi tạo thanh toán:",
        e?.response?.data || "Có lỗi xảy ra"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Xử lý webhook thanh toán
  const handleWebhook = useCallback(async (webhookData: any) => {
    try {
      setIsLoading(true);
      const response = await callApi(
        "post",
        `${PAYMENT.DEFAULT}/${PAYMENT.WEBHOOK}/`,
        webhookData
      );
      return response?.data;
    } catch (e: any) {
      console.error("Lỗi khi xử lý webhook thanh toán:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    loading,
    setIsLoading,
    createPayment,
    handleWebhook,
  };
};

export default usePaymentService;
