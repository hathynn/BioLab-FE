import { useEffect, useState } from "react";
import { PlusOutlined, PictureOutlined } from "@ant-design/icons";
import { Image, Upload, Form, Input, Select, Checkbox, Button } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import useCategoryService from "../../../../services/useCategoryService";
import { CategoryType } from "../../../../types/category.type";
import { v4 as uuidv4 } from "uuid";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BrandType } from "../../../../types/brand.type";
import useBrandService from "../../../../services/useBrandService";
import useProductService from "../../../../services/useProductService";
import { ADMIN_ROUTES } from "../../../../constants/routes";
import { toast } from "react-toastify";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function CreateProduct() {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const nav = useNavigate();

  const { getCategories } = useCategoryService();
  const { getBrands } = useBrandService();
  const { createProduct } = useProductService();

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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

  const uploadImageToFirebase = async (file: File) => {
    return new Promise<string>((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject("Chỉ được phép tải lên file hình ảnh!");
        return;
      }

      const uniqueFileName = `${Date.now()}-${uuidv4()}-${file.name}`;
      const storageRef = ref(storage, `products/${uniqueFileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

  const handleChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const handleRemove = async (file: UploadFile) => {
    console.log("Removing file:", file); // Debug log
    if (file.url) {
      await deleteImageFromFirebase(file.url);
      setImageUrls((prevUrls) => {
        console.log("Before remove URLs:", prevUrls); // Debug log
        const newUrls = prevUrls.filter((url) => url !== file.url);
        console.log("After remove URLs:", newUrls); // Debug log
        return newUrls;
      });
    }
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
  };

  const handlePreview = async (file: UploadFile) => {
    let previewUrl = file.url || file.preview;

    if (!previewUrl && file.originFileObj) {
      previewUrl = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(previewUrl as string);
    setPreviewOpen(true);
  };

  const onFinish = async (values: any) => {
    console.log("Current imageUrls:", imageUrls); // Debug log
    console.log("Current fileList:", fileList); // Debug log
    if (imageUrls.length === 0) {
      alert("Vui lòng upload ít nhất một hình ảnh!");
      return;
    }

    const selectedCategory = categories.find(c => c._id === values.category);
    const selectedBrand = brands.find(b => b._id === values.brand);

    if (!selectedCategory || !selectedBrand) {
      alert("Vui lòng chọn đầy đủ thông tin danh mục và thương hiệu!");
      return;
    }

    const productData = {
      name: values.productName,
      note: values.note,
      description: values.description,
      categoryId: values.category,
      categoryName: selectedCategory.category_name,
      imageUrls: imageUrls,
      brandId: values.brand,
      brandName: selectedBrand.brand_name,
      brandImageUrl: selectedBrand.image_url || "",
      unit: values.unit.join(", "),
      price: Number(values.price),
      stock: Number(values.quantity),
      details: [
        { title: "Mô tả sản phẩm", content: values.detail_description },
        { title: "Thành phần", content: values.detail_component },
        { title: "Công dụng", content: values.detail_benifit },
        { title: "Tác dụng phụ", content: values.detail_side_effects },
        { title: "Lưu ý", content: values.detail_notes },
        { title: "Bảo quản", content: values.detail_storage }
      ],
    };

    try {
      const response = await createProduct(productData);
      console.log("Sản phẩm được tạo:", response);
      toast.success("Tạo sản phẩm thành công!");
      nav(-1);
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error);
      alert("Tạo sản phẩm thất bại!");
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const beforeUpload = (file: File) => {
    const isValid = file.type === "image/png" || file.type === "image/jpeg";
    if (!isValid) {
      alert("Chỉ được upload file PNG hoặc JPG!");
      return Upload.LIST_IGNORE;
    }
    // Upload file to Firebase
    uploadImageToFirebase(file).then(url => {
      console.log("Uploaded image URL:", url);
      if (!imageUrls.includes(url)) {
        setImageUrls(prev => [...prev, url]);
      }
    }).catch(error => {
      console.error('Error uploading file:', error);
    });
    return false; // Prevent default upload
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Tạo sản phẩm</h2>
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
      >
        <div className="flex flex-row justify-center items-start gap-4">
          <Form.Item className="w-1/3">
            <Form.Item
              name="img"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
              label="Hình ảnh sản phẩm"
              rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
            >
              <Upload.Dragger
                name="files"
                multiple
                beforeUpload={beforeUpload}
                fileList={fileList}
                onChange={handleChange}
                onRemove={handleRemove}
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

            <div className="mt-2">
              {fileList.map((file: any) => (
                <Image
                  key={file.uid}
                  src={file.url || URL.createObjectURL(file.originFileObj)}
                  width={100}
                  height={100}
                  style={{ marginRight: 8, objectFit: "cover" }}
                />
              ))}
            </div>
          </Form.Item>

          <div className="w-3/5">
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
              rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Giá sản phẩm"
              name="price"
              required={false}
              rules={[{ required: true, message: "Vui lòng nhập giá" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Số lượng sản phẩm"
              name="quantity"
              required={false}
              rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Chọn đơn vị"
              name="unit"
              required={false}
              rules={[{ required: true, message: "Vui lòng chọn đơn vị" }]}
            >
              <Checkbox.Group
                options={[
                  { label: "Hộp", value: "Hộp" },
                  { label: "Vỉ", value: "Vỉ" },
                  { label: "Tuýt", value: "Tuýt" },
                  { label: "Chai", value: "Chai" },
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
          label="Mô tả chi tiết sản phẩm"
          name="detail_description"
          required={false}
          rules={[{ required: true, message: "Vui lòng nhập mô tả chi tiết sản phẩm" }]}
        >
          <ReactQuill />
        </Form.Item>

        <Form.Item
          label="Mô tả thành phần sản phẩm"
          name="detail_component"
          required={false}
          rules={[{ required: true, message: "Vui lòng nhập mô tả thành phần" }]}
        >
          <ReactQuill />
        </Form.Item>

        <Form.Item
          label="Mô tả công dụng"
          name="detail_benifit"
          required={false}
          rules={[{ required: true, message: "Vui lòng nhập mô tả công dụng" }]}
        >
          <ReactQuill />
        </Form.Item>

        <Form.Item
          label="Tác dụng phụ"
          name="detail_side_effects"
          required={false}
          rules={[{ required: true, message: "Vui lòng nhập tác dụng phụ" }]}
        >
          <ReactQuill />
        </Form.Item>

        <Form.Item
          label="Lưu ý"
          name="detail_notes"
          required={false}
          rules={[{ required: true, message: "Vui lòng nhập lưu ý" }]}
        >
          <ReactQuill />
        </Form.Item>

        <Form.Item
          label="Bảo quản"
          name="detail_storage"
          required={false}
          rules={[{ required: true, message: "Vui lòng nhập hướng dẫn bảo quản" }]}
        >
          <ReactQuill />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Tạo sản phẩm
          </Button>
        </Form.Item>
      </Form>

      <Image
        wrapperStyle={{ display: "none" }}
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
          afterOpenChange: (visible) => !visible && setPreviewImage(""),
        }}
        src={previewImage}
      />
    </div>
  );
}

export default CreateProduct;
