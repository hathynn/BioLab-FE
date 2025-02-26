import { FaStar } from "react-icons/fa";
import "./index.scss";
import useCartStore from "../../store/cartStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTES } from "../../constants/routes";
import { ProductType } from "../../types/product.type";

function RecommendationProduct({ ...product }: ProductType) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/" + PRODUCT_ROUTES.PRODUCT + "/" + `${product._id}`);
  };
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    const initProduct = {
      id: product._id,
      name: product.name,
      img: product.image_url?.[0],
      price: product.price,
      unit: product.unit,
      quantity: 1,
    };

    addToCart(initProduct);
    toast.success("Đã thêm sản phẩm vào giỏ hàng");
  };
  return (
    <div className=" cursor-pointer bg-[#F0F5F2] border border-[#D4DBE3] rounded-[30px] flex flex-col gap-4 justify-end items-center">
      <div className="h-auto" onClick={handleNavigate}>
        <img
          src={product.image_url?.[0]}
          className="mx-auto my-2 w-[80%] h-full object-cover"
        />
      </div>
      <div className="bg-white rounded-[30px] min-h-[320px] w-full p-5 flex flex-col justify-between">
        

        <div className="flex justify-between text-[13px] text-[#B5BCC8] pb-4">
          <p>{product.category?.category_name}</p>
          <div className="flex justify-center items-center gap-[2px] text-center">
            <FaStar color="#FC853E" size={16} />
            <p>(0)</p>
          </div>
        </div>

        {/* To truncate text after two lines and add an ellipsis ==> line-champ-2 */}
        <h3 className="text-[16px] font-bold  line-clamp-2">{product.name}</h3>
        <div className="bg-[#EFEFEF] max-w-max px-2 p-1 rounded-lg text-[12px] text-[#6F6F6F] font-semibold mt-3">
          {product?.note || "Hộp 10 viên"}
        </div>

        <div className="py-5 text-[16px] leading-5">
          <p className="font-bold">
          {product.price?.toLocaleString().replace(/,/g, ".")}
            <span className="font-semibold">/ {product.unit}</span>
          </p>
        </div>

        <div>
          <button
            onClick={handleAddToCart}
            className="w-full  border-[1.5px] border-[#02321C] rounded-full max-h-max p-2 font-bold text-sm hover:bg-slate-200"
          >
            + Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecommendationProduct;
