import { useState } from "react";
import demo from "../../assets/demo.png";
import { FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { Checkbox, ConfigProvider } from "antd";

function Payment() {
  const [quantity, setQuantity] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([false, false, false]);
  const [prices] = useState([295000, 150000, 50000]);
  // const [discountPercentage] = useState(0);
  const nav = useNavigate();

  const handleSelectAllChange = (checked: boolean) => {
    setSelectAll(checked);
    setCheckedItems(checkedItems.map(() => checked));
  };

  const handleItemChange = (index: number, checked: boolean) => {
    const updatedItems = [...checkedItems];
    updatedItems[index] = checked;
    setCheckedItems(updatedItems);
    setSelectAll(updatedItems.every((item) => item));
  };

  const calculateTotalPrice = () => {
    return checkedItems.reduce((total, isChecked, index) => {
      return isChecked ? total + prices[index] : total;
    }, 0);
  };

  // const calculateDiscount = () => {
  //   const totalPrice = calculateTotalPrice();
  //   return discountPercentage > 0 ? (totalPrice * discountPercentage) / 100 : 0;
  // };

  const calculateFinalPrice = () => {
    const totalPrice = calculateTotalPrice();
    // const discount = calculateDiscount();
    return totalPrice /*- discount */;
  };

  // const handleQuantityChange = (value: number) => {
  //   if (value > 0) setQuantity(value);
  // };

  return (
    <div className="px-10 mx-auto p-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <div className="border bg-cartCardColor border-gray-200 rounded-lg shadow-sm p-4 mb-4">
            <div className="flex justify-between  pb-2 mb-4">
              <div className="w-2/3 font-bold text-xl">Thông tin đơn hàng</div>
              <div className="flex justify-end space-x-10 w-1/3 font-bold">
                <div className="flex gap-3 items-center">
                  <h1 className="font-bold flex justify-center">
                    Trạng thái đơn hàng
                  </h1>
                  <h1 className="text-xs px-4 py-1 text-cancelColor border-2 border-cancelColor rounded-3xl">
                    Chưa thanh toán
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex w-full gap-5 mb-4">
              <div className="flex ">
                <img
                  src=""
                  alt="Product"
                  className="w-20 h-20 object-cover border rounded-md"
                />
              </div>
              <div className="flex">
                <div className="pr-2 flex flex-col justify-between h-full">
                  <p className="font-bold text-lg text-gray-800">
                    Dung dịch vệ sinh mũi ION Muối hỗ trợ sát khuẩn, kháng viêm,
                    phòng ngừa sổ mũi (90ml)  Dung dịch vệ sinh mũi ION Muối hỗ trợ sát khuẩn, kháng viêm,
                    phòng ngừa sổ mũi (90ml) 
                  </p>
                  <div className="flex w-full justify-between">
                    <h1 className="flex text-black text-lg font-bold gap-2">
                      50.505đ
                      <span className="line-through text-lg text-gray-400">
                        60.000đ
                      </span>
                    </h1>
                    <p className="text-lg font-bold">x1 Hộp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => nav("/home")}
              className="px-6 py-3 text-gray-600 font-semibold border-gray-100 bg-gray-100 border-2 rounded-lg hover:bg-gray-500 hover:text-white"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>

        <div className="w-full rounded-lg  p-4">
          <button className="w-full px-6 py-3 mb-3 text-green-600 border-customGreen border-2 rounded-lg hover:bg-customGreen hover:text-white">
            Áp dụng ưu đãi để được giảm giá
          </button>
          <div className="space-y-3 text-black">
            <div className="flex justify-between">
              <span className="font-bold">Tổng tiền</span>
              <span>{calculateTotalPrice().toLocaleString()}₫</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Giảm giá</span>
              {/* <span>
                {calculateDiscount() > 0
                  ? `-${calculateDiscount().toLocaleString()}₫`
                  : "0₫"}
              </span> */}
              <span>0đ</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Tiết kiệm</span>
              {/* <span>
                {calculateDiscount() > 0
                  ? calculateDiscount().toLocaleString() + "₫"
                  : "0₫"}
              </span> */}
              <span>0đ</span>
            </div>
            <div className="flex justify-between font-semibold text-lg text-green-500 pt-5">
              <span className="font-bold">Thành tiền</span>
              <span>{calculateFinalPrice().toLocaleString()}₫</span>
            </div>
          </div>

          <button className="w-full mt-4 px-6 py-3 bg-customGreen text-white rounded-lg shadow-md hover:bg-green-500">
            Tiến hành đặt mua
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Bằng việc tiến hành đặt mua hàng, bạn đồng ý với Điều khoản dịch vụ
            và Chính sách cá nhân của BioLab.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Payment;
