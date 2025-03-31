import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IMAGE_URLS from "../../constants/imageUrls";
import useSOPService from "../../services/useSOPService";
import { Spin } from "antd";
import { SOPType } from "../../types/sop.type";

function SOP(): JSX.Element {
  const [sops, setSops] = useState<SOPType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const sopService = useSOPService();

  useEffect(() => {
    const fetchSOPs = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await sopService.getSOPs();
        if (response) {
          setSops(response);
        }
      } catch (error) {
        console.error("Lỗi khi fetch danh sách SOP:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSOPs();
  }, []);

  return (
    <div className="bg-navColor py-6 px-32 flex flex-col gap-10">
      <div className="rounded-xl flex justify-center items-center">
        <img
          src={IMAGE_URLS.SOP.BANNER}
          className="rounded-xl"
          alt="SOP Banner"
        />
      </div>

      <h1 className="text-[#2cbb57] font-extrabold text-4xl leading-10">
        CHƯƠNG TRÌNH <br /> KHÁCH HÀNG THÂN THIẾT SOP LÀ GÌ?
      </h1>
      <div className="flex justify-center items-center px-10">
        <img src={IMAGE_URLS.SOP.INTRO} alt="SOP Introduction" />
      </div>
      <div className="flex justify-center items-center px-8">
        <img src={IMAGE_URLS.SOP.ADS} alt="SOP Advertisement" />
      </div>
      <h1 className="text-[#2cbb57] font-extrabold text-4xl">
        LÝ DO BẠN NÊN THAM GIA SOP
      </h1>
      <div className="flex justify-center items-center px-10">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/x5Ee-odCRDA"
          title="SOP Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <h1 className="text-[#2cbb57] font-extrabold text-4xl">
        ƯU ĐÃI KHI THAM GIA SOP
      </h1>
      <div className="flex justify-center items-center px-10">
        <img src={IMAGE_URLS.SOP.PROFIT} alt="SOP Benefits" />
      </div>
      <h1 className="text-[#2cbb57] font-extrabold text-4xl">
        KINH DOANH AMWAY CÙNG SOP
      </h1>
      <div className="flex justify-center items-center px-10">
        <img
          src={IMAGE_URLS.SOP.BUSINESS}
          className="w-full h-full object-cover"
          alt="Amway Business with SOP"
        />
      </div>
      <h1 className="text-[#2cbb57] font-extrabold text-4xl">
        CÁC GÓI SOP ĐANG ÁP DỤNG
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-5">
          {sops.length > 0 ? (
            sops.map((sop) => (
              <Link
                to={`/sop/${sop._id}`}
                key={sop._id}
                className="w-1/4 transition-transform duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img
                    src={sop.image_url}
                    alt={sop.name}
                    className="w-full h-100 object-cover"
                  />             
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">Không có gói SOP nào hiện tại</p>
            </div>
          )}
        </div>
      )}

      <p className="text-center font-light">
        (*) Giá sản phẩm và các thông tin liên quan đến sản phẩm xem tại{" "}
        <Link
          to="#"
          className="text-green-500 hover:underline
          hover:text-green-700"
        >
          https://www.amway.com.vn/vn/sopProducts
        </Link>
      </p>
      <h1 className="text-[#2cbb57] font-extrabold text-4xl">QUY TRÌNH SOP</h1>
      <img
        src={IMAGE_URLS.SOP.PROCESS}
        className="object-cover pb-10"
        alt="SOP Process"
      />
    </div>
  );
}

export default SOP;
