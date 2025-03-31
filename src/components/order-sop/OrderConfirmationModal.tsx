import React from "react";
import { Modal, Button, Spin, Radio, Form } from "antd";
import { ProfileFormValues } from "./ProfileFormModal";

interface OrderConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (paymentMethod: string) => void;
  loading: boolean;
  profileData: ProfileFormValues;
  sopName: string;
  totalPrice: string;
  subscription: {
    plan: string;
    startDate: string;
    autoRenew: boolean;
    deliveryDay: number;
  };
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
  loading,
  profileData,
  sopName,
  totalPrice,
  subscription,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onConfirm(values.payment_method);
    });
  };

  return (
    <Modal
      title="Xác nhận đơn hàng"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
          style={{ backgroundColor: "#62D985" }}
        >
          Thanh toán
        </Button>,
      ]}
      width={600}
      style={{ top: "10px" }}
    >
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">{sopName}</h3>
          <div className="flex justify-between items-center">
            <span>Tổng thanh toán:</span>
            <span className="font-bold text-xl text-customGreen">
              {totalPrice}đ
            </span>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-bold mb-2">Thông tin đặt hàng</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-500">Người đặt hàng:</p>
              <p className="font-medium">{profileData.customer_name}</p>
            </div>
            <div>
              <p className="text-gray-500">Email:</p>
              <p className="font-medium">{profileData.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Số điện thoại:</p>
              <p className="font-medium">{profileData.phone}</p>
            </div>
            <div>
              <p className="text-gray-500">Địa chỉ:</p>
              <p className="font-medium">{profileData.address}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-bold mb-2">Thông tin đăng ký</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-500">Chu kỳ:</p>
              <p className="font-medium">{subscription.plan}</p>
            </div>
            <div>
              <p className="text-gray-500">Thời gian bắt đầu:</p>
              <p className="font-medium">{subscription.startDate}</p>
            </div>
            <div>
              <p className="text-gray-500">Tự động gia hạn:</p>
              <p className="font-medium">
                {subscription.autoRenew ? "Có" : "Không"}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <Form
            form={form}
            layout="vertical"
            initialValues={{ payment_method: "VNPAY" }}
          >
            <Form.Item
              name="payment_method"
              label="Phương thức thanh toán"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phương thức thanh toán!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="VNPAY" className="flex items-center mb-2">
                  <div className="flex items-center">
                    <img
                      src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
                      alt="VNPAY"
                      className="w-6 h-6 mr-2"
                    />
                    <span>Thanh toán qua VNPAY</span>
                  </div>
                </Radio>
                <Radio value="COD" className="flex items-center">
                  <div className="flex items-center">
                    <img
                      src="https://cdn-icons-png.freepik.com/512/9660/9660649.png"
                      alt="COD"
                      className="w-6 h-6 mr-2"
                    />
                    <span>Thanh toán khi nhận hàng (COD)</span>
                  </div>
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default OrderConfirmationModal;
