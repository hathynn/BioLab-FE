import { useState } from "react";
import RatingStars from "../../components/rating-star";
import "./index.scss";
import Header from "../../components/header";
import { Carousel, Radio } from "antd";
import { BsHeart } from "react-icons/bs";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);

  const options = [
    { label: "Hộp ", value: "a" },
    { label: "Vỉ", value: "b" },
  ];

  const handleQuantityChange = (value: number) => {
    if (value > 0) setQuantity(value);
  };

  return (
    <div className="detail-product ">
      <Header />
      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg ">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="flex flex-col space-y-4">
              <div className="w-[70%]">
                <Carousel arrows infinite={false} dots={false}>
                  <img
                    src="https://bizweb.dktcdn.net/100/011/344/products/omega3-a223b96b-88f8-45b6-9c0e-89c7db4cd048.jpg?v=1639712259133"
                    alt="Product"
                    className="rounded-lg w-full"
                  />
                  <img
                    src="https://bizweb.dktcdn.net/100/011/344/products/omega3-a223b96b-88f8-45b6-9c0e-89c7db4cd048.jpg?v=1639712259133"
                    alt="Product"
                    className="rounded-lg w-full"
                  />
                  <img
                    src="https://bizweb.dktcdn.net/100/011/344/products/omega3-a223b96b-88f8-45b6-9c0e-89c7db4cd048.jpg?v=1639712259133"
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
                  src="https://bizweb.dktcdn.net/100/421/115/products/3-df21fc2a-f256-4144-a537-f4aa586f2a29.jpg?v=1680864997713"
                  alt="Thumbnail 1"
                  className="rounded-lg w-20 h-20 object-cover"
                />
                <img
                  src="https://bizweb.dktcdn.net/100/421/115/products/3-df21fc2a-f256-4144-a537-f4aa586f2a29.jpg?v=1680864997713"
                  alt="Thumbnail 2"
                  className="rounded-lg w-20 h-20 object-cover"
                />
                <img
                  src="https://bizweb.dktcdn.net/100/421/115/products/3-df21fc2a-f256-4144-a537-f4aa586f2a29.jpg?v=1680864997713"
                  alt="Thumbnail 3"
                  className="rounded-lg w-20 h-20 object-cover"
                />
              </div>
            </div>

            <div>
              <h1 className=" mb-22">
                Thương hiệu:&nbsp;
                <span className="text-green-600 font-extrabold">OCAVILL</span>
              </h1>
              <h1 className="text-2xl font-bold text-gray-800">
                Viên uống LeAna Ocavill hỗ trợ cân bằng nội tiết tố (60 viên)
              </h1>
              <div className="flex items-center space-x-2 mt-2">
                <RatingStars rating={4} />
                <span className="text-sm text-gray-600">(150 đánh giá)</span>
              </div>
              <h1 className="flex text-black font-bold text-xl mt-4">
                295.000₫ &nbsp;
                <span className="font-semibold text-green-900">/ Hộp</span>
              </h1>
              <h1 className="line-through font-semibold text-lg text-gray-400">
                500.000₫
              </h1>

              <div className="space-y-4 mt-6">
                <div className="flex items-start">
                  <p className="w-1/4 text-sm font-bold">Chọn đơn vị</p>
                  <p className="w-3/4 text-sm">
                    <Radio.Group
                      options={options}
                      optionType="button"
                      buttonStyle="solid"
                      size="small"
                      defaultValue="a"
                    />
                  </p>
                </div>

                <div className="flex items-start">
                  <p className="w-1/4 text-sm font-bold">Danh mục</p>
                  <p className="w-3/4 text-sm text-green-600 hover:text-green-300 cursor-pointer">
                    Cân bằng nội tiết tố
                  </p>
                </div>

                <div className="flex items-start">
                  <p className="w-1/4 text-sm font-bold">Dạng bào chế</p>
                  <p className="w-3/4 text-sm">Viên nang mềm</p>
                </div>

                <div className="flex items-start">
                  <p className="w-1/4 text-sm font-bold">Nhà sản xuất</p>
                  <p className="w-3/4 text-sm">PHYTOPHARMA LTD</p>
                </div>

                <div className="flex items-start">
                  <p className="w-1/4 text-sm font-bold">Thành phần</p>
                  <p className="w-3/4 text-sm text-justify">
                    Tinh dầu hoa anh thảo, Vitamin E, Nhân Sâm, Lepidium
                    meyenii, Trinh nữ
                  </p>
                </div>

                <div className="flex items-start">
                  <p className="w-1/4 text-sm font-bold">Mô tả ngắn</p>
                  <p className="w-3/4 text-sm text-justify">
                    LeAna Ocavill hỗ trợ cân bằng nội tiết tố. Hỗ trợ cải thiện
                    các triệu chứng thời kỳ tiền mãn kinh, mãn kinh do suy giảm
                    nội tiết tố. Hỗ trợ hạn chế quá trình lão hóa, giúp đẹp da.
                  </p>
                </div>

                <div className="flex items-start">
                  <p className="w-1/4 text-sm font-bold">Số đăng ký</p>
                  <p className="w-3/4 text-sm">9677/2021/ĐKSP</p>
                </div>
                <div className="flex items-start">
                  <p className="w-1/4 text-sm font-bold">Chọn số lượng</p>
                  <div className="w-3/4 text-sm">
                    <div className="flex items-center border-2 border-gray-400 rounded-full w-20 ">
                      <button
                        onClick={() => setQuantity(quantity - 1)}
                        className="w-8 h-full border-r-2 border-r-gray-400 text-black flex justify-center items-center hover:bg-gray-200 focus:outline-none rounded-l-full"
                      >
                        -
                      </button>

                      <span className="w-12 text-center text-black">
                        {quantity}
                      </span>

                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-full border-l-2 border-l-gray-400 text-black  flex justify-center items-center hover:bg-gray-200 focus:outline-none rounded-r-full"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
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
  );
};

export default ProductDetail;
