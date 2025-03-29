import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Table,
  Button,
  Descriptions,
  Divider,
  Spin,
  message,
} from "antd";
import type { TableProps } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import useSOPService from "../../../services/useSOPService";
import { ProductType } from "../../../types/product.type";
import SOPForm from "./SOPForm";
import { SOPType } from "../../../types/sop.type";

const ManageSOP: React.FC = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedSOP, setSelectedSOP] = useState<SOPType | null>(null);
  const [sops, setSOPs] = useState<SOPType[]>([]);
  const [editMode, setEditMode] = useState(false);
  const { loading, getSOPs, getSOPById, deleteSOP } = useSOPService();

  const fetchSOPs = async () => {
    try {
      const response = await getSOPs();
      if (response) {
        setSOPs(response);
      }
    } catch (error) {
      console.error("Lỗi khi fetch danh sách SOP:", error);
      message.error("Không thể tải danh sách SOP");
    }
  };

  const handleViewDetail = async (sopId: string) => {
    try {
      const sopDetail = await getSOPById(sopId);
      if (sopDetail) {
        setSelectedSOP(sopDetail);
        setIsDetailModalOpen(true);
      }
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết SOP:", error);
      message.error("Không thể tải thông tin chi tiết");
    }
  };

  const handleDelete = async (sopId: string) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa SOP này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await deleteSOP(sopId);
          message.success("Xóa SOP thành công");
          fetchSOPs(); 
        } catch (error) {
          console.error("Lỗi khi xóa SOP:", error);
          message.error("Không thể xóa SOP");
        }
      },
    });
  };

  const handleAddSOP = () => {
    setSelectedSOP(null);
    setEditMode(false);
    setIsFormModalOpen(true);
  };

  const handleEditSOP = async (sopId: string) => {
    try {
      const sopDetail = await getSOPById(sopId);
      if (sopDetail) {
        setSelectedSOP(sopDetail);
        setEditMode(true);
        setIsFormModalOpen(true);
      }
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết SOP:", error);
      message.error("Không thể tải thông tin chi tiết để chỉnh sửa");
    }
  };

  const handleFormSubmitSuccess = () => {
    setIsFormModalOpen(false);
    fetchSOPs();
  };

  useEffect(() => {
    fetchSOPs();
  }, []);

  const columns: TableProps<SOPType>["columns"] = [
    {
      title: "Tên SOP",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image_url",
      key: "image_url",
      render: (image_url) => (
        <Image
          src={image_url}
          alt="SOP image"
          className="w-20 h-20 object-cover"
        />
      ),
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "combo",
      key: "combo",
      render: (combo) => combo?.length || 0,
    },
    {
      title: "Chi tiết",
      key: "detail",
      render: (_, record) => (
        <Button
          type="default"
          onClick={() => handleViewDetail(record._id)}
          className="hover:bg-blue-50"
        >
          Chi tiết
        </Button>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditSOP(record._id)}
            className="bg-blue-500 hover:bg-blue-600"
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            className="bg-red-500 hover:bg-red-600 text-red-500"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Quản lý Combo Sản phẩm (SOP)
        </h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddSOP}
          className="bg-green-500 hover:bg-green-600"
        >
          Thêm mới SOP
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <Table<SOPType>
            columns={columns}
            dataSource={sops}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
            className="w-full"
          />
        </div>
      )}

      {/* Modal xem chi tiết SOP */}
      <Modal
        title={
          <span className="text-xl font-semibold">
            Chi tiết Combo Sản phẩm (SOP)
          </span>
        }
        open={isDetailModalOpen}
        onCancel={() => {
          setIsDetailModalOpen(false);
          setSelectedSOP(null);
        }}
        width={1000}
        style={{ top: "10px" }}
        footer={[]}
      >
        {selectedSOP ? (
          <>
            <Descriptions bordered column={1} className="mb-6">
              <Descriptions.Item label="Tên SOP" className="py-3">
                {selectedSOP.name}
              </Descriptions.Item>
              <Descriptions.Item label="Mô tả" className="py-3">
                {selectedSOP.description}
              </Descriptions.Item>
              <Descriptions.Item label="Hình ảnh" className="py-3">
                <Image
                  src={selectedSOP.image_url}
                  alt="SOP image"
                  className="max-w-xs"
                />
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left" className="font-medium">
              Danh sách sản phẩm trong combo
            </Divider>

            <Table
              dataSource={selectedSOP.combo}
              rowKey="_id"
              pagination={false}
              className="w-full"
              columns={[
                {
                  title: "Hình ảnh",
                  dataIndex: "image_url",
                  key: "image_url",
                  render: (image_urls) =>
                    image_urls && image_urls.length > 0 ? (
                      <Image
                        src={image_urls[0]}
                        alt="Product"
                        className="w-16 h-16 object-cover"
                        style={{ width: "100px", height: "100px" }}
                      />
                    ) : (
                      "Không có hình ảnh"
                    ),
                },
                {
                  title: "Tên sản phẩm",
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "Danh mục",
                  dataIndex: "category",
                  key: "category",
                  render: (category) =>
                    category?.category_name || "Không có danh mục",
                },
                {
                  title: "Giá",
                  dataIndex: "price",
                  key: "price",
                  render: (price) => `${price?.toLocaleString()} VNĐ`,
                },
                {
                  title: "Đơn vị",
                  dataIndex: "unit",
                  key: "unit",
                },
              ]}
            />
          </>
        ) : (
          <div className="text-center py-5">
            <Spin />
            <p className="mt-2 text-gray-500">Đang tải thông tin chi tiết...</p>
          </div>
        )}
      </Modal>

      {/* Modal form tạo/chỉnh sửa SOP */}
      <Modal
        title={
          <span className="text-xl font-semibold">
            {editMode ? "Chỉnh sửa SOP" : "Tạo mới SOP"}
          </span>
        }
        open={isFormModalOpen}
        onCancel={() => setIsFormModalOpen(false)}
        footer={null}
        width={1000}
        style={{ top: "10px" }}
      >
        <SOPForm
          sopData={selectedSOP}
          isEdit={editMode}
          onSuccess={handleFormSubmitSuccess}
        />
      </Modal>
    </div>
  );
};

export default ManageSOP;
