function SOP() {
  return (
    <div className="bg-navColor py-6 px-32 flex flex-col gap-10">
      <div className="bg-[#8ce9a7] rounded-lg flex justify-center items-center">
        <img src="/src/assets/bannerSOP.png" />
      </div>
      {/* <img src="/src/assets/imgSOP1.png" /> */}
      <h1 className="text-[#2cbb57] font-extrabold text-4xl leading-10">
        CHƯƠNG TRÌNH <br /> KHÁCH HÀNG THÂN THIẾT SOP LÀ GÌ?
      </h1>
      <div className="flex justify-center items-center px-10">
        <img src="/src/assets/AD_SOP.png" className="w-3/4" />
      </div>
      <div className="flex justify-center items-center px-10">
        <img src="/src/assets/Rule_SOP.png" />
        <img src="/src/assets/Rule_2_SOP.png" />
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
        <img src="/src/assets/UD1_SOP.png" />
        <img src="/src/assets/UD2_SOP.png" />
      </div>
      <h1 className="text-[#2cbb57] font-extrabold text-4xl">
        KINH DOANH AMWAY CÙNG SOP
      </h1>
      <div className="flex justify-center items-center px-10 ">
        <img
          src="/src/assets/AW_1_SOP.png"
          className="w-full h-full object-cover"
        />
        <img src="/src/assets/AW_2_SOP.png" />
      </div>
      <h1 className="text-[#2cbb57] font-extrabold text-4xl">
        CÁC GÓI SOP ĐANG ÁP DỤNG
      </h1>
      <div className="flex flex-row justify-center items-center gap-5">
        <img src="/src/assets/SOP_1_Sep2024.jpg" className="w-1/4" />
        <img src="/src/assets/SOP_2_Sep2024.jpg" className="w-1/4" />
        <img src="/src/assets/SOP_2_Sep2024.jpg" className="w-1/4" />
        <img src="/src/assets/SOP_2_Sep2024.jpg" className="w-1/4" />
      </div>
      <div className="flex flex-row justify-center items-center gap-5">
        <img src="/src/assets/SOP_1_Sep2024.jpg" className="w-1/4" />
        <img src="/src/assets/SOP_2_Sep2024.jpg" className="w-1/4" />
        <img src="/src/assets/SOP_2_Sep2024.jpg" className="w-1/4" />
        <img src="/src/assets/SOP_2_Sep2024.jpg" className="w-1/4" />
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
      <img src="/src/assets/ProcessSOP.jpg" />
      <h1 className="text-[#2cbb57] font-extrabold text-4xl text-center">
        ĐĂNG KÍ THAM GIA SOP
      </h1>
    </div>
  );
}

export default SOP;
