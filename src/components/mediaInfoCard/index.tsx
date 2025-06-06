import { useEffect, useState } from "react";
import "./index.scss";
import usePostService from "../../services/usePostService";
import { PostType } from "../../types/post.type";
import { useNavigate } from "react-router-dom";
import empty from "../../assets/box.png";
import { Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
function ListMedia({ posts }: { posts: PostType[] }) {
  const nav = useNavigate();
  return (
    <div className="cursor-pointer w-[300px] lg:w-1/3 lg:h-[435px] flex flex-row lg:flex-col gap-2 lg:overflow-y-auto overflow-x-auto">
      {posts.map((post) => {
        const categoryName = post?.category?.length
          ? post?.category?.map((cat) => cat?.post_category_name).join(", ")
          : "Chưa phân loại";

        return (
          <div
            onClick={() => nav(`/blog/${post._id}`)}
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

  const testPosts = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await getPosts(),
  });

 
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

  if (isLoading)
    return (
      <div className="p-5 rounded-2xl flex flex-col lg:flex-row gap-5">
        <Skeleton.Image
          active={true}
          style={{ width: 750, height: 400 }}
          className="w-3/4"
        />

        <div className="flex flex-col items-cent w-1/4 gap-4">
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
      </div>
    );
  if (!posts?.length)
    return (
      <div className="flex justify-center items-center h-96 p-6">
        <img src={empty} className="h-48 " />
      </div>
    );

  const firstPost = posts[0];
  const otherPosts = posts.slice(1);

  const firstCategoryName = firstPost.category?.length
    ? firstPost.category.map((cat) => cat.post_category_name).join(", ")
    : "Chưa phân loại";

  return (
    <div>
      <div
        onClick={() => nav(`/blog/${firstPost._id}`)}
        className="p-5 bg-white rounded-2xl flex flex-col lg:flex-row gap-5"
      >
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
