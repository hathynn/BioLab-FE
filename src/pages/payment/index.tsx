import { useState } from "react";
import { useNavigate } from "react-router-dom";
import qr from '../../assets/qr.png'

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
                  <p className="font-bold text-base text-gray-800">
                    Dung dịch vệ sinh mũi ION Muối hỗ trợ sát khuẩn, kháng viêm,
                    phòng ngừa sổ mũi (90ml)  
                  </p>
                  <div className="flex w-full gap-5">
                    <h1 className="flex text-black text-base font-bold gap-2">
                      50.505đ
                      <span className="line-through text-base text-gray-400">
                        60.000đ
                      </span>
                    </h1>
                    <p className="flex justify-end text-base font-bold">x1 Hộp</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between ">
              <h1 className="w-2/3 font-bold text-base">Thành tiền</h1>
              <h1 className="flex justify-end text-base space-x-10 w-1/3 font-bold text-customGreen">
               60.000đ
              </h1>
            </div>
          </div>

          
        </div>

        <div className="w-full rounded-lg  p-4">
          <img src={qr}/>
        </div>
      </div>
    </div>
  );
}

export default Payment;
