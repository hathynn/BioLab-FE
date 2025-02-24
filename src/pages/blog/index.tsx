import MediaInfoCard from "../../components/mediaInfoCard";
import { Flex, Tabs, TabsProps, Tag } from "antd";
import { CiSearch } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import "./index.scss";
import { useEffect, useState } from "react";
import usePostCategoryService from "../../services/usePostCategoryService";
import { PostCategoryType } from "../../types/postCategory.type";
import usePostService from "../../services/usePostService";

import moment from "moment";
import { PostType } from "../../types/post.type";
import { Link, useNavigate } from "react-router-dom";

function MiniBlog({ post }: { post: PostType }) {
  const nav=useNavigate();
  const categoryName =
    post.category?.length > 0
      ? post.category.map((cat) => cat.post_category_name).join(", ")
      : "Chưa phân loại";

  const formattedDate = post.created_date
    ? moment(post.created_date).format("DD/MM/YYYY")
    : "N/A";

  return (
   <div onClick={() => nav(`/blog/${post._id}`)} className="flex justify-center items-start gap-4 border-b pb-5">
      <div className="flex flex-col justify-center items-start gap-3 w-3/4">
        <div className="flex justify-center items-center gap-4">
          <div className="bg-[#F2F2F2] px-3 py-1 rounded-[10px] text-sm font-light">
            {categoryName}
          </div>

          <p className="text-[#757575] text-sm">Selected for you</p>
        </div>

        <h1 className="text-[#191919] text-[22px] font-normal">
          {post?.title}
        </h1>
        <p className="text-[#757575] text-sm font-light">{formattedDate}</p>
      </div>

      <div className="w-1/4 h-[140px]">
        <img
          className="rounded-lg h-full object-cover"
          src={post?.banner}
          alt={post?.title}
        />
      </div>
    </div>
   
  );
}

function Blog() {
  const { getCategories } = usePostCategoryService();
  const { getPosts } = usePostService();
  const [categories, setCategories] = useState<PostCategoryType[]>([]);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);


  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục bài viết:", error);
    }
  };

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

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  // Lọc bài viết theo danh mục đã chọn
  const filteredPosts = selectedTags.length
  ? posts.filter((post) =>
      post.category?.some((cat) => selectedTags.includes(cat._id))
    )
  : posts;


  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

  const menu: TabsProps["items"] = [
    {
      label: `Recommended`,
      key: "1",
      children: (
        <div className="flex flex-col justify-center items-start gap-5">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            filteredPosts.map((post) => <MiniBlog key={post._id} post={post} />)
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="px-5 blog">
      <MediaInfoCard />
      <div className="p-5 flex flex-col lg:flex-row justify-between items-start gap-4">
        <div className="w-full lg:w-3/5">
          <Tabs items={menu} className="w-full" />
        </div>
        <div className="w-full lg:w-1/4 flex flex-col justify-start items-start gap-4">
          <div className="relative w-full">
            <i className="absolute left-4 top-5 transform -translate-y-1/2">
              <CiSearch className="text-xl text-gray-800" />
            </i>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full px-10 py-2 rounded-full text-black border border-[#E6E6E6CC]"
            />
          </div>
          <div className="flex justify-center items-center gap-1">
            <GoDotFill size={18} color="#1A8917" />
            <h3 className="font-semibold text-[16px]">
              What We’re Reading Today
            </h3>
          </div>
          <div className="blog__tag">
            <Flex gap={3} wrap align="center" className="type-media">
              {categories.map((tag) => (
                <Tag.CheckableTag
                  key={tag._id}
                  checked={selectedTags.includes(tag._id)}
                  onChange={(checked) => handleChange(tag._id, checked)}
                >
                  {tag.post_category_name}
                </Tag.CheckableTag>
              ))}
            </Flex>
            <p className="text-[#1A8917] text-sm font-light">
              See the full list
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
