import { Table, Button, Tag } from "antd";
import { useEffect, useState, useCallback } from "react";
import useOrderService from "../../../services/useOrderService";
import { OrderType } from "../../../types/order.type";
import { OrderSOPDetailType } from "../../../types/orderSOP.type";
import { ColumnsType } from "antd/es/table";
import { formatCurrency, formatDateTime } from "../../../utils/formatUtils";
import OrderDetailModal from "./OrderDetailModal";
import {
  getStatusColor,
  getPaymentStatusColor,
} from "../../../utils/getColorByStatus";
import useSOPOrderService from "../../../services/useSOPOrderService";

const ManageOrder = () => {
  const { getAllOrders, updateOrderStatusByOrderId } = useOrderService();
  const { getSOPOrderByOrderId } = useSOPOrderService();

  const [orders, setOrders] = useState<OrderType[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [sopOrderDetail, setSopOrderDetail] =
    useState<OrderSOPDetailType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await getAllOrders();
      setOrders(response.reverse());
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const showOrderDetail = async (order: OrderType) => {
    setSelectedOrder(order);
    setIsModalVisible(true);

    if (order.item_type === "sop" && order._id) {
      const sopDetail = await getSOPOrderByOrderId(order._id.toString());
      console.log("sopDetail: ",sopDetail)
      setSopOrderDetail(sopDetail.sop_detail);
    } else {
      setSopOrderDetail(null);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
    setSopOrderDetail(null);
  };

  const columns: ColumnsType<OrderType> = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => <span>{_id?.toString().substring(0, 8)}...</span>,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (amount) => formatCurrency(amount),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Thanh toán",
      dataIndex: "payment_status",
      key: "payment_status",
      render: (status) => (
        <Tag color={getPaymentStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "order_date",
      key: "order_date",
      render: (date) => formatDateTime(date),
    },
    {
      title: "Loại đơn hàng",
      dataIndex: "item_type",
      key: "item_type",
      render: (type) => type || "Đơn thường",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => showOrderDetail(record)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="manage-order-container">
      <h1>Quản lý đơn hàng</h1>

      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />

      <OrderDetailModal
        isVisible={isModalVisible}
        isLoading={isLoading}
        selectedOrder={selectedOrder}
        sopOrderDetail={sopOrderDetail}
        onCancel={handleCancel}
        updateOrderStatusByOrderId={updateOrderStatusByOrderId}
        refetchOrders={fetchOrders}
      />
    </div>
  );
};

export default ManageOrder;
