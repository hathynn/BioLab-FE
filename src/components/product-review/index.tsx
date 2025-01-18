import { Rate, Progress, List, Avatar } from "antd";
import { FaStar } from "react-icons/fa";

const ProductReviews = () => {
  const reviews = [
    {
      name: "Nguyễn Văn A",
      date: "6 ngày trước",
      content:
        "Dịch vụ hỗ trợ khách hàng chu đáo, sản phẩm giao nhanh và đóng gói cẩn thận. Không có gì phải chê!",
      rating: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2iqyMqdAIPBS2vChoaUqsZVySKikkgrAnng&s",
    },
    {
      name: "Nguyễn Văn A",
      date: "6 ngày trước",
      content:
        "Mình đã thử nhiều sản phẩm trước đây nhưng sản phẩm này thực sự đặc biệt, đúng như quảng cáo!",
      rating: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2iqyMqdAIPBS2vChoaUqsZVySKikkgrAnng&s",
    },
    {
      name: "Nguyễn Văn A",
      date: "6 ngày trước",
      content:
        "Sản phẩm này vượt qua kỳ vọng của mình. Rất hài lòng và sẽ giới thiệu cho bạn bè.",
      rating: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2iqyMqdAIPBS2vChoaUqsZVySKikkgrAnng&s",
    },
    {
      name: "Nguyễn Văn A",
      date: "6 ngày trước",
      content: "Một trải nghiệm dịch vụ tuyệt vời",
      rating: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2iqyMqdAIPBS2vChoaUqsZVySKikkgrAnng&s",
    },
  ];

  return (
    <div className="w-full">
      <h1 className="text-xl font-bold mb-4">Đánh giá sản phẩm (5 đánh giá)</h1>
      <div className="flex mt-6 ">
        <div>
          <h1 className="font-bold text-sm mb-4">Trung bình </h1>
          <div className=" flex mr-8">
            <div className="text-5xl font-bold">4.8</div>
            <FaStar className="text-starColor" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center">
            <Rate className="text-starColor text-sm" disabled defaultValue={5} />
            <Progress
              percent={(4 / 5) * 100}
              showInfo={false}
              strokeColor="#FAAD14"
              className="ml-2 w-60"
            />
            <span className="ml-2 font-bold text-sm">4</span>
          </div>
          <div className="flex items-center">
            <Rate className="text-starColor text-sm" disabled defaultValue={4} />
            <Progress
              percent={(1 / 5) * 100}
              showInfo={false}
              strokeColor="#FAAD14"
              className="ml-2 w-60"
            />
            <span className="ml-2 font-bold text-sm">1</span>
          </div>
          <div className="flex items-center">
            <Rate className="text-starColor text-sm" disabled defaultValue={3} />
            <Progress
              percent={0}
              showInfo={false}
              strokeColor="#FAAD14"
              className="ml-2 w-60"
            />
            <span className="ml-2 font-bold text-sm">0</span>
          </div>
          <div className="flex items-center">
            <Rate className="text-starColor text-sm" disabled defaultValue={2} />
            <Progress
              percent={0}
              showInfo={false}
              strokeColor="#FAAD14"
              className="ml-2 w-60"
            />
            <span className="ml-2 font-bold text-sm">0</span>
          </div>
          <div className="flex items-center">
            <Rate className="text-starColor text-sm" disabled defaultValue={1} />
            <Progress
              percent={0}
              showInfo={false}
              strokeColor="#FAAD14"
              className="ml-2 w-60"
            />
            <span className="ml-2 font-bold text-sm">0</span>
          </div>
        </div>
      </div>

      <List
        className="mt-8"
        itemLayout="horizontal"
        dataSource={reviews}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              title={
                <div className="flex justify-between">
                  <span className="font-bold">{item.name}</span>{" "}
                  <span className="text-gray-500">{item.date}</span>
                </div>
              }
              description={
                <div>
                  <Rate
                    disabled
                    defaultValue={item.rating}
                    className="mb-2 text-starColor text-sm"
                  />
                  <p className="text-black">{item.content}</p>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProductReviews;
