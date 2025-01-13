import { Flex, Tag } from "antd";
import { useState } from "react";
import "./index.scss";

function ListMedia() {
  return (
    <div className="flex justify-start items-start gap-4">
      <img
        src="https://s3-alpha-sig.figma.com/img/5283/bf9a/b4ee6a05da5b8c41d80ebd301b4e9bfb?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YagJSS0cpw5dLfYhCxYYeVR4IcdJhAWclrYwX5JJxoR2TMCRU8vduIRmXzgTCuupEuKnThjOexVf9oAe3uSelhkmcgMkuL2kRanRK3~g4c5F9-3qrNQGH25nGjRXMB2YGBlnf7sGsLhaZRuGSEc8AEXqvPJFza3Ilooke6fsZ7XbnG6EowzsSHd~oRih0LRnzKZaa5jTJK4rKmdPNvO4h7j8ITzQiaGmp7Fdc2TaNPStWzftR4zvxoW8kMVZIjBPn1ctO~abRQE2Ug3bTQHfVP-haQMQVPzOkCkgKJL0HQDbv6leOrWZ3GHjptMsl-ynZTf1Vp-k-t1Hz3Ixn8MZ3A__"
        className="w-2/5 rounded-lg min-h-[105px] object-cover"
      />
      <div className="mt-2 flex flex-col gap-2">
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

function MediaInfoCard() {
  const tagsData = [
    "Dinh dưỡng",
    "Mẹ và bé",
    "Người cao tuổi",
    "Khoẻ đẹp",
    "Tin tức sức khoẻ",
  ];
  const [selectedTags, setSelectedTags] = useState<string[]>(["Movies"]);
  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };
  return (
    <div>
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
      <div className="p-5 bg-white rounded-2xl flex gap-5">
        <div className="w-3/5">
          <div>
            <img
              src="https://s3-alpha-sig.figma.com/img/8009/711d/ee338228e49f8a5b89ed6718acb91e58?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HZxgmwHEuZUt804if2Nh54ER-wgL4bLOnDf--FaN2uenUHDRQavAhdSLmRm6I-9RZWNBS8z76ZZcVEGL8sObopBe~4xCQ-bJurPLMr1htMrh9OHXr2JQT7ZVKPM1ywTNcP5lUJLjW6qOLERJKvW207hrOZEt-riifcTgIndS2k9pgE4Wr2vSDrxbCMYitKEuZ7tDJtZUGdhwWUFCOdq7uUfZrNgQbeyjjqEBfwBhh6WGv5zK3hQMKIKxmbR15GdwNKPUM0MHXsC3HEG~F1NMrD-04PRTz3CG9KesKNxlXxgQ5UdJADirJFhvScLQiF~KqcQIJ-Lm0lYmndsrExH2dw__"
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
        <div className="w-1/3 flex flex-col gap-2">
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
