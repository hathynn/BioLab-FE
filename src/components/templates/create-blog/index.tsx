import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.scss";

function CreateBlog() {
  const [content, setContent] = useState("");
  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }], // Chỉ có H1, H2, H3
    ["bold", "italic", "underline"], // Các nút định dạng
    [{ list: "ordered" }, { list: "bullet" }], // Danh sách
    ["link"], // Chỉ giữ lại chèn link
    ["clean"], // Nút xóa định dạng
  ];

  return (
    <div className="mt-10">
      <ReactQuill
        value={content}
        onChange={setContent}
        theme="snow"
        modules={{ toolbar: toolbarOptions }}
        placeholder="Nhập vào đây..."
      />
      <button
        onClick={() => console.log(content)}
        className="mt-4 px-4 py-2 border hover:bg-customGreen hover:text-white text-gray-500 font-semibold text-base rounded-lg"
      >
        Đăng bài
      </button>
    </div>
  );
}

export default CreateBlog;
