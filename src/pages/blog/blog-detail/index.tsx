import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostType } from "../../../types/post.type";
import usePostService from "../../../services/usePostService";
import { Tag } from "antd";
// import he from "he";
import { parseDocument } from "htmlparser2";
import { default as serialize } from "dom-serializer";

function BlogDetail() {
  const { id } = useParams(); 
  const { getPostById } = usePostService(); 
  const [post, setPost] = useState<PostType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const htmlString = post?.post_contents || "";
  const dom = parseDocument(htmlString);
  const fixedHtml = serialize(dom); 
// const htmlString = post?.post_contents;
//   const dom = parseDocument(htmlString);
//   const fixedHtml = serialize(dom);

const fetchPost = async () => {
  if (!id) return;
  try {
    setIsLoading(true);
    const response = await getPostById(id); 
    console.log(response)
    setPost(response);
    console.log("Response", post)
  } catch (error) {
    console.error("Lỗi khi lấy bài viết:", error);
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {

    console.log("Nội dung từ API:", post?.post_contents);

    console.log("HTML đã xử lý:", fixedHtml);
    fetchPost();
  }, [id]);

  if (isLoading) return <div>Đang tải...</div>;
  if (!post) return <div>Không tìm thấy bài viết</div>;

  const categoryNames = post.category?.length
    ? post.category.map((cat) => cat.post_category_name).join(", ")
    : "Chưa phân loại";


  return (
    <div className="container mx-auto p-10 text-justify">
      <h1 className="text-3xl font-bold">{post?.title}</h1>
      <Tag className="text-gray-500 rounded-lg mt-4">Danh mục: {categoryNames}</Tag>
      <img src={post?.banner} alt={post?.title} className="w-full my-5 rounded-lg" />
      <div className="w-full h-auto overflow-visible">
  <div dangerouslySetInnerHTML={{ __html: fixedHtml || "" }} />
</div>

  
    </div>
  );
}

export default BlogDetail;
