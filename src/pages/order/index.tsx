import { Badge, Table, TableProps, Tag } from "antd";
import "./index.scss";
import { OrderStatus, OrderType, PaymentStatus } from "../../types/order.type";
import { useState } from "react";
import useOrderService from "../../services/useOrderService";

function Order() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const { searchOrdersByPhone } = useOrderService();
  const [searchPhone, setSearchPhone] = useState<string>("");

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchPhone) return;

    try {
      const results = await searchOrdersByPhone(searchPhone);
      setOrders(Array.isArray(results.data) ? results?.data?.reverse() : []);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm đơn hàng:", error);
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    const statusMap: Record<OrderStatus, { text: string; color: string }> = {
      [OrderStatus.PROCESSING]: { text: "Processing", color: "blue" },
      [OrderStatus.DELIVERED]: { text: "Success", color: "green" },
      [OrderStatus.COMPLETED]: { text: "Completed", color: "gray" },
      [OrderStatus.CANCELLED]: { text: "Error", color: "red" },
    };

    return (
      <Badge color={statusMap[status].color} text={statusMap[status].text} />
    );
  };

  const getPaymentStatus = (status: PaymentStatus) => {
    const statusColors: Record<PaymentStatus, string> = {
      [PaymentStatus.PAID]: "green",
      [PaymentStatus.UNPAID]: "volcano",
    };

    return <Tag color={statusColors[status]}>{status}</Tag>;
  };

  const columns: TableProps<OrderType>["columns"] = [
    {
      title: "Tên khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (total_amount: number) => (
        <span>{total_amount.toLocaleString()} VND</span>
      ),
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
      render: (status: OrderStatus) => getStatusBadge(status),
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "payment_status",
      key: "payment_status",
      render: (status: PaymentStatus) => getPaymentStatus(status),
    },
  ];

  return (
    <div className="order px-10">
      <div className="mt-7 space-x-4 flex items-center justify-between">
        <h1 className="text-2xl">Xem lịch sử mua hàng</h1>
        <form onSubmit={handleSearch} className="flex space-x-2 items-center">
          <input
            type="text"
            placeholder="Nhập số điện thoại"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            className="px-3 py-2 border text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <button
            type="submit"
            className="border text-black py-2 px-4 rounded-md hover:bg-customLightGreen hover:border-customLightGreen"
          >
            Nhập
          </button>
        </form>
      </div>
      <Table<OrderType> dataSource={orders} columns={columns} />
    </div>
  );
}

export default Order;
