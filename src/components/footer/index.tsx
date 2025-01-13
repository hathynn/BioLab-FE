import zalo from "../../assets/zalo.png";
import fb from "../../assets/fb.png";
import xanh from "../../assets/xanh.png";
import duong from "../../assets/duong.png";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-8 border-t">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
       
        <div className="flex flex-col items-center">
          <h5 className="font-bold mb-4">Về BioLab</h5>
          <div className="space-y-2">
            <a href="#" className="block hover:text-green-600">
              Giới thiệu
            </a>
            <a href="#" className="block hover:text-green-600">
              Giấy phép kinh doanh
            </a>
            <a href="#" className="block hover:text-green-600">
              Quy chế hoạt động
            </a>
            <a href="#" className="block hover:text-green-600">
              Chính sách đổi trả
            </a>
            <a href="#" className="block hover:text-green-600">
              Chính sách giao hàng
            </a>
            <a href="#" className="block hover:text-green-600">
              Chính sách bảo mật
            </a>
            <a href="#" className="block hover:text-green-600">
              Chính sách thanh toán
            </a>
            <a href="#" className="block hover:text-green-600">
              Thể lệ chương trình thẻ thành viên
            </a>
          </div>
        </div>

        
        <div className="flex flex-col items-center">
          <h5 className="font-bold mb-4">Danh mục</h5>
          <div className="space-y-2">
            <a href="#" className="block hover:text-green-600">
              Mắt
            </a>
            <a href="#" className="block hover:text-green-600">
              Xương khớp
            </a>
            <a href="#" className="block hover:text-green-600">
              Vitamin và khoáng chất
            </a>
            <a href="#" className="block hover:text-green-600">
              Sắc đẹp
            </a>
            <a href="#" className="block hover:text-green-600">
              Tuần hoàn và Tim mạch
            </a>
            <a href="#" className="block hover:text-green-600">
              Gan - Mật
            </a>
            <a href="#" className="block hover:text-green-600">
              Ho - Long đờm
            </a>
            <a href="#" className="block hover:text-green-600">
              Nội tiết - Sinh lý
            </a>
            <a href="#" className="block hover:text-green-600">
              Mẹ và bé
            </a>
          </div>
        </div>

        
        <div className="flex flex-col items-center">
          <h5 className="font-bold mb-4">Tìm hiểu thêm</h5>
          <div className="space-y-2">
            <a href="#" className="block hover:text-green-600">
              Cẩm nang sức khỏe
            </a>
            <a href="#" className="block hover:text-green-600">
              Tra cứu thực phẩm chức năng
            </a>
            <a href="#" className="block hover:text-green-600">
              Hoạt động xã hội
            </a>
            <a href="#" className="block hover:text-green-600">
              Tin tức sự kiện
            </a>
          </div>
          <h5 className="font-bold mt-6">Kết nối với chúng tôi</h5>
          <div className="flex space-x-4 mt-2">
            <img className="w-10 h-10" src={fb} />
            <img className="w-10 h-10" src={zalo} />
          </div>
        </div>

        
        <div className="flex flex-col items-center">
          <h5 className="font-bold mb-4">Tổng đài CSKH</h5>
          <div className="space-y-2">
            <a href="tel:18006821" className="block hover:text-green-600">
              Hỗ trợ đặt hàng: 1800 6821
            </a>
            <a href="tel:18006928" className="block hover:text-green-600">
              Góp ý, khiếu nại: 1800 6928
            </a>
          </div>
          <div className="mt-6 flex flex-col items-center space-y-3">
            <img src={duong} alt="DMCA" className="w-17 h-10" />
            <img src={xanh} alt="Bộ Công Thương" className="w-17 h-10" />
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 text-center border-t pt-4">
        <h5 className="font-bold mb-2">Hỗ trợ thanh toán</h5>
        <div className="flex justify-center space-x-4">
          {[
            { src: "/images/payment-cod.png", alt: "COD" },
            { src: "/images/payment-visa.png", alt: "Visa" },
            { src: "/images/payment-mastercard.png", alt: "Mastercard" },
            { src: "/images/payment-jcb.png", alt: "JCB" },
            { src: "/images/payment-momo.png", alt: "MoMo" },
            { src: "/images/payment-zalopay.png", alt: "ZaloPay" },
          ].map((payment, index) => (
            <img
              key={index}
              src={payment.src}
              alt={payment.alt}
              className="h-6"
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          © 2024 BioLab. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
