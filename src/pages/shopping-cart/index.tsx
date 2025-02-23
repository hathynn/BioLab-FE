import { useState } from "react";
import demo from "../../assets/demo.png";
import { FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { Checkbox, ConfigProvider } from "antd";
import useCartStore from "../../store/cartStore";
import { PAYMENT_ROUTES, USER_ROUTES } from "../../constants/routes";

function ShoppingCart() {
  const { cart,removeFromCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    cart.reduce((acc, item) => ({ ...acc, [item.id]: false }), {})
  );
  const [prices] = useState([295000, 150000, 50000]);
  // const [discountPercentage] = useState(0);
  const nav = useNavigate();

  const handleSelectAllChange = (checked: boolean) => {
    setSelectAll(checked);
    setCheckedItems(
      cart.reduce((acc, item) => ({ ...acc, [item.id]: checked }), {})
    );
  };

  const handleItemChange = (id: string, checked: boolean) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [id]: checked };
      setSelectAll(Object.values(updated).every((v) => v));
      return updated;
    });
  };

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) =>
        checkedItems[item.id] ? total + item.price * item.quantity : total,
      0
    );
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
            <div className="flex justify-between border-b pb-2 mb-4">
              <div className="w-2/3 font-bold">
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
                    checked={selectAll}
                    onChange={(e) => handleSelectAllChange(e.target.checked)}
                    className="text-base"
                  >
                    Chọn tất cả ({checkedItems.length})
                  </Checkbox>
                </ConfigProvider>
              </div>
              <div className="flex justify-end space-x-10 w-1/3 font-bold text-nowrap">
                <p>Giá thành </p>
                <p>Số lượng </p>
                <p>Đơn vị</p>
                <i>
                  <FaTrash className="text-white" />
                </i>
              </div>
            </div>

            {cart?.map((p, index) => (
              <div key={index} className="flex justify-between items-center mb-4">
                <div className="flex w-2/3 space-x-4">
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
                      checked={checkedItems[p.id] || false}
                      onChange={(e) => handleItemChange(p.id, e.target.checked)}
                    />
                  </ConfigProvider>
                  <img
                    src={p?.img}
                    alt="Product"
                    className="w-16 h-16 object-cover border rounded-md"
                  />
                  <p className="font-bold text-gray-800">{p?.name}</p>
                </div>
                <div className="flex justify-end space-x-8 w-1/3">
                  <div className="pr-2">
                    <h1 className="flex text-customGreen font-bold">
                      {p?.price?.toLocaleString()}₫
                    </h1>
                  </div>
                  <div className="flex items-center border-2 border-gray-400 rounded-full w-16 h-6">
                    <button
                      onClick={() => setQuantity(quantity - 1)}
                      className="w-8 h-full border-r-2 border-r-gray-400 text-black flex justify-center items-center hover:bg-gray-200 focus:outline-none rounded-l-full"
                    >
                      -
                    </button>

                    <span className="w-12 text-center text-black">
                      {p?.quantity}
                    </span>

                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-full border-l-2 border-l-gray-400 text-black flex justify-center items-center hover:bg-gray-200 focus:outline-none rounded-r-full"
                    >
                      +
                    </button>
                  </div>

                  <select className="border-2 border-gray-400 text-sm px-1 rounded-full text-gray-600 h-6  ">
                    <option>Hộp</option>
                    <option>Chai</option>
                  </select>

                  <i>
                    <FaTrash onClick={() => removeFromCart(p?.id)} className="cursor-pointer hover:text-red-500" />
                  </i>
                </div>
              </div>
            ))}
          </div>

          <div>
            <button
              onClick={() => nav(`/${USER_ROUTES.HOME}`)}
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

          <button onClick={() => nav(`/${PAYMENT_ROUTES.SHIPPING_INFO}`)} className="w-full mt-4 px-6 py-3 bg-customGreen text-white rounded-lg shadow-md hover:bg-green-500">
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

export default ShoppingCart;
