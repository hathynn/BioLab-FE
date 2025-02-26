import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
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
import TextArea from "antd/es/input/TextArea";
import { ADMIN_ROUTES } from "../../../../constants/routes";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function CreateProduct() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [unit, setUnit] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [note, setNote] = useState("");
  const [_titles] = useState<string[]>([]);
  const [_contents] = useState<string[]>([]);
  const [details, setDetails] = useState([
    { title: "Mô tả sản phẩm", content: "" },
    { title: "Thành phần", content: "" },
    { title: "Công dụng", content: "" },
    { title: "Tác dụng phụ", content: "" },
    { title: "Lưu ý", content: "" },
    { title: "Bảo quản", content: "" },
  ]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const nav = useNavigate();
  // const reactQuillRef = useRef<ReactQuill>(null);
  // const handleChange = (content: string) => {
  //   setValue(content);
  // };
  // const fixedHtml = serialize(dom);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const { getCategories } = useCategoryService();
  const { getBrands } = useBrandService();
  const { createProduct } = useProductService();
  // const handleTitleChange = (index: number, placeholder: string) => {
  //   setTitles((prevTitles) => {
  //     const updatedTitles = [...prevTitles];
  //     updatedTitles[index] = placeholder; // Lưu giá trị theo placeholder
  //     return updatedTitles;
  //   });
  // };

  // const handleContentChange = (index: number, newValue: string) => {
  //   setContents((prevContents) => {
  //     const updatedContents = [...prevContents];
  //     updatedContents[index] = newValue;
  //     return updatedContents;
  //   });
  // };

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

  const handleCreateProduct = async () => {
    if (
      !name.trim() ||
      !note.trim() ||
      !description.trim() ||
      price <= 0 ||
      stock < 0 ||
      !selectedCategory ||
      !selectedBrand ||
      !unit ||
      imageUrls.length === 0
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const categoryData = JSON.parse(selectedCategory);
    const brandData = JSON.parse(selectedBrand);
    const productData = {
      name,
      note,
      description,
      categoryId: categoryData.id,
      categoryName: categoryData.name,
      imageUrls: imageUrls,
      brandId: brandData.id,
      brandName: brandData.name,
      brandImageUrl: brandData.img,
      unit,
      price,
      stock,
      details, // Danh sách thông tin sản phẩm
    };

    console.log("Product", productData);

    try {
      const response = await createProduct(productData);
      console.log("Sản phẩm được tạo:", response);
      alert("Tạo sản phẩm thành công!");
      nav(`admin/${ADMIN_ROUTES.PRODUCT}`);
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error);
      alert("Tạo sản phẩm thất bại!");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

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
      await deleteImageFromFirebase(file.url); // Xoá ảnh trên Firebase
      setImageUrls((prevUrls) => prevUrls.filter((url) => url !== file.url)); // Cập nhật state
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

  const handleUpload: UploadProps["onChange"] = async (info) => {
    const file = info.file.originFileObj as File;
    if (!file) return;

    try {
      const imageUrl = await uploadImageToFirebase(file);
      console.log("Ảnh mới:", imageUrl);

      const newFile: UploadFile = {
        uid: info.file.uid,
        name: info.file.name,
        status: "done",
        url: imageUrl,
      };

      setFileList((prev) => [...prev, newFile]);
      setImageUrls((prev) => [...prev, imageUrl]);
    } catch (error) {
      console.error(error);
    }
  };

  // const uploadProps: UploadProps = {
  //   beforeUpload: (file) => {
  //     if (!file.type.startsWith("image/")) {
  //       console.error("Chỉ được phép tải lên file hình ảnh!");
  //       return Upload.LIST_IGNORE;
  //     }
  //     return true;
  //   },
  //   onChange: handleUpload,
  //   onRemove: handleRemove,
  // };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Tạo sản phẩm</h2>

      <input
        type="text"
        placeholder="Tên"
        className="border p-2 rounded-md w-full mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="w-full flex justify-between">
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-[33%] border p-2 rounded-md mb-4"
        >
          <option value="">Chọn đơn vị</option>
          <option value="Hộp">Hộp</option>
          <option value="Vỉ">Vỉ</option>
          <option value="Tuýp">Tuýp</option>
        </select>

        <input
          type="number"
          placeholder="Giá"
          className="w-[33%] border p-2 rounded-md  mb-4"
          value={price === 0 ? "" : price}
          onChange={(e) => setPrice(Number(e.target.value) || 0)}
        />
        <input
          type="number"
          placeholder="Số lượng"
          className="w-[33%] border p-2 rounded-md  mb-4"
          value={stock === 0 ? "" : stock}
          onChange={(e) => setStock(Number(e.target.value) || 0)}
        />
      </div>
      <input
        type="text"
        placeholder="Mô tả ngắn sản phẩm"
        className="border p-2 rounded-md w-full mb-4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex w-full justify-between">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-[49.5%] border p-2 rounded-md mb-4"
        >
          <option value="">Chọn danh mục</option>
          {categories?.map((category) => (
            <option
              key={category?._id}
              value={JSON.stringify({
                id: category?._id,
                name: category?.category_name,
              })}
            >
              {category?.category_name}
            </option>
          ))}
        </select>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-[49.5%] border p-2 rounded-md  mb-4"
        >
          <option value="">Chọn thương hiệu</option>
          {brands?.map((brand) => (
            <option
              key={brand._id}
              value={JSON.stringify({
                id: brand._id,
                name: brand?.brand_name,
                img: brand?.image_url,
              })}
            >
              {brand?.brand_name}
            </option>
          ))}
        </select>
      </div>
      <h2 className="text-lg font-semibold mb-4">Thông tin chi tiết</h2>
      {details.map((detail, index) => (
        <div key={index}>
          <h2 className="text-base font-semibold mb-4">{detail?.title}</h2>
          <ReactQuill
            theme="snow"
            placeholder={`Nhập ${detail?.title.toLowerCase()}...`}
            value={detail?.content}
            onChange={(value) => {
              const newDetails = [...details];
              newDetails[index].content = value;
              setDetails(newDetails);
            }}
            className="mb-4"
          />
        </div>
      ))}

      <h2 className="text-lg font-semibold mb-4">Ghi chú</h2>
      <TextArea
        rows={4}
        placeholder="maxLength is 100"
        maxLength={100}
        className="mb-4"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <h2 className="text-lg font-semibold mb-4">Hình ảnh</h2>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleUpload}
        onRemove={handleRemove}
      >
        {fileList.length < 8 && uploadButton}
      </Upload>

      <Image
        wrapperStyle={{ display: "none" }}
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
          afterOpenChange: (visible) => !visible && setPreviewImage(""),
        }}
        src={previewImage}
      />

      <div className="flex justify-between">
        <button
          onClick={() => nav("/admin/product")}
          className="my-5 px-6 py-3 text-black rounded-lg border hover:bg-green-500 hover:text-white"
        >
          Quay lại
        </button>
        <button
          onClick={handleCreateProduct}
          className="my-5 px-6 py-3 bg-customGreen text-white rounded-lg  hover:bg-green-500"
        >
          Tạo sản phẩm
        </button>
      </div>
    </div>
  );
}

export default CreateProduct;
