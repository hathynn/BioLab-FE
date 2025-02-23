import { Flex, Tag } from "antd";
import { useState } from "react";
import "./index.scss";

function ListMedia() {
  return (
    <div className="flex flex-col  lg:flex-row justify-center items-start gap-4">
      <img
        src="https://s3-alpha-sig.figma.com/img/646d/1797/a009f5a12690b71cb92c1c37579cba68?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=D523hgvPtZL9JrcY2AEjUdHTTdGCiDq9hVRqOJGEGxMxLgHXFg7Mbxa9S8FwnH85CgY-81TFQ8P2e3xjEGv~yJcJTO4EbIoum0NLHokSHyX9Tmgc1pe4g17CBJvnjMUvZ4EteBQUP~FvUbJgPy~C8Vv5C87h7B-q73j3OvTAD6PMdL-WBhFFZZ0zFh2TNoadWjDqHwLgRpnh7C280zJ~JjbepxOTAuEnsrcvTu4Mpb02sKUUiL1H~eyyZWdyRd54ib2ry4qfKIVFeUmpIRa-xQ1zZYzqxPUXX0ZId3F1uBvK50jJag8FOoyUf4jlMTE1F2MEzN5gnEb3CqIh9-A9dg__"
        className="w-full lg:w-2/5 rounded-lg min-h-[105px] object-cover"
      />

      <div className="w-[160px] mt-2 flex flex-col justify-center items-start gap-2">
        <div className="bg-[#EFEFEF] text-[#6F6F6F] text-xs font-semibold max-w-fit p-1 px-2 rounded-full ">
          Truyền thông
        </div>
        <h1 className="text-sm font-bold  line-clamp-2">
          Viên uống LéAna Ocavill hỗ trợ cân bằng nội tiết tố (60 viên).
        </h1>
      </div>
    </div>
  );
}
interface MediaInfoCardProps {
  tags?: boolean; // Define the prop type for `tags` (optional boolean)
}

function MediaInfoCard({ tags }: MediaInfoCardProps) {
  const tagsData = [
    "Dinh dưỡng",
    "Mẹ và bé",
    "Người cao tuổi",
    "Khoẻ đẹp",
    "Tin tức sức khoẻ",
  ];
  const [selectedTags, setSelectedTags] = useState<string[]>([""]);
  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };
  return (
    <div>
      {tags == true && (
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
      )}
      <div className="p-5 bg-white rounded-2xl flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-3/5">
          <div>
            <img
              src="https://s3-alpha-sig.figma.com/img/8009/711d/ee338228e49f8a5b89ed6718acb91e58?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NLG6vrwH2NNENRi7AcqtSLn9LMDykWT2DSmjHM9k2TyHz~mx9ttXAQCpkkQjQcDDV9uj3VX2YKK29nMUKq4q7ImH8snqkmcIbcjHFUQP6GTW5Xa0tSe504VCrIi70hWlwhJ1RNFY-XBPafZZrxURphDLfEJ5yV-d4rid~u9WfeLK0uwm-rLPayjYdSabPUq2wzlGbCcvfbADkueiXyToPAQB4y8LlnH9yAlHJVQPklheT7EYO2gD3JFvIUC8U7s~bhkVBYy~vQ6l0Efa3gmZdIwsOX9H70iJuz6Ya~BgGc-emmufO8hcfgUerQlgFyQEoMSz0aT70OEPcV5~mg0z0A__"
              className="rounded-lg"
            />
            <div className="bg-[#EFEFEF] text-[#6F6F6F] text-xs max-w-fit p-1 px-2 font-semibold rounded-full my-3">
              Truyền thông
            </div>
            <h1 className="text-2xl font-semibold text-[#3D3D3D]">
              Bảo vệ sức khoẻ của chính bạn
            </h1>
          </div>
        </div>
        <div className="w-[300px] lg:w-1/3 lg:h-[400px] flex flex-row lg:flex-col gap-2 lg:overflow-y-auto overflow-x-auto">
          <ListMedia/>
          <ListMedia />
          <ListMedia />
          <ListMedia />
          <ListMedia />
          <ListMedia />
        </div>
      </div>
    </div>
  );
}

export default MediaInfoCard;
