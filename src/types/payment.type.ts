export interface PaymentType {
  orderCode: number;
  amount: number;
  description?: string;
  returnUrl: string;
  cancelUrl: string;
}

export interface PaymentResponse {
  status: number;
  message: string;
  data?: {
    checkoutUrl?: string;
    error?: any;
  };
}

export interface WebhookData {
  orderCode: number;
  status: string;
  transactionId: string;
  amount: number;
  signature: string;
}
