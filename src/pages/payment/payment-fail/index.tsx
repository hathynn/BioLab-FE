export default function PaymentFailed() {
    return (
      <div className="flex flex-col items-center p-6 min-h-screen">
        <div className="bg-white p-6 rounded-2xl w-full max-w-md">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11a1 1 0 112 0v4a1 1 0 11-2 0V7zm1 6a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mt-4">Thanh toán thất bại</h2>
            <p className="text-gray-500">Thanh toán của bạn không thể được xử lý</p>
          </div>
  
          <div className="mt-6 bg-gray-50 p-4 rounded-xl shadow-inner">
            <h3 className="font-semibold text-gray-700">Chi tiết thanh toán</h3>
            <div className="mt-2 space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Mã giao dịch </span>
                <span className="font-medium">4352 2748 3921</span>
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
                <span className="font-medium">$150.50</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Trạng thái</span>
                <span className="text-red-600 font-medium flex items-center">
                  ❌Thất bại
                </span>
              </div>
            </div>
          </div>
  
          <div className="mt-6 flex justify-center">
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg text-base font-semibold hover:bg-red-700">
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }
  