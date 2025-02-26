import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  Radio,
  Select,
  Upload,
} from "antd";
import { PictureOutlined } from "@ant-design/icons";
import "./index.scss";
import { useEffect, useState } from "react";
import useCategoryService from "../../../../services/useCategoryService";
import useBrandService from "../../../../services/useBrandService";
import { CategoryType } from "../../../../types/category.type";
import { BrandType } from "../../../../types/brand.type";
import ReactQuill from "react-quill";
function Create() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [brands, setBrands] = useState<BrandType[]>([]);
  const { getCategories } = useCategoryService();
  const { getBrands } = useBrandService();

  const fetch = async () => {
    try {
      const categories = await getCategories();
      const brands = await getBrands();
      setCategories(categories);
      setBrands(brands);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const [fileList, setFileList] = useState([]);

  const beforeUpload = (file: File) => {
    const isValid = file.type === "image/png" || file.type === "image/jpeg";
    if (!isValid) {
      alert("Chỉ được upload file PNG hoặc JPG!");
    }
    return isValid || Upload.LIST_IGNORE;
  };

  const handleChange = ({ fileList }: any) => {
    setFileList(fileList);
  };
  const onFinish = (values: any) => {
    console.log("Dữ liệu sản phẩm:", values);
  };
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Tạo sản phẩm</h2>
      <Form
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
      >
        <div className="flex flex-row justify-center items-start gap-4 ">
          <Form.Item className="w-1/3 ">
            <Form.Item
              name="img"
              valuePropName="fileList"
              getValueFromEvent={(e: any) => e?.fileList}
              noStyle
              label="Hình ảnh sản phẩm"
              rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
            >
              <Upload.Dragger
                name="files"
                action="/upload.do"
                multiple
                beforeUpload={beforeUpload}
                fileList={fileList}
                onChange={handleChange}
                listType="picture"
              >
                <p className="ant-upload-drag-icon">
                  <PictureOutlined />
                </p>
                <p className="ant-upload-text">Upload hình ảnh sản phẩm</p>
                <p className="ant-upload-hint">
                  Chỉ hỗ trợ ảnh dạng PNG và JPG
                </p>
              </Upload.Dragger>
            </Form.Item>

            {/* Danh sách ảnh đã upload */}
            <div className="mt-2">
              {fileList.map((file: any) => (
                <Image
                  key={file.uid}
                  src={URL.createObjectURL(file.originFileObj)}
                  width={100}
                  height={100}
                  style={{ marginRight: 8, objectFit: "cover" }}
                />
              ))}
            </div>
          </Form.Item>

          <div
            // layout="horizontal"
            // labelCol={{ span: 8 }}

            className="w-3/5"
          >
            <Form.Item
              label="Thương hiệu"
              name="brand"
              required={false}
              rules={[{ required: true, message: "Vui lòng chọn thương hiệu" }]}
            >
              <Select
                options={brands.map((brand) => ({
                  label: brand?.brand_name,
                  value: brand?._id,
                }))}
              />
            </Form.Item>
            <Form.Item
              label="Tên sản phẩm"
              name="productName"
              required={false}
              rules={[{ required: true, message: "Vui lòng chọn thương hiệu" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Giá sản phẩm"
              name="price"
              required={false}
              rules={[{ required: true, message: "Vui lòng nhập giá" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số lượng sản phẩm"
              name="quantity"
              required={false}
              rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Chọn đơn vị"
              name="unit"
              required={false}
              rules={[{ required: true, message: "Vui lòng chọn đơn vị" }]}
            >
              <Checkbox.Group
                options={[
                  { label: "Hộp", value: "hop" },
                  { label: "Vỉ", value: "vi" },
                  { label: "Tuýt", value: "tuyt" },
                  { label: "Chai", value: "chai" },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Danh mục"
              name="category"
              required={false}
              rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
            >
              <Select
                options={categories.map((c) => ({
                  label: c?.category_name,
                  value: c?._id,
                }))}
              />
            </Form.Item>
            <Form.Item
              label="Mô tả ngắn sản phẩm:"
              name="description"
              required={false}
              rules={[{ required: true, message: "Vui lòng nhập mô tả ngắn" }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item
              label="Ghi chú"
              name="note"
              required={false}
              rules={[{ required: true, message: "Vui lòng nhập ghi chú" }]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>
          </div>
        </div>

        <Form.Item
          label="Mô tả chi tiết sản phẩm "
          name="detail_description"
          required={false}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả chi tiết sản phẩm",
            },
          ]}
        >
          <ReactQuill />
        </Form.Item>

        <Form.Item
          label="Mô tả thành phần sản phẩm "
          name="detail_component"
          required={false}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả chi tiết sản phẩm",
            },
          ]}
        >
          <ReactQuill />
        </Form.Item>
        <Form.Item
          label="Mô tả công dụng "
          name="detail_benifit"
          required={false}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả chi tiết sản phẩm",
            },
          ]}
        >
          <ReactQuill />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {/* Thêm htmlType="submit" */}
            Tạo sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Create;
