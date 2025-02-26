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
import { useState } from "react";
function Create() {
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const [fileList, setFileList] = useState([]);

  // Chỉ nhận file PNG hoặc JPG
  const beforeUpload = (file: File) => {
    const isValid = file.type === "image/png" || file.type === "image/jpeg";
    if (!isValid) {
      alert("Chỉ được upload file PNG hoặc JPG!");
    }
    return isValid || Upload.LIST_IGNORE; // Bỏ qua file nếu không hợp lệ
  };

  // Cập nhật danh sách file khi upload
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
            <Form.Item label="Thương hiệu" name="brand">
              <Input />
            </Form.Item>
            <Form.Item label="Tên sản phẩm" name="productName">
              <Input />
            </Form.Item>
            <Form.Item label="Giá sản phẩm" name="price">
              <Input />
            </Form.Item>
            <Form.Item label="Số lượng sản phẩm" name="quantity">
              <Input />
            </Form.Item>
            <Form.Item label="Chọn đơn vị" name="unit">
              {/* <Radio.Group>
                <Radio value="a">Hộp</Radio>
                <Radio value="b">Vỉ</Radio>
                <Radio value="c">Tuýt</Radio>
                <Radio value="c">Chai</Radio>
              </Radio.Group> */}
              <Checkbox.Group
                options={[
                  { label: "Hộp", value: "hop" },
                  { label: "Vỉ", value: "vi" },
                  { label: "Tuýt", value: "tuyt" },
                  { label: "Chai", value: "chai" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Danh mục" name="category">
              <Select
                options={[
                  { label: "Designer", value: "designer" },
                  { label: "Developer", value: "developer" },
                  { label: "Product Manager", value: "product-manager" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Mô tả ngắn sản phẩm:" name="description">
              <Input.TextArea rows={3} />
            </Form.Item>
          </div>
        </div>
        <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {" "}
            {/* Thêm htmlType="submit" */}
            Tạo sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Create;
