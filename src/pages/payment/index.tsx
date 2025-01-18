// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { GrDocumentVerified } from "react-icons/gr";

function Payment() {
//   const [quantity, setQuantity] = useState(1);
//   const [selectAll, setSelectAll] = useState(false);
//   const [checkedItems, setCheckedItems] = useState([false, false, false]);

//   const nav = useNavigate();

  return (
    <div className="px-10 mx-auto p-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
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
              <h1 className="font-bold text-base">Thông tin người đặt</h1>
            </div>
          </div>
        </div>

        <div className="w-full rounded-lg  p-4"></div>
      </div>
    </div>
  );
}

export default Payment;
