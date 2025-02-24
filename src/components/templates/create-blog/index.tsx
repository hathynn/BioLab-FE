import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UploadOutlined } from "@ant-design/icons";

import "./index.scss";
import {
  Button,
  Select,
  SelectProps,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import {
  deleteImageFromFirebase,
  uploadImageToFirebase,
} from "../../../utils/uploadImageHandler";
import { PostCategoryType } from "../../../types/postCategory.type";
import usePostCategoryService from "../../../services/usePostCategoryService";
import usePostService from "../../../services/usePostService";
import { toast } from "react-toastify";

function CreateBlog() {
  const [value, setValue] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<PostCategoryType[]>(
    []
  );
  const [banner, setBanner] = useState("");
  const [_categories, setCategories] = useState<PostCategoryType[]>([]);
  const reactQuillRef = useRef<ReactQuill>(null);
  const { getCategories, getCategoryById } = usePostCategoryService();
  const { createPost } = usePostService();
  const [options, setOptions] = useState<SelectProps["options"]>([]);

  const handleChange = (content: string) => {
    setValue(content);
  };

  const handleCategoriesChange = async (value: string[]) => {
    const cates: PostCategoryType[] = await Promise.all(
      value.map(async (item) => {
        const category: PostCategoryType = await getCategoryById(item);
        return {
          _id: item,
          post_category_name: category.post_category_name,
        };
      })
    );

    setSelectedCategory(cates);
  };

  const fetch = async () => {
    try {
      const response = await getCategories();
      const safeResponse: PostCategoryType[] = response ?? [];
      setCategories(safeResponse);

      const newOptions = safeResponse.map((cate) => ({
        label: cate.post_category_name,
        value: cate._id,
      }));

      setOptions((prevOptions = []) => [...(prevOptions ?? []), ...newOptions]);
    } catch (error) {
      console.log(error);
    }
  };

  // const fixedHtml = serialize(dom);

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
      const imageUrl = await uploadImageToFirebase(file, "posts");
      setBanner(imageUrl);
      setFileList([
        ...fileList,
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

  const handleCreatePost = async () => {
    try {
      await createPost(title, selectedCategory, value, banner);
      toast.success("Đăng bài thành công!");
      fetch();
    } catch (error) {
      toast.error("Đã xảy ra lỗi!");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="mt-10">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tiêu đề"
        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 mb-4"
      />
      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        placeholder="Start writing..."
        modules={{
          toolbar: {
            container: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["image"],
            ],
          },
          clipboard: {
            matchVisual: false,
          },
        }}
        formats={[
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
        ]}
        value={value}
        onChange={handleChange}
      />
      <h2 className="text-sm font-semibold my-4">Danh mục</h2>
      <Select
        onChange={handleCategoriesChange}
        placeholder="Chọn danh mục"
        mode="multiple"
        style={{ width: "9.5rem" }}
        options={options}
        allowClear
      ></Select>
      <h2 className="text-sm font-semibold my-4">Ảnh bìa</h2>
      <Upload {...uploadProps} fileList={fileList}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>

      <button
        onClick={() => handleCreatePost()}
        className="mt-4 px-4 py-2 border hover:bg-customGreen hover:text-white text-gray-500 font-semibold text-base rounded-lg"
      >
        Đăng bài
      </button>

      {/* <div dangerouslySetInnerHTML={{ __html: fixedHtml }} /> */}
    </div>
  );
}

export default CreateBlog;
