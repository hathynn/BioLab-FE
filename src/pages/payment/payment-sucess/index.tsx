import useCartStore, { Product } from "../../../store/cartStore";

export default function PaymentSuccess() {
  const { cart } = useCartStore();
  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item: Product) => total + (item.price || 0) * item.quantity,
      0
    );
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mt-4">Thanh toán thành công</h2>
          <p className="text-gray-500">Thành công thanh toán {calculateTotalPrice()?.toLocaleString()}đ</p>
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-xl shadow-inner">
          <h3 className="font-semibold text-gray-700">
            Phương thức thanh toán
          </h3>
          <div className="mt-2 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Mã giao dịch</span>
              <span className="font-medium">4352 2748 3920</span>
            </div>
            <div className="flex justify-between">
              <span>Ngày</span>
              <span className="font-medium">1 September 2024</span>
            </div>
            <div className="flex justify-between">
              <span>Loại giao dịch</span>
              <span className="font-medium">Credit Card</span>
            </div>
            <div className="flex justify-between">
              <span>Tổng hóa đơn</span>
              <span className="font-medium">{calculateTotalPrice()?.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Trạng thái</span>
              <span className="text-green-600 font-medium flex items-center">
                ✅ Thành công
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between bg-green-600 text-white p-4 rounded-xl text-lg font-semibold">
          <span>Tổng</span>
          <span>{calculateTotalPrice()?.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
