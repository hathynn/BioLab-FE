import { CiMedicalCase } from "react-icons/ci";
import { FiRotateCw } from "react-icons/fi";
import { AiOutlineFire } from "react-icons/ai";
import { IoGiftOutline } from "react-icons/io5";




function FeatureBar() {
  const features = [
    {
      icon:<CiMedicalCase className="text-customGreen text-5xl "/>,
      title: "Thuốc chính hãng",
      description: "Đa dạng và chuyên sâu",
    },
    {
      icon: <FiRotateCw className="text-customGreen text-4xl"/>,
      title: "Đổi trả trong 30 ngày",
      description: "Kể từ ngày mua hàng",
    },
    {
      icon: <AiOutlineFire className="text-customGreen text-4xl"/>,
      title: "Cam kết 100%",
      description: "Chất lượng sản phẩm",
    },
    {
      icon: <IoGiftOutline className="text-customGreen text-4xl ml-6"/>,
      title: "Miễn phí vận chuyển",
      description: "Theo chính sách giao hàng",
    },
  ];

  return (
    <div className="flex justify-between w-full items-center py-7  border border-gray-400 rounded-2xl bg-white shadow-sm">
  {features.map((feature, index) => (
    <div
      key={index}
      className={`flex items-center gap-10 ${
        index !== features.length - 1 ? "border-r border-gray-300 pl-11  pr-20" : "pr-20"
      }`}
    >
      <div className="text-green-500 text-2xl">{feature.icon}</div>
      <div className="text-left">
        <h3 className="font-semibold text-gray-800">{feature.title}</h3>
        <p className="text-sm text-gray-600">{feature.description}</p>
      </div>
    </div>
  ))}
</div>

  );
}

export default FeatureBar;
