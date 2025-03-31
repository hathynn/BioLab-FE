import {
  Modal,
  Button,
  Descriptions,
  Tag,
  Spin,
  Table,
  Tabs,
  TabsProps,
  Image,
  Row,
  Col,
  Card,
  message,
} from "antd";
import { useMemo } from "react";
import { OrderType } from "../../../types/order.type";
import { OrderSOPDetailType } from "../../../types/orderSOP.type";
import {
  formatCurrency,
  formatDate,
  formatDateTime,
} from "../../../utils/formatUtils";
import {
  getPaymentStatusColor,
  getStatusColor,
  getSubscriptionStatusColor,
} from "../../../utils/getColorByStatus";

enum OrderStatus {
  PROCESSING = "PROCESSING",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

interface OrderDetailModalProps {
  isVisible: boolean;
  isLoading: boolean;
  selectedOrder: OrderType | null;
  sopOrderDetail: OrderSOPDetailType | null;
  onCancel: () => void;
  updateOrderStatusByOrderId: (id: string, status: string) => Promise<any>;
  refetchOrders: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  isVisible,
  isLoading,
  selectedOrder,
  sopOrderDetail,
  onCancel,
  updateOrderStatusByOrderId,
  refetchOrders,
}) => {
  const isDeliveryDay = useMemo(() => {
    if (!selectedOrder?.subscription_info) return false;

    const currentDate = new Date();
    const currentDay = currentDate.getDate();

    return currentDay === selectedOrder.subscription_info.delivery_day;
  }, [selectedOrder]);

  const handleConfirmDelivery = async () => {
    if (!selectedOrder || !selectedOrder._id) return;

    const newStatus = selectedOrder.subscription_info?.is_continue
      ? OrderStatus.DELIVERED
      : OrderStatus.COMPLETED;

    try {
      await updateOrderStatusByOrderId(selectedOrder._id.toString(), newStatus);
      message.success("Cập nhật trạng thái đơn hàng thành công!");
      refetchOrders();
      onCancel();
    } catch (error) {
      message.error("Cập nhật trạng thái đơn hàng thất bại!");
    }
  };

  const renderBasicInfoTab = () => {
    if (!selectedOrder) return null;

    return (
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Mã đơn hàng" span={2}>
          {selectedOrder._id?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Tên khách hàng">
          {selectedOrder.customer_name}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {selectedOrder.email}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {selectedOrder.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">
          {selectedOrder.address}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày đặt hàng">
          {formatDateTime(selectedOrder.order_date)}
        </Descriptions.Item>
        <Descriptions.Item label="Tổng tiền">
          {formatCurrency(selectedOrder.total_amount)}
        </Descriptions.Item>
        <Descriptions.Item label="Phương thức thanh toán">
          {selectedOrder.payment_method}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái thanh toán">
          <Tag color={getPaymentStatusColor(selectedOrder.payment_status)}>
            {selectedOrder.payment_status.toUpperCase()}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái đơn hàng">
          <Tag color={getStatusColor(selectedOrder.status)}>
            {selectedOrder.status.toUpperCase()}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Loại đơn hàng" span={2}>
          {selectedOrder.item_type || "Đơn hàng thường"}
        </Descriptions.Item>
      </Descriptions>
    );
  };

  const renderSubscriptionInfoTab = () => {
    if (!selectedOrder || !selectedOrder.subscription_info) return null;

    return (
      <>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Trạng thái đăng ký">
            <Tag
              color={getSubscriptionStatusColor(
                selectedOrder.subscription_info.subscription_status
              )}
            >
              {selectedOrder.subscription_info.subscription_status?.toUpperCase() ||
                "N/A"}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Ngày bắt đầu">
            {formatDate(selectedOrder.subscription_info.start_date)}
          </Descriptions.Item>
          <Descriptions.Item label="Thời hạn (tháng)">
            {selectedOrder.subscription_info.duration_months || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày giao hàng trong tháng">
            {selectedOrder.subscription_info.delivery_day || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng chi phí định kỳ">
            {formatCurrency(
              selectedOrder.subscription_info.recurring_total || 0
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày giao hàng tiếp theo">
            {formatDate(selectedOrder.subscription_info.next_delivery_date)}
          </Descriptions.Item>
          <Descriptions.Item label="Đã giao">
            {selectedOrder.subscription_info.deliveries_completed || 0}
          </Descriptions.Item>
          <Descriptions.Item label="Còn lại">
            {selectedOrder.subscription_info.deliveries_remaining || 0}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày giao gần nhất">
            {formatDate(selectedOrder.subscription_info.last_delivery_date)}
          </Descriptions.Item>
          <Descriptions.Item label="Gia hạn tự động">
            {selectedOrder.subscription_info.is_continue ? "Có" : "Không"}
          </Descriptions.Item>
        </Descriptions>

        {isDeliveryDay &&
          selectedOrder.item_type === "sop" &&
          selectedOrder.status !== OrderStatus.DELIVERED &&
          selectedOrder.status !== OrderStatus.COMPLETED && (
            <div style={{ marginTop: 20, textAlign: "center" }}>
              <Button
                type="primary"
                onClick={handleConfirmDelivery}
                loading={isLoading}
              >
                Xác nhận giao hàng
              </Button>
            </div>
          )}
      </>
    );
  };

  const renderSOPDetailTab = () => {
    if (!sopOrderDetail) return null;

    return (
      <>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Descriptions bordered column={1} style={{ marginBottom: 20 }}>
              <Descriptions.Item label="Tên gói SOP">
                {sopOrderDetail.sop_snapshot.name}
              </Descriptions.Item>
              <Descriptions.Item label="Mô tả">
                {sopOrderDetail.sop_snapshot.description || "Không có mô tả"}
              </Descriptions.Item>
              <Descriptions.Item label="Số lượng">
                {sopOrderDetail.quantity}
              </Descriptions.Item>
              <Descriptions.Item label="Đơn giá">
                {formatCurrency(sopOrderDetail.price)}
              </Descriptions.Item>
              <Descriptions.Item label="Thành tiền">
                {formatCurrency(sopOrderDetail.subtotal)}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={12}>
            {sopOrderDetail.sop_snapshot.image_url && (
              <Card title="Hình ảnh gói SOP" style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Image
                    src={sopOrderDetail.sop_snapshot.image_url}
                    alt={sopOrderDetail.sop_snapshot.name}
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                </div>
              </Card>
            )}
          </Col>
        </Row>

        <h3>Sản phẩm trong gói SOP</h3>
        <Table
          dataSource={sopOrderDetail.products}
          pagination={false}
          rowKey="product_id"
          columns={[
            {
              title: "Hình ảnh",
              dataIndex: "image_url",
              key: "image",
              width: 100,
              render: (imageUrl) =>
                imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Sản phẩm"
                    width={80}
                    height={80}
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  <span>Không có ảnh</span>
                ),
            },
            {
              title: "Tên sản phẩm",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Số lượng",
              dataIndex: "quantity",
              key: "quantity",
              width: 100,
            },
            {
              title: "Đơn giá",
              dataIndex: "price",
              key: "price",
              width: 150,
              render: (price) => formatCurrency(price),
            },
            {
              title: "Thành tiền",
              key: "total",
              width: 150,
              render: (_, record) =>
                formatCurrency(record.price * record.quantity),
            },
          ]}
        />
      </>
    );
  };

  const getTabs = (): TabsProps["items"] => {
    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "Thông tin cơ bản",
        children: renderBasicInfoTab(),
      },
    ];

    if (
      selectedOrder?.item_type === "sop" &&
      selectedOrder?.subscription_info
    ) {
      items.push({
        key: "2",
        label: "Thông tin đăng ký",
        children: renderSubscriptionInfoTab(),
      });
    }

    if (sopOrderDetail) {
      items.push({
        key: "3",
        label: "Chi tiết gói SOP",
        children: renderSOPDetailTab(),
      });
    }

    return items;
  };

  return (
    <Modal
      title="Chi tiết đơn hàng"
      open={isVisible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Đóng
        </Button>,
      ]}
      width={1000}
      style={{ top: "10px" }}
    >
      {selectedOrder ? (
        <Spin spinning={isLoading}>
          <Tabs
            defaultActiveKey="1"
            items={getTabs()}
            type="card"
            className="order-detail-tabs"
          />
        </Spin>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </Modal>
  );
};

export default OrderDetailModal;
