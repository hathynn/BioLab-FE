import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Select,
  Spin,
  Table,
  Image,
  Divider,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import useSOPService from "../../../services/useSOPService";
import useProductService from "../../../services/useProductService";
import { ProductType } from "../../../types/product.type";
import { v4 as uuidv4 } from "uuid";
import { uploadImageToFirebase } from "../../../utils/uploadImageHandler";

const { Option } = Select;
const { TextArea } = Input;

interface FormValues {
  name: string;
  description: string;
  image_url: string;
  combo: string[];
}

interface SOPFormProps {
  sopData: any;  
  isEdit: boolean; 
  onSuccess: () => void; 
}

const SOPForm: React.FC<SOPFormProps> = ({ sopData, isEdit, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);

  const sopService = useSOPService();
  const productService = useProductService();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts();
        if (response) {
          setProducts(response);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách sản phẩm:", error);
        message.error("Không thể tải danh sách sản phẩm");
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (isEdit && sopData) {
      form.setFieldsValue({
        name: sopData.name,
        description: sopData.description,
      });

      setImageUrl(sopData.image_url);
      setImagePreview(sopData.image_url);

      const productIds = sopData.combo.map((product: any) => product._id);
      setSelectedProductIds(productIds);
      setSelectedProducts(sopData.combo);
    } else {
      form.resetFields();
      setImageUrl("");
      setImagePreview("");
      setSelectedFile(null);
      setSelectedProductIds([]);
      setSelectedProducts([]);
    }
  }, [isEdit, sopData, form]);

  const onFinish = async (values: FormValues) => {
    setLoading(true);
    try {
      let finalImageUrl = imageUrl;

      if (selectedFile) {
        try {
          finalImageUrl = await uploadImageToFirebase(selectedFile, "sops");
        } catch (error) {
          console.error("Lỗi khi tải ảnh lên Firebase:", error);
          message.error("Không thể tải ảnh lên. Vui lòng thử lại.");
          setLoading(false);
          return;
        }
      }

      values.image_url = finalImageUrl;
      values.combo = selectedProductIds;

      if (isEdit && sopData) {
        await sopService.updateSOP(sopData._id, {
          name: values.name,
          description: values.description,
          image_url: values.image_url,
        });

        const currentSOP = await sopService.getSOPById(sopData._id);
        const currentProductIds = currentSOP.combo.map(
          (product: any) => product._id
        );

        for (const productId of currentProductIds) {
          if (!selectedProductIds.includes(productId)) {
            await sopService.removeProductFromSOP(sopData._id, productId);
          }
        }

        for (const productId of selectedProductIds) {
          if (!currentProductIds.includes(productId)) {
            await sopService.addProductToSOP(sopData._id, productId);
          }
        }

        message.success("Cập nhật SOP thành công");
      } else {
        await sopService.createSOP(values);
        message.success("Tạo SOP thành công");
      }

      onSuccess();
    } catch (error) {
      console.error("Lỗi khi lưu SOP:", error);
      message.error("Lỗi khi lưu SOP. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (info: any) => {
    if (!info || !info.file) {
      console.error("Invalid upload info", info);
      return;
    }

    const file = info.file.originFileObj || info.file;

    if (file instanceof File) {
      setSelectedFile(file);

      const previewURL = URL.createObjectURL(file);
      console.log("Preview URL created:", previewURL);
      setImagePreview(previewURL);
    } else {
      console.error("Not a valid File object:", file);
    }
  };

  const handleAddProduct = (productId: string) => {
    if (selectedProductIds.includes(productId)) {
      message.warning("Sản phẩm này đã được thêm vào combo");
      return;
    }

    const product = products.find((p) => p._id === productId);
    if (product) {
      setSelectedProductIds([...selectedProductIds, productId]);
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProductIds(selectedProductIds.filter((id) => id !== productId));
    setSelectedProducts(
      selectedProducts.filter((product) => product._id !== productId)
    );
  };

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            name="name"
            label="Tên SOP"
            rules={[{ required: true, message: "Vui lòng nhập tên SOP" }]}
          >
            <Input
              placeholder="Nhập tên SOP"
              className="w-full p-2 border rounded"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <TextArea
              rows={4}
              placeholder="Nhập mô tả SOP"
              className="w-full p-2 border rounded"
            />
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            required
            rules={[
              {
                validator: (_, value) => {
                  if (!imagePreview && !selectedFile && !isEdit) {
                    return Promise.reject("Vui lòng tải lên hình ảnh");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Upload
              name="file"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => false} 
              onChange={handleImageChange}
              className="mb-2"
              accept="image/*" 
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="SOP"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <PlusOutlined className="text-lg" />
                  <div className="mt-2">Tải lên</div>
                </div>
              )}
            </Upload>
            {!imagePreview && !selectedFile && (
              <div className="text-red-500 text-sm">
                Vui lòng tải lên hình ảnh
              </div>
            )}
          </Form.Item>

          <Divider className="my-4" />
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">
              Thêm sản phẩm vào combo
            </h3>

            <Form.Item label="Chọn sản phẩm">
              <Select
                showSearch
                placeholder="Tìm kiếm sản phẩm"
                optionFilterProp="children"
                filterOption={(input, option) => {
                  if (!option || !option.label) return false;
                  return String(option.label)
                    .toLowerCase()
                    .includes(input.toLowerCase());
                }}
                onChange={handleAddProduct}
                value={undefined}
                className="w-full"
                options={products.map((product) => ({
                  value: product._id,
                  label: product.name,
                }))}
              />
            </Form.Item>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">
              Danh sách sản phẩm đã chọn ({selectedProducts.length})
            </h3>
            <Table
              dataSource={selectedProducts}
              rowKey="_id"
              pagination={false}
              className="border rounded-lg overflow-hidden"
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
                  title: "Giá",
                  dataIndex: "price",
                  key: "price",
                  render: (price) => `${price?.toLocaleString()} VNĐ`,
                },
                {
                  title: "Thao tác",
                  key: "action",
                  render: (_, record) => (
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveProduct(record._id!)}
                      className="text-red-500 hover:bg-red-50"
                    />
                  ),
                },
              ]}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              onClick={() => onSuccess()}
              className="px-4 py-2 border rounded"
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isEdit ? "Cập nhật" : "Tạo mới"}
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default SOPForm;
