// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrDocumentVerified } from "react-icons/gr";
import cod from "../../../assets/cod.png";
import momo from "../../../assets/momo.png";
import zalopay from "../../../assets/zalopay.png";
import vnpay from "../../../assets/vnpay.png";
import { Switch } from "antd";
import "./index.scss";

function ShippingInfo() {
  //   const [quantity, setQuantity] = useState(1);
  //   const [selectAll, setSelectAll] = useState(false);
  //   const [checkedItems, setCheckedItems] = useState([false, false, false]);

  const nav = useNavigate();
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div className="payment px-10 mx-auto p-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="p-4 mb-4 space-y-5">
            <div className="flex space-x-2">
              <GrDocumentVerified className="text-2xl mt-1" />
              <p className="text-2xl font-bold">Thông tin giao hàng</p>
            </div>
            <div className="flex space-x-3">
              <p className="text-base font-bold ">Chọn hình thức nhận hàng</p>
              <button className=" px-6 text-sm text-green-600 border-customGreen border-2 rounded-full">
                Giao hàng tận nơi
              </button>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">
                Thông tin người đặt
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-700">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value="Nguyễn Văn A"
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    value="0909282839"
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-700">Email</label>
                <input
                  type="text"
                  value="nguyenvana123@gmail.com"
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>

              <h2 className="text-lg font-semibold mb-4">Địa chỉ nhận hàng</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <select className="w-full p-2 border border-gray-300 rounded-md bg-gray-100">
                  <option>Chọn tỉnh/thành phố</option>
                </select>
                <select className="w-full p-2 border border-gray-300 rounded-md bg-gray-100">
                  <option>Chọn tỉnh/thành phố</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Chọn phường/xã"
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 mb-4"
              />
              <input
                type="text"
                placeholder="Nhập địa chỉ cụ thể"
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 mb-4"
              />

              <h2 className="text-lg font-semibold mb-4">Ghi chú</h2>
              <input
                type="text"
                placeholder="Che tên khi giao hàng"
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 mb-4"
              />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  Yêu cầu xuất hóa đơn điện tử
                </span>

                <Switch className="text-customGreen" onChange={onChange} />
              </div>
            </div>
            <p className="text-lg font-semibold mb-4 ">
              Chọn hình thức nhận hàng
            </p>
            <div className="flex-col space-y-2">
              <div className="space-x-2">
                <button className=" flex gap-2 px-3 py-3 text-base  bg-white  border-2 rounded-lg  hover:border-black">
                  <img src={cod} className="w-6" />
                  Thanh toán khi nhận hàng (COD)
                </button>
              </div>
              <div className="space-x-2">
                <button className=" flex gap-2 px-3 py-3 text-base  bg-white  border-2 rounded-lg  hover:border-black">
                  <img src={momo} className="w-6 h-6 object-cover" />
                  Thanh toán qua Momo
                </button>
              </div>
              <div className="space-x-2">
                <button className=" flex gap-2 px-3 py-3 text-base  bg-white  border-2 rounded-lg  hover:border-black">
                  <img src={zalopay} className="w-6 object-cover" />
                  Thanh toán qua ZaloPay
                </button>
              </div>
              <div className="space-x-2">
                <button className=" flex gap-2 px-3 py-3 text-base  bg-white  border-2 rounded-lg  hover:border-black">
                  <img src={vnpay} className="w-6 h-6 object-cover" />
                  Thanh toán qua VnPay
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-fit rounded-lg  p-4 border">
          <h1 className="font-bold mb-2">Thông tin đơn hàng</h1>
          <div className="flex justify-between mb-4">
            <div className="flex w-2/5 space-x-2">
              <img
                src=""
                alt="Product"
                className="w-20 h-20 object-cover border rounded-md"
              />
            </div>
            <div className="flex justify-end ">
              <div className="pr-2 flex flex-col justify-between h-full">
                <p className="font-bold text-sm text-gray-800">
                  Dung dịch vệ sinh mũi ION Muối hỗ trợ sát khuẩn, kháng viêm,
                  phòng ngừa sổ mũi (90ml)
                </p>
                <div className="flex justify-between">
                  <h1 className="flex text-customGreen text-sm font-bold gap-2">
                    50.505đ
                    <span className="line-through text-gray-400">60.000đ</span>
                  </h1>
                  <p className="text-sm font-bold">x1 Hộp</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <h1 className="font-bold">Thành tiền</h1>
            <h1 className="text-customGreen font-bold">60.000đ</h1>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="font-bold flex justify-center">2 sản phẩm</h1>
            <button
              onClick={() => nav("/payment")}
              className=" text-sm  px-4 py-2 bg-customGreen text-white rounded-3xl shadow-md hover:bg-green-500"
            >
              Thanh toán ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingInfo;
