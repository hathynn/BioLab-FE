import { useState } from "react";
import "./index.scss";
import { Breadcrumb, Carousel, Checkbox, ConfigProvider } from "antd";
import { BsHeart } from "react-icons/bs";
import RatingStars from "../../../components/rating-star";

const SOPDetail = () => {
  const [selectedPlan, setSelectedPlan] = useState("Hàng tháng, 3 tháng");
  const [selectedStartDate, setSelectedStartDate] = useState("Tháng 2, 2025");
  const [selectedProfile, setSelectedProfile] = useState("Tạo hồ sơ mới");
  const [autoRenew, setAutoRenew] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const products = [
    {
      id: 1,
      name: "Dung dịch vệ sinh mũi ION Muối",
      description: "Hỗ trợ sát khuẩn, kháng viêm, phòng ngừa sổ mũi (90ml)",
      price: "50.505đ",
      oldPrice: "60.000đ",
      quantity: "x1 Hộp",
      image: "https://phuocthien.net/photos/171121CH_dung-dich-ve-sinh-mui-ion-muoi-chai-90ml.png",
    },
    {
      id: 2,
      name: "Viên uống bổ sung Omega-3",
      description: "Hỗ trợ sức khỏe tim mạch, mắt và trí não (100 viên)",
      price: "150.000đ",
      oldPrice: "180.000đ",
      quantity: "x1 Lọ",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAS2OC9plzX8G25XXIGjlPjf636X16t4K7mQ&s",
    },
    {
      id: 3,
      name: "Vitamin C 500mg",
      description: "Tăng cường sức đề kháng, hỗ trợ hấp thu sắt (60 viên)",
      price: "90.000đ",
      oldPrice: "110.000đ",
      quantity: "x1 Lọ",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkFbskU_czX-pAiHTEGRhPEjRj7QpsKjORWw&s",
    },
  ];
  return (
    <>
      <Breadcrumb
        className="ml-12 mt-6 text-sm"
        items={[
          {
            title: <a href="/home">Trang chủ</a>,
          },
          {
            title: <a href="#">SOP</a>,
          },
          {
            title: <p className="font-bold">SOP chăm sóc sắc đẹp</p>,
          },
        ]}
      />
      <div className="detail-product ">
        <div className="p-4 mb-7">
          <div className="max-w-6xl mx-auto ">
            <div className="grid md:grid-cols-2  gap-6 p-6">
              <div className="flex flex-col justify-start items-center space-y-3">
                <div className="w-[70%]">
                  <Carousel arrows infinite={false} dots={true}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkFbskU_czX-pAiHTEGRhPEjRj7QpsKjORWw&s"
                      alt="Product"
                      className="rounded-lg w-full"
                    />

                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAS2OC9plzX8G25XXIGjlPjf636X16t4K7mQ&s"
                      alt="Product"
                      className="rounded-lg w-full"
                    />
                    <img
                      src="https://phuocthien.net/photos/171121CH_dung-dich-ve-sinh-mui-ion-muoi-chai-90ml.png"
                      alt="Product"
                      className="rounded-lg w-full"
                    />
                    <img
                      src="https://bizweb.dktcdn.net/100/011/344/products/omega3-a223b96b-88f8-45b6-9c0e-89c7db4cd048.jpg?v=1639712259133"
                      alt="Product"
                      className="rounded-lg w-full"
                    />
                  </Carousel>
                </div>
                <div className="flex space-x-2">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkFbskU_czX-pAiHTEGRhPEjRj7QpsKjORWw&s"
                    alt="Thumbnail 1"
                    className="rounded-lg w-32 h-32 object-cover"
                  />
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAS2OC9plzX8G25XXIGjlPjf636X16t4K7mQ&s"
                    alt="Thumbnail 2"
                    className="rounded-lg w-32 h-32 object-cover"
                  />
                  <img
                    src="https://phuocthien.net/photos/171121CH_dung-dich-ve-sinh-mui-ion-muoi-chai-90ml.png"
                    alt="Thumbnail 3"
                    className="rounded-lg w-32 h-32 object-cover"
                  />
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkFbskU_czX-pAiHTEGRhPEjRj7QpsKjORWw&s"
                    alt="Thumbnail 1"
                    className="rounded-lg w-32 h-32 object-cover"
                  />
                </div>
              </div>

              <div>
                <div className=" w-fit bg-customGreen text-xs text-white p-1 px-2 rounded-full mb-2">
                  SOP
                </div>
                <h1 className="text-2xl font-bold text-gray-800 uppercase">
                  sop chăm sóc sắc đẹp
                </h1>
                <div className="flex items-center space-x-2 mt-2">
                  <RatingStars rating={4} />
                  <span className="text-sm text-gray-600">(150 đánh giá)</span>
                  <div className="bg-gradient-to-r from-[#62D985] to-[#ABFFC5] text-xs text-white p-1 px-2 rounded-full">
                    Còn hàng
                  </div>
                </div>
                <div className="flex mt-4">
                  {" "}
                  <h1 className=" text-black font-bold text-xl">
                    2.200.000đ &nbsp;
                  </h1>
                  <h1 className="line-through font-semibold text-lg text-gray-400">
                    2.500.000đ
                  </h1>
                </div>

                <div className="text-sm my-5 pb-4 border-b">
                  <p
                    className={` text-justify   ${
                      isExpanded ? "" : "line-clamp-3"
                    }`}
                  >
                    Mua đơn hàng bao gồm các sản phẩm Artistry từ 2.000.000 VNĐ
                    trở lên mỗi tháng liên tục 3 tháng sẽ nhận được Quà tặng
                    cuối chu kỳ (Giá dành cho NPP: 781.000 VNĐ) vào tháng thứ 3,
                    bao gồm: 01 Sữa rửa mặt làm sạch tế bào da chết Artistry
                    Studio Cleanser + Exfoliator 01 Xịt khoáng bảo vệ da
                    Artistry Studio Refresher + Protector Face Mist.
                    <br />
                    <br />
                    Thời gian đăng ký tham gia chương trình: 01/01/2024 –
                    31/12/2024 <br />
                    Thời gian áp dụng chương trình: 01/01/2024 – 31/03/2025
                  </p>

                  <button
                    className="text-customGreen hover:underline mt-2"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? "Thu gọn" : "Xem thêm"}
                  </button>
                </div>

                <div className="space-y-4 mt-6">
                  <div className="flex items-start">
                    <p className="w-1/4 text-sm font-bold">Chu kỳ</p>
                    <div className="w-3/4 text-sm">
                      <select
                        value={selectedPlan}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="border p-2 rounded-md w-full"
                      >
                        <option value="Hàng tháng, 3 tháng">
                          Hàng tháng, 3 tháng
                        </option>
                        <option value="Hàng tháng, 6 tháng">
                          Hàng tháng, 6 tháng
                        </option>
                        <option value="Hàng tháng, 12 tháng">
                          Hàng tháng, 12 tháng
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <p className="w-1/4 text-sm font-bold">Bắt đầu</p>
                    <div className="w-3/4 text-sm">
                      <select
                        value={selectedStartDate}
                        onChange={(e) => setSelectedStartDate(e.target.value)}
                        className="border p-2 rounded-md w-full"
                      >
                        <option value="Tháng 2, 2025">Tháng 2, 2025</option>
                        <option value="Tháng 3, 2025">Tháng 3, 2025</option>
                        <option value="Tháng 4, 2025">Tháng 4, 2025</option>
                      </select>

                      <ConfigProvider
                        theme={{
                          token: {
                            colorPrimary: "#62D985",
                            colorBgContainer: "white",
                            controlItemBgActive: "#62D985",
                            controlItemBgHover: "#62D985",
                            colorTextLightSolid: "white",
                          },
                        }}
                      >
                        <Checkbox
                          checked={autoRenew}
                          onChange={() => setAutoRenew(!autoRenew)}
                          className="text-sm mt-3"
                        >
                          Tự động tiếp tục
                        </Checkbox>
                      </ConfigProvider>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <p className="w-1/4 text-sm font-bold">Hồ sơ</p>
                    <div className="w-3/4 text-sm">
                      <div className="flex flex-col gap-2">
                        <select
                          value={selectedProfile}
                          onChange={(e) => setSelectedProfile(e.target.value)}
                          className="border p-2 rounded-md w-full"
                        >
                          <option value="Tạo hồ sơ mới">Tạo hồ sơ mới</option>
                          <option value="Hồ sơ A">Hồ sơ A</option>
                          <option value="Hồ sơ B">Hồ sơ B</option>
                        </select>
                      </div>{" "}
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <h1 className=" font-bold text-sm mb-4">
                    Sản phẩm có trong SOP
                  </h1>
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex w-full gap-5 mb-4 border-b pb-4"
                    >
                      <div className="flex">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 text sm h-20 object-cover border rounded-md"
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <p className="font-bold text-sm text-gray-800">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {product.description}
                        </p>
                        <div className="flex w-full gap-5">
                          <h1 className="flex text-black text-sm  font-bold gap-2">
                            {product.price}
                            <span className="line-through text-sm  text-gray-400">
                              {product.oldPrice}
                            </span>
                          </h1>
                          <p className="flex justify-end text-sm  font-bold">
                            {product.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex space-x-4">
                  <button className=" w-2/5  px-6 py-3 bg-customGreen text-white rounded-lg shadow-md hover:bg-green-500">
                    Mua ngay
                  </button>
                  <button className=" w-2/5  px-6 py-3 bg-customLightGreen text-green-600 border-customGreen border-2 rounded-lg shadow-md hover:bg-customGreen hover:text-white">
                    Thêm vào giỏ hàng
                  </button>
                  <span className="text-2xl pt-4">
                    <BsHeart />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SOPDetail;
