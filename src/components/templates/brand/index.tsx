import React, { useEffect, useState } from "react";
import { Avatar, Descriptions, Modal, Table } from "antd";
import type { TableProps } from "antd";
import { v4 as uuidv4 } from "uuid";
import "./index.scss";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, Upload } from "antd";
import useBrandService from "../../../services/useBrandService";
import { BrandType } from "../../../types/brand.type";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../../config/firebaseConfig";

const BrandAdmin: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getBrands, createBrands, getBrandById, updateBrands } =
    useBrandService();
  const [brands, setBrands] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<BrandType | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateBrandName, setUpdateBrandName] = useState("");
  const [updateFileList, setUpdateFileList] = useState<UploadFile[]>([]);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);

  const fetch = async () => {
    try {
      const response = await getBrands();
      console.log(response);
      setBrands(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewDetail = async (brandId: string) => {
    try {
      const brandDetail = await getBrandById(brandId);
      setSelectedBrand(brandDetail);
      setIsDetailModalOpen(true);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết brand:", error);
    }
  };

  const handleCreateBrand = async () => {
    if (!brandName || fileList.length === 0) {
      console.error("Vui lòng nhập tên nhãn hàng và chọn hình ảnh!");
      return;
    }

    try {
      const imageUrl = fileList[0].url; // Lấy URL ảnh từ danh sách
      await createBrands(brandName, imageUrl || "");
      console.log("Tạo brand thành công!");
      setIsModalOpen(false);
      setBrandName("");
      setFileList([]);
      fetch(); // Refresh danh sách
    } catch (error) {
      console.error("Lỗi khi tạo brand:", error);
    }
  };

  const handleUpdateBrand = async () => {
    if (!selectedBrandId) return;

    try {
      const imageUrl = updateFileList.length > 0 ? updateFileList[0].url : "";
      console.log(imageUrl);
      await updateBrands(selectedBrandId, updateBrandName, imageUrl || "");

      console.log("Cập nhật brand thành công!");
      setIsUpdateModalOpen(false);
      fetch(); // Refresh danh sách
    } catch (error) {
      console.error("Lỗi khi cập nhật brand:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const columns: TableProps<BrandType>["columns"] = [
    {
      title: "Tên nhãn hàng",
      dataIndex: "brand_name",
      key: "brand_name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image_url",
      key: "image_url",
      render: (url) => <Avatar size={64} src={url} />,
    },
    {
      title: "Chi tiết",
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
        <button
          onClick={() => openUpdateModal(_id)}
          className="px-4 py-2 border rounded-lg bg-customGreen text-white hover:bg-green-500 hover:text-white"
        >
          Cập nhật
        </button>
      ),
    },
  ];

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const uploadImageToFirebase = async (file: File) => {
    return new Promise<string>((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject("Chỉ được phép tải lên file hình ảnh!");
        return;
      }

      // Tạo tên file duy nhất bằng timestamp + UUID
      const uniqueFileName = `${Date.now()}-${uuidv4()}-${file.name}`;
      const storageRef = ref(storage, `brands/${uniqueFileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        }
      );
    });
  };

  const deleteImageFromFirebase = async (imageUrl: string) => {
    try {
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
      console.log("Xóa ảnh thành công:", imageUrl);
    } catch (error) {
      console.error("Lỗi khi xóa ảnh:", error);
    }
  };

  const handleRemove = async (file: UploadFile) => {
    if (file.url) {
      await deleteImageFromFirebase(file.url);
    }
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
  };

  const handleUpload: UploadProps["onChange"] = async (info) => {
    const file = info.file.originFileObj as File;
    if (!file) return;

    try {
      const imageUrl = await uploadImageToFirebase(file);
      console.log("Ảnh mới:", imageUrl); // Kiểm tra URL ảnh mới
      setUpdateFileList([
        {
          uid: info.file.uid,
          name: info.file.name,
          status: "done",
          url: imageUrl,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      if (!file.type.startsWith("image/")) {
        console.error("Chỉ được phép tải lên file hình ảnh!");
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    onChange: handleUpload,
    onRemove: handleRemove,
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openUpdateModal = async (brandId: string) => {
    try {
      const brandDetail = await getBrandById(brandId);
      console.log(brandId);
      setSelectedBrandId(brandDetail._id);
      setUpdateBrandName(brandDetail.brand_name);
      setUpdateFileList([
        {
          uid: "-1",
          name: brandDetail.image_url,
          status: "done",
          url: brandDetail.image_url,
        },
      ]);
      setIsUpdateModalOpen(true);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin nhãn hàng:", error);
    }
  };

  return (
    <div className="brand-admin">
      <button
        onClick={showModal}
        className="my-5 px-5 py-2.5 bg-customGreen text-white rounded-lg hover:bg-green-500"
      >
        Thêm nhãn hàng
      </button>
      <Table<BrandType> columns={columns} dataSource={brands} />
      <Modal
        open={isModalOpen}
        onOk={handleCreateBrand}
        onCancel={handleCancel}
      >
        {" "}
        <h2 className="text-lg font-semibold mb-4">Thêm nhãn hàng</h2>
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="Tên nhãn hàng"
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 mb-4"
        />
        <h2 className="text-lg font-semibold mb-4">Hình ảnh</h2>
        <Upload {...uploadProps} fileList={fileList}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Modal>
      <Modal
        open={selectedBrand !== null}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedBrand(null);
        }}
        footer={null}
      >
        {selectedBrand ? (
          <Descriptions title="Thông tin nhãn hàng" column={1}>
            <Descriptions.Item label="Tên nhãn hàng">
              {selectedBrand.brand_name}
            </Descriptions.Item>
            <Descriptions.Item label="Logo">
              <img src={selectedBrand.image_url} />
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
      >
        <h2 className="text-lg font-semibold mb-4">Tên nhãn hàng</h2>
        <input
          type="text"
          value={updateBrandName} // Hiển thị tên cũ
          onChange={(e) => setUpdateBrandName(e.target.value)} // Cho phép sửa
          placeholder="Tên nhãn hàng"
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 mb-4"
        />

        <h2 className="text-lg font-semibold mb-4">Hình ảnh</h2>
        <Upload {...uploadProps} fileList={updateFileList}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default BrandAdmin;
