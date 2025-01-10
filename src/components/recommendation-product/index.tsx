import { Radio } from "antd";
import { FaStar } from "react-icons/fa";
import "./index.scss";
interface RecommendationProductProps {
  title?: string;
  name: string;
  img: string;
  note?: string;
  price: number;
  quantity?: string[];
  rate: number;
  discount?: number;
}

function RecommendationProduct({
  title,
  name,
  img,
  note,
  price,
  quantity,
  rate,
  discount,
}: RecommendationProductProps) {
  const options = [
    { label: "tuýt", value: "a" },
    { label: "chai", value: "b" },
  ];
  return (
    <div className="bg-[#F0F5F2] w-[270px] border border-[#D4DBE3] rounded-[30px] flex-col justify-center items-center">
      <div className="relative">
        <img src={img} className="mx-auto my-2 w-[80%] h-full object-cover" />
        {discount && (
          <div className="text-white text-[16px] bg-[#F0DA66] font-semibold max-w-max p-2 absolute top-9 right-0 rounded-l-[8px]">
            Giảm {discount}%
          </div>
        )}
      </div>
      <div className="bg-white rounded-[30px] p-5">
        <div className="product-quantity">
          <Radio.Group
            options={options}
            // onChange={onChange4}
            // value={value4}
            optionType="button"
            buttonStyle="solid"
            size="small"
            defaultValue="a"
          />
        </div>

        <div className="flex justify-between text-[13px] text-[#B5BCC8] pb-4">
          <p>{title}</p>
          <div className="flex justify-center items-center gap-[2px] text-center">
            <FaStar color="#FC853E" size={16} />
            <p>(4.5)</p>
          </div>
        </div>

        {/* To truncate text after two lines and add an ellipsis ==> line-champ-2 */}
        <h3 className="text-[16px] font-bold  line-clamp-2">{name}</h3>
        <div className="bg-[#EFEFEF] max-w-max p-1 rounded-lg text-[12px] text-[#6F6F6F] font-semibold mt-3">
          {note}
        </div>

        <div className="py-5 text-[16px] leading-5">
          <p className="font-bold">
            1.295.000đ <span className="font-semibold">/ Hộp</span>
          </p>
          <p className="line-through text-[#B5BCC8]">1.500.000đ</p>
        </div>

        <button className="w-full border border-[1.5px] border-[#02321C] rounded-full max-h-max p-2 font-bold text-sm">
          + Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}

export default RecommendationProduct;
