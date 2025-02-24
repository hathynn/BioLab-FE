import React, { useEffect, useState } from "react";
import { Descriptions, Modal, Table } from "antd";
import type { TableProps } from "antd";
import "./index.scss";
// import type { UploadFile } from "antd";
// import useBrandService from "../../../services/useBrandService";
import { BrandType } from "../../../types/brand.type";
import { CategoryType } from "../../../types/category.type";
import useCategoryService from "../../../services/useCategoryService";

const Category: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getCategories, getCategoryById, createCategory, updateCategory } =
    useCategoryService();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );
  const [_isDetailModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const fetch = async () => {
    try {
      const response = await getCategories();
      console.log(response);
      setCategories(response);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleViewDetail = async (categoryId: string) => {
  //   try {
  //     const categoryDetail = await getCategoryById(categoryId);
  //     setSelectedCategory(categoryDetail);
  //     setIsDetailModalOpen(true);
  //   } catch (error) {
  //     console.error("Lỗi khi lấy chi tiết category:", error);
  //   }
  // };

  const handleCreateCategory = async () => {
    if (!categoryName) {
      console.error("Vui lòng nhập tên danh mục!");
      return;
    }

    try {
      await createCategory(categoryName);
      console.log("Tạo category thành công!");
      setIsModalOpen(false);
      setCategoryName("");

      fetch(); // Refresh danh sách
    } catch (error) {
      console.error("Lỗi khi tạo category:", error);
    }
  };

  const handleUpdateBrand = async () => {
    if (!selectedCategoryId) return;

    try {
      await updateCategory(selectedCategoryId, updateCategoryName);
      console.log("CategoryID: ", selectedCategoryId);
      console.log("Cập nhật category thành công!");
      setIsUpdateModalOpen(false);
      fetch(); // Refresh danh sách
    } catch (error) {
      console.error("Lỗi khi cập nhật category:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const columns: TableProps<BrandType>["columns"] = [
    {
      title: "Tên danh mục",
      dataIndex: "category_name",
      key: "category_name",
      render: (text) => <p>{text}</p>,
    },

    {
      title: "Cập nhật thông tin",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <button
          onClick={() => openUpdateModal(_id)}
          className="px-4 py-2 border rounded-lg  text-black hover:bg-green-500 hover:text-white"
        >
          Cập nhật
        </button>
      ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openUpdateModal = async (categoryId: string) => {
    try {
      const categoryDetail = await getCategoryById(categoryId);
      console.log(categoryId);
      setSelectedCategoryId(categoryDetail._id);
      setUpdateCategoryName(categoryDetail.category_name);

      setIsUpdateModalOpen(true);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin category:", error);
    }
  };

  return (
    <div className="category-admin">
      <button
        onClick={showModal}
        className="my-5 px-5 py-2.5 bg-customGreen text-white rounded-lg hover:bg-green-500"
      >
        Thêm danh mục
      </button>
      <Table<BrandType> columns={columns} dataSource={categories} />
      <Modal
        open={isModalOpen}
        onOk={handleCreateCategory}
        onCancel={handleCancel}
        className="create-brand"
        okButtonProps={{ style: { backgroundColor: "#62d985" } }}
      >
        {" "}
        <h2 className="text-lg font-semibold mb-4">Thêm danh mục sản phẩm</h2>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Tên danh mục"
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 mb-4"
        />
      </Modal>
      <Modal
        open={selectedCategory !== null}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedCategory(null);
        }}
        footer={null}
        okButtonProps={{ style: { backgroundColor: "#62d985" } }}
      >
        {selectedCategory ? (
          <Descriptions title="Thông tin nhãn hàng" column={1}>
            <Descriptions.Item label="Tên nhãn hàng">
              {selectedCategory.category_name}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <p>Đang tải...</p>
        )}
      </Modal>
      <Modal
        title="Cập nhật nhãn hàng"
        open={isUpdateModalOpen}
        onOk={handleUpdateBrand}
        onCancel={() => setIsUpdateModalOpen(false)}
        okButtonProps={{ style: { backgroundColor: "#62d985" } }}
      >
        <h2 className="text-lg font-semibold mb-4">Tên danh mục</h2>
        <input
          type="text"
          value={updateCategoryName} // Hiển thị tên cũ
          onChange={(e) => setUpdateCategoryName(e.target.value)} // Cho phép sửa
          placeholder="Tên danh mục"
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 mb-4"
        />
      </Modal>
    </div>
  );
};

export default Category;
