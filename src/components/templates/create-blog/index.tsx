import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "./index.scss";

function CreateBlog() {
  const [content, setContent] = useState<string>("");
  const [value, setValue] = useState("");
  const reactQuillRef = useRef<ReactQuill>(null);


  // // Hàm upload ảnh
  // const uploadImage = async (file: File): Promise<string | null> => {
  //   const formData = new FormData();
  //   formData.append("image", file);

  //   try {
  //     const response = await axios.post("", formData);
  //     // return response.data.data.url;
  //     return "https://firebasestorage.googleapis.com/v0/b/daihoicongdoanvienchuc-48718.appspot.com/o/biolab%2F1.png?alt=media&token=26d30cdf-591e-4b6f-b6b9-f25d8fe36c4e";
  //   } catch (error) {
  //     console.error("Upload failed:", error);
  //     return null;
  //   }
  // };

  // // Custom Image Handler
  // const imageHandler = () => {
  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();

  //   input.onchange = async () => {
  //     const file = input.files?.[0];
  //     if (file) {
  //       const imageUrl = await uploadImage(file);
  //       if (imageUrl && quillRef.current) {
  //         const editor = quillRef.current.getEditor();
  //         const range = editor.getSelection();
  //         editor.insertEmbed(range?.index || 0, "image", imageUrl);
  //       }
  //     }
  //   };
  // };


  return (
    <div className="mt-10">
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
              ["link", "image", "video"],
              ["code-block"],
              ["clean"],
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
          "video",
          "code-block",
        ]}
        value={value}
        onChange={setValue}
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
