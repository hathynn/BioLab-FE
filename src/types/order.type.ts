export interface OrderType {
  _id?: string;
  customer_name: string;
  email: string;
  phone: string;
  order_date?: Date;
  total_amount: number;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: string;
  address: string;
}

export enum OrderStatus {
  PROCESSING = "PROCESSING",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
}

export enum PaymentMethod {
  COD = "COD",
  VNPAY = "VNPAY",
}
