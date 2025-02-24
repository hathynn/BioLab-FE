
import { useEffect, useState } from "react";
import "./index.scss";
import usePostService from "../../services/usePostService";
import { PostType } from "../../types/post.type";
import { useNavigate } from "react-router-dom";

function ListMedia({ posts }: { posts: PostType[] }) {
  return (
    <div className="w-[300px] lg:w-1/3 lg:h-[400px] flex flex-row lg:flex-col gap-2 lg:overflow-y-auto overflow-x-auto">
      {posts.map((post) => {
        const categoryName = post.category?.length
          ? post.category.map((cat) => cat.post_category_name).join(", ")
          : "Chưa phân loại";

        return (
          <div
            key={post._id || post._id} 
            className="flex flex-col lg:flex-row justify-center items-start gap-4"
          >
            <img
              src={post.banner}
              alt={post.title}
              className="w-full lg:w-2/5 rounded-lg min-h-[105px] object-cover"
            />
            <div className="w-[160px] mt-2 flex flex-col justify-center items-start gap-2">
              <div className="bg-[#EFEFEF] text-[#6F6F6F] text-xs font-semibold max-w-fit p-1 px-2 rounded-full">
                {categoryName}
              </div>
              <h1 className="text-sm font-bold line-clamp-2">{post.title}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}


// interface MediaInfoCardProps {
//   tags?: boolean;
// }

function MediaInfoCard() {
  const { getPosts } = usePostService();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
const nav = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await getPosts();
        setPosts(response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bài viết:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) return <div>Đang tải...</div>;
  if (!posts.length) return <div>Không có bài viết nào</div>;


  const firstPost = posts[0];
  const otherPosts = posts.slice(1);

  const firstCategoryName = firstPost.category?.length
    ? firstPost.category.map((cat) => cat.post_category_name).join(", ")
    : "Chưa phân loại";

  return (
    <div>
      <div onClick={() => nav(`/blog/${firstPost._id}`)} className="p-5 bg-white rounded-2xl flex flex-col lg:flex-row gap-5">
       
        <div className="w-full lg:w-3/5">
          <img
            src={firstPost.banner}
            alt={firstPost.title}
            className="rounded-lg"
          />
          <div className="bg-[#EFEFEF] text-[#6F6F6F] text-xs max-w-fit p-1 px-2 font-semibold rounded-full my-3">
            {firstCategoryName}
          </div>
          <h1 className="text-2xl font-semibold text-[#3D3D3D]">
            {firstPost.title}
          </h1>
        </div>

        <ListMedia posts={otherPosts} />
      </div>
    </div>
  );
}

export default MediaInfoCard;

