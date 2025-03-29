import { useState, useEffect } from "react";
import "./index.scss";
import {
  Breadcrumb,
  Carousel,
  Checkbox,
  ConfigProvider,
  Spin,
  message,
} from "antd";
import { BsHeart } from "react-icons/bs";
import RatingStars from "../../../components/rating-star";
import { Link, useParams } from "react-router-dom";
import useSOPService from "../../../services/useSOPService";
import { SOPType } from "../../../types/sop.type";

const SOPDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const sopService = useSOPService();

  const [selectedPlan, setSelectedPlan] = useState<string>(
    "Hàng tháng, 3 tháng"
  );
  const [selectedStartDate, setSelectedStartDate] =
    useState<string>("Tháng 2, 2025");
  const [selectedProfile, setSelectedProfile] =
    useState<string>("Tạo hồ sơ mới");
  const [autoRenew, setAutoRenew] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [sopData, setSopData] = useState<SOPType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  useEffect(() => {
    const fetchSOPDetail = async (): Promise<void> => {
      try {
        setLoading(true);
        if (id) {
          const response = await sopService.getSOPById(id);
          if (response) {
            setSopData(response);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết SOP:", error);
        message.error("Không thể tải thông tin chi tiết SOP");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSOPDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!sopData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-500">Không tìm thấy thông tin SOP</p>
      </div>
    );
  }

  const calculateTotalPrice = (): { total: string; originalTotal: string } => {
    let total = 0;
    let originalTotal = 0;

    if (sopData.combo && sopData.combo.length > 0) {
      sopData.combo.forEach((product) => {
        if (product.price) {
          total += product.price;
        }

        if (product.price) {
          originalTotal += product.price;
        } else if (product.price) {
          originalTotal += product.price * 1.1;
        }
      });
    }

    return {
      total: total.toLocaleString(),
      originalTotal: originalTotal.toLocaleString(),
    };
  };

  const { total, originalTotal } = calculateTotalPrice();

  return (
    <>
      <Breadcrumb
        className="ml-12 mt-6 text-sm"
        items={[
          {
            title: <Link to="/home">Trang chủ</Link>,
          },
          {
            title: <Link to="/sop">SOP</Link>,
          },
          {
            title: <p className="font-bold">{sopData.name}</p>,
          },
        ]}
      />
      <div className="detail-product ">
        <div className="p-4 mb-7">
          <div className="max-w-6xl mx-auto ">
            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div className="flex flex-col justify-start items-center space-y-3">
                <div className="w-[70%]">
                  <Carousel arrows infinite={false} dots={true}>
                    <img
                      src={sopData.image_url}
                      alt={sopData.name}
                      className="rounded-lg w-full"
                    />
                    {sopData.combo &&
                      sopData.combo.map(
                        (product, index) =>
                          product.image_url &&
                          product.image_url.length > 0 && (
                            <img
                              key={index}
                              src={product.image_url[0]}
                              alt={product.name}
                              className="rounded-lg w-full"
                            />
                          )
                      )}
                  </Carousel>
                </div>
                <div className="flex space-x-2 overflow-x-auto">
                  <img
                    src={sopData.image_url}
                    alt={sopData.name}
                    className="rounded-lg w-32 h-32 object-cover"
                  />
                  {sopData.combo &&
                    sopData.combo.map(
                      (product, index) =>
                        product.image_url &&
                        product.image_url.length > 0 && (
                          <img
                            key={index}
                            src={product.image_url[0]}
                            alt={product.name}
                            className="rounded-lg w-32 h-32 object-cover"
                          />
                        )
                    )}
                </div>
              </div>

              <div>
                <div className="w-fit bg-customGreen text-xs text-white p-1 px-2 rounded-full mb-2">
                  SOP
                </div>
                <h1 className="text-2xl font-bold text-gray-800 uppercase">
                  {sopData.name}
                </h1>
                <div className="flex items-center space-x-2 mt-2">
                  <RatingStars rating={4} />
                  <span className="text-sm text-gray-600">(150 đánh giá)</span>
                  <div className="bg-gradient-to-r from-[#62D985] to-[#ABFFC5] text-xs text-white p-1 px-2 rounded-full">
                    Còn hàng
                  </div>
                </div>
                <div className="flex mt-4">
                  <h1 className="text-black font-bold text-xl">
                    {total}đ &nbsp;
                  </h1>
                  <h1 className="line-through font-semibold text-lg text-gray-400">
                    {originalTotal}đ
                  </h1>
                </div>

                <div className="text-sm my-5 pb-4 border-b">
                  <p
                    className={`text-justify ${
                      isExpanded ? "" : "line-clamp-3"
                    }`}
                  >
                    {sopData.description}
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
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <h1 className="font-bold text-sm mb-4">
                    Sản phẩm có trong SOP
                  </h1>
                  {sopData.combo &&
                    sopData.combo.map((product) => (
                      <div
                        key={product._id}
                        className="flex w-full gap-5 mb-4 border-b pb-4"
                      >
                        <div className="flex">
                          <img
                            src={
                              product.image_url && product.image_url.length > 0
                                ? product.image_url[0]
                                : "https://placehold.co/200x200/png"
                            }
                            alt={product.name}
                            className="w-20 h-20 object-cover border rounded-md"
                          />
                        </div>
                        <div className="flex flex-col justify-between">
                          <p className="font-bold text-sm text-gray-800">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {product.description || "Không có mô tả"}
                          </p>
                          <div className="flex w-full gap-5">
                            <h1 className="flex text-black text-sm font-bold gap-2">
                              {product.price?.toLocaleString()}đ
                              <span className="line-through text-sm text-gray-400">
                                {(
                                  product.price || product.price * 1.1
                                )?.toLocaleString()}
                                đ
                              </span>
                            </h1>
                            <p className="flex justify-end text-sm font-bold">
                              x1 {product.unit || "Sản phẩm"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="mt-6 flex space-x-4">
                  <button className="w-2/5 px-6 py-3 bg-customGreen text-white rounded-lg shadow-md hover:bg-green-500">
                    Mua ngay
                  </button>
                  <button className="w-2/5 px-6 py-3 bg-customLightGreen text-green-600 border-customGreen border-2 rounded-lg shadow-md hover:bg-customGreen hover:text-white">
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
