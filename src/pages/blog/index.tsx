import MediaInfoCard from "../../components/mediaInfoCard";
import { Flex, Tabs, TabsProps, Tag } from "antd";
import { CiSearch } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import "./index.scss";
import { useState } from "react";
function ListTopic() {
  return (
    <div className="flex justify-center items-start gap-4 h-[65px]">
      <img
        src="https://s3-alpha-sig.figma.com/img/4c81/3a4c/51d8108e0a9edaa3d6a1fde795b3f1ac?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YOcvyHI26b48IiMS6b8wNRwrflhymo5ZpLVhtC8nIgACqweBqGXES~MH8W~954HXKd4E7Yy2QkI4HsHRKPT3mA2-3K~gf8MxUkbMtysRB~uvbFdm0yfWm2E6VOMUWsrgtvUQOK1PaXNoHazeDKZWuIIdOTyLc-I9UVgb1FJxq~~mZU1MsTcX60bud~UVOS0pl6oHNOnphvqVRMR7anc41fyaqr6kC3C96QsjCUgV338iBmFJc-ChBCIm2rR~I6kATG2c69b6a-g5DSrls7cpG2zYO9tVCHQe45gNZh7Tn2A4wX1WQyCeH4ahmsS195MUse-8S3lsi7cZRFxyoaB6vQ__"
        className="w-2/5 rounded-lg h-full object-cover"
      />

      <div className="mt-2 flex flex-col justify-center items-start gap-2">
        <h1 className="text-sm font-bold  line-clamp-2">
          Viên uống LéAna Ocavill hỗ trợ cân bằng nội tiết tố (60 viên).
        </h1>
      </div>
    </div>
  );
}

function MiniBlog() {
  return (
    <div className="flex justify-center items-start gap-4 border-b pb-5  ">
      <div className="flex flex-col justify-center items-start gap-3 w-3/4">
        <div className="flex justify-center items-center gap-4 ">
          <div className="bg-[#F2F2F2] px-3 py-1 rounded-[10px] text-sm font-light">
            Mẹ và bé
          </div>
          <p className="text-[#757575] text-sm">3 min read</p>
          <p className="text-[#757575] text-sm">Selected for you</p>
        </div>
        <h1 className="text-[#191919] text-[22px] font-normal">
          Mẹ đang cho con bú uống collagen được không?
        </h1>
        <p className="text-[#292929] text-[16px]">
          Khi mới trở thành mẹ, bạn có thể băn khoăn về việc liệu có thể bổ sung
          collagen trong thời gian cho con bú hay không. Sự chăm sóc sức khỏe và
          làm đẹp bản thân trong giai đoạn này có thể gặp nhiều thách thức, và
          câu hỏi “mẹ đang cho con bú uống collagen được không?”...
        </p>
        <p className="text-[#757575] text-sm font-light">4 days ago</p>
      </div>
      <div className="w-1/4 h-[140px] ">
        <img
          className="rounded-lg h-full object-cover"
          src="https://s3-alpha-sig.figma.com/img/b24e/d6b4/3baa0caeaa29aaab596c684ab438ac20?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=t72kRf6FaZadqWuzYbZeo4bBk27FixJ6EWeHYoXekwSh50vDLWOHDoroFODnt7LcAY5QoVxTlcszYVJmKdSr9LXKx1ard0AwzDJfPRblhGNxgI8SYGH85sZE6RIVQvPidiRKXPSDpNfRDEYbjattk4xARaNT-o9vKcPFgx3PdPz9yUebRtq-Ehty2MeEHiMfisplaeydWKvABrP~wyvaouoxGkT57VryxF0-bBDYf1tkz2XQ5IALkR15-poo5dfGQR2DLQKcV-MdqMlhMlMLDaYCnBbiBHbhr0ZtiV1~VkD8xkb2tV6w0p68sYzHN8OWHAOP-bRQ0sGDt9OvY8GGPQ__"
        />
      </div>
    </div>
  );
}
function Blog() {
  const tagsData = [
    "Sắc đẹp",
    "Mẹ và bé",
    "Thần kinh",
    "Xương khớp",
    "Mắt",
    "Tim mạch",
    "Hô hấp",
  ];
  const [selectedTags, setSelectedTags] = useState<string[]>([""]);
  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };
  const menu: TabsProps["items"] = [
    {
      label: `Following`,
      key: "1",
      children: <></>,
    },
    {
      label: `Recommended`,
      key: "2",
      children: (
        <div className="flex flex-col justify-center items-start gap-5">
          <MiniBlog />
          <MiniBlog />
        </div>
      ),
    },
  ];
  return (
    <div className="px-5 blog">
      <MediaInfoCard />
      <div className="p-5 flex flex-col lg:flex-row justify-between items-start gap-4">
        <div className="w-full lg:w-3/5">
          <Tabs
            // tabPosition={"left"}
            items={menu}
            className="w-full"
          />
        </div>
        <div className="w-full lg:w-1/4 flex flex-col justify-start items-start gap-4">
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
          <div className="flex flex-col justify-center items-center gap-5">
            <ListTopic />
            <ListTopic />
            <ListTopic />
          </div>
          <div className="blog__tag">
            <Flex gap={3} wrap align="center" className="type-media">
              {tagsData.map<React.ReactNode>((tag) => (
                <Tag.CheckableTag
                  key={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={(checked) => handleChange(tag, checked)}
                >
                  {tag}
                </Tag.CheckableTag>
              ))}
            </Flex>
            <p className="text-[#1A8917] text-sm font-light">
              See the full list
            </p>
            <h3 className="text-[16px] py-5">Recommended Topic</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
