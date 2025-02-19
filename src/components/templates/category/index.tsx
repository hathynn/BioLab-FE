import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import type { TableProps } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, Upload } from "antd";
import useBrandService from "../../../services/useBrandService";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Tên nhãn hàng",
    dataIndex: "name",
    key: "name",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Hình ảnh",
    dataIndex: "age",
    key: "age",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const Category: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "xxx.png",
      status: "done",
      url: "http://www.baidu.com/xxx.png",
    },
  ]);

  const handleChange: UploadProps["onChange"] = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);
  };

  const props = {
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange: handleChange,
    multiple: true,
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getBrand = useBrandService().getBrands();
    console.log(getBrand)
  }, []);

  return (
    <div className="brand-admin">
      <button
        onClick={showModal}
        className="my-5 px-6 py-3 bg-customGreen text-white rounded-lg shadow-md hover:bg-green-500"
      >
        Thêm nhãn hàng
      </button>
      <Table<DataType> columns={columns} dataSource={data} />
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {" "}
        <h2 className="text-lg font-semibold mb-4">Thêm nhãn hàng</h2>
        <input
          type="text"
          placeholder="Tên nhãn hàng"
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 mb-4"
        />
        <h2 className="text-lg font-semibold mb-4">Hình ảnh</h2>
        <Upload {...props} fileList={fileList}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default Category;
