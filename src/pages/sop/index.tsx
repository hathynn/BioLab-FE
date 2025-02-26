import IMAGE_URLS from "../../constants/imageUrls";
function SOP() {
  return (
    <div className="bg-navColor py-6 px-32 flex flex-col gap-10">
      <div className=" rounded-xl flex justify-center items-center">
        <img src={IMAGE_URLS.SOP.BANNER} className="rounded-xl" />
      </div>

      <h1 className="text-[#2cbb57] font-extrabold text-4xl leading-10">
        CHƯƠNG TRÌNH <br /> KHÁCH HÀNG THÂN THIẾT SOP LÀ GÌ?
      </h1>
      <div className="flex justify-center items-center px-10">
        <img src={IMAGE_URLS.SOP.INTRO} />
      </div>
      <div className="flex justify-center items-center px-8">
        <img src={IMAGE_URLS.SOP.ADS} />
      </div>
      <h1 className="text-[#2cbb57] font-extrabold text-4xl">
        LÝ DO BẠN NÊN THAM GIA SOP
      </h1>
      <div className="flex justify-center items-center px-10">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/x5Ee-odCRDA"
        />
      </div>
      <h1 className="text-[#2cbb57] font-extrabold text-4xl">
        ƯU ĐÃI KHI THAM GIA SOP
      </h1>
      <div className="flex justify-center items-center px-10 ">
        <img src={IMAGE_URLS.SOP.PROFIT} />
      </div>
      <h1 className="text-[#2cbb57] font-extrabold text-4xl">
        KINH DOANH AMWAY CÙNG SOP
      </h1>
      <div className="flex justify-center items-center px-10 ">
        <img
          src={IMAGE_URLS.SOP.BUSINESS}
          className="w-full h-full object-cover"
        />
        {/* <img src="/assets/AW_2_SOP.png" /> */}
      </div>
      <h1 className="text-[#2cbb57] font-extrabold text-4xl">
        CÁC GÓI SOP ĐANG ÁP DỤNG
      </h1>
      <div className="flex flex-row justify-center items-center gap-5">
        <img src="/assets/SOP_1_Sep2024.jpg" className="w-1/4" />
        <img src="/assets/SOP_2_Sep2024.jpg" className="w-1/4" />
        <img src="/assets/SOP_2_Sep2024.jpg" className="w-1/4" />
        <img src="/assets/SOP_2_Sep2024.jpg" className="w-1/4" />
      </div>
      <div className="flex flex-row justify-center items-center gap-5">
        <img src="/assets/SOP_1_Sep2024.jpg" className="w-1/4" />
        <img src="/assets/SOP_2_Sep2024.jpg" className="w-1/4" />
        <img src="/assets/SOP_2_Sep2024.jpg" className="w-1/4" />
        <img src="/assets/SOP_2_Sep2024.jpg" className="w-1/4" />
      </div>
      <p className="text-center font-light">
        (*) Giá sản phẩm và các thông tin liên quan đến sản phẩm xem tại{" "}
        <a
          href="#"
          className="text-green-500 hover:underline hover:text-green-70000"
        >
          {" "}
          https://www.amway.com.vn/vn/sopProducts
        </a>
      </p>
      <h1 className="text-[#2cbb57] font-extrabold text-4xl">QUY TRÌNH SOP</h1>
      <img src={IMAGE_URLS.SOP.PROCESS} className="object-cover" />
      <h1 className="text-[#2cbb57] font-extrabold text-4xl text-center">
        ĐĂNG KÍ THAM GIA SOP
      </h1>
      <div className="flex justify-center items-center">
        <img
          src="/assets/onlineSOP.png"
          className="w-2/6 h-full object-cover cursor-pointer"
        />
        <img
          src="/assets/offlineSOP.png"
          className="w-2/6 h-full object-cover cursor-pointer"
        />
        <img
          src="/assets/offlineSOP.png"
          className="w-2/6 h-full object-cover cursor-pointer"
        />
      </div>
      <h1 className="text-[#2cbb57] font-extrabold text-4xl  ">
        BẠN CẦN TÌM HIỂU VỀ SOP?
      </h1>
      <div className="flex justify-center items-center pb-10">
        <img
          src="/assets/videoSOP.png"
          className="w-1/5 h-full object-cover cursor-pointer"
        />
        <img
          src="/assets/packageSOP.png"
          className="w-1/5 h-full object-cover cursor-pointer"
        />
        <img
          src="/assets/documentSOP.png"
          className="w-1/5 h-full object-cover cursor-pointer"
        />
        <img
          src="/assets/guideSOP.png"
          className="w-1/5 h-full object-cover cursor-pointer"
        />
        <img
          src="/assets/EXSOP.png"
          className="w-1/5 h-full object-cover cursor-pointer"
        />
      </div>
    </div>
  );
}

export default SOP;
