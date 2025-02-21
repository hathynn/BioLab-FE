import React, { useEffect, useState } from "react";
import { Descriptions, Image, Modal, Table } from "antd";
import type { TableProps } from "antd";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../../types/product.type";
import useProductService from "../../../services/useProductService";
import { CategoryType } from "../../../types/category.type";
import { BrandType } from "../../../types/brand.type";

const Product: React.FC = () => {
  const nav = useNavigate();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [products, setProducts] = useState<ProductType[]>([]);
  const { getProducts, getProductById } = useProductService();
  const fetch = async () => {
    try {
      const response = await getProducts();
      console.log("API Response:", response);
      setProducts(response);
    } catch (error) {
      console.error("Lỗi khi fetch sản phẩm:", error);
    }
  };

  const handleViewDetail = async (productId: string) => {
    try {
      const productDetail = await getProductById(productId);
      setSelectedProduct(productDetail);
      setIsDetailModalOpen(true);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const columns: TableProps<ProductType>["columns"] = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (cat: CategoryType) => <p>{cat.category_name}</p>,
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      key: "brand",
      render: (brand: BrandType) => <p>{brand?.brand_name}</p>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Số lượng",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Chi tiết sản phẩm",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <button
          onClick={() => handleViewDetail(_id)}
          className="px-4 py-2 border rounded-lg hover:bg-green-500 hover:text-white"
        >
          Chi tiết
        </button>
      ),
    },
    {
      title: "Cập nhật thông tin",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <button className="px-4 py-2 border rounded-lg bg-customGreen text-white hover:bg-green-500 hover:text-white">
          Cập nhật
        </button>
      ),
    },
  ];

  return (
    <div className="product-admin">
      <button
        onClick={() => nav("/admin/create-product")}
        className="my-5 px-6 py-3 bg-customGreen text-white rounded-lg shadow-md hover:bg-green-500"
      >
        Tạo sản phẩm
      </button>
      <Table<ProductType> columns={columns} dataSource={products} />
      <Modal
        open={selectedProduct !== null}
        onCancel={() => {
          setIsDetailModalOpen(false);
          setSelectedProduct(null);
        }}
        footer={null}
    
      >
        <Descriptions title="Thông tin sản phẩm" column={1} bordered>
    
          <Descriptions.Item label="Tên sản phẩm">
            {selectedProduct?.name || "Không có thông tin"}
          </Descriptions.Item>

          <Descriptions.Item label="Mô tả">
            {selectedProduct?.description || "Không có mô tả"}
          </Descriptions.Item>

          <Descriptions.Item label="Danh mục">
            {selectedProduct?.category?.category_name || "Không có danh mục"}
          </Descriptions.Item>

          <Descriptions.Item label="Giá">
            {selectedProduct?.price
              ? `${selectedProduct.price.toLocaleString()} VNĐ`
              : "Không có giá"}
          </Descriptions.Item>

          <Descriptions.Item label="Đơn vị">
            {selectedProduct?.unit || "Không có đơn vị"}
          </Descriptions.Item>

          <Descriptions.Item label="Số lượng">
            {selectedProduct?.stock ?? "Không có thông tin"}
          </Descriptions.Item>

          <Descriptions.Item label="Hình ảnh sản phẩm">
            {selectedProduct?.image_url?.length
              ? selectedProduct.image_url.map((img) => (
                  <Image
                    src={img}
                    alt="Hình ảnh sản phẩm"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      display: "inline-block",
                      marginBottom:'10px',
                  
                    }}
                  />
                ))
              : "Không có hình ảnh"}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions title="Thông tin nhãn hàng" column={1} bordered>
          <Descriptions.Item label="Tên nhãn hàng">
            {selectedProduct?.brand?.brand_name || "Không có thông tin"}
          </Descriptions.Item>


          <Descriptions.Item label="Logo">
            {selectedProduct?.brand?.image_url ? (
              <img
                src={selectedProduct.brand.image_url}
                alt="Logo nhãn hàng"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ) : (
              "Không có logo"
            )}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
};

export default Product;
