import MediaInfoCard, { ListMedia } from "../../components/mediaInfoCard";
import { Tabs, TabsProps } from "antd";
import { CiSearch } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import "./index.scss";

function Blog() {
  const menu: TabsProps["items"] = [
    {
      label: `Following`,
      key: "1",
      children: <></>,
    },
    {
      label: `Recommended`,
      key: "2",
      children: `Content of Tab Thành phần`,
    },
  ];
  return (
    <div className="px-5 blog">
      <MediaInfoCard />
      <div className="p-5 flex justify-between items-start gap-4">
        <div className="w-3/5">
          <Tabs
            // tabPosition={"left"}
            items={menu}
            className="w-full"
          />
        </div>
        <div className="w-1/4 flex flex-col justify-start items-start gap-4">
          <div className="relative w-full">
            <i className="absolute left-4 top-5 transform -translate-y-1/2">
              <CiSearch className="text-xl text-gray-800" />
            </i>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full px-10 py-2 rounded-full text-black border border-[#E6E6E6CC] "
            />
          </div>
          <div className="flex justify-center items-center gap-1">
            <GoDotFill size={18} color="#1A8917" />
            <h3 className="font-semibold text-[16px]">
              What We’re Reading Today
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
