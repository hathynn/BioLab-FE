import React from "react";
import { CiFilter } from "react-icons/ci";

import FilterSidebar from "../../components/product-filter";
import RecommendationProduct from "../../components/recommendation-product";

const ProductPage: React.FC = () => {
  const data = [
    {
      title: "Thực phẩm chức năng",
      name: "Siro ho thảo mộc Tanacol siro ho cảm cho trẻ sơ sinh",
      img: "https://firebasestorage.googleapis.com/v0/b/insta-clone-48dad.appspot.com/o/Frame%2011.png?alt=media&token=6e79df5f-8d6b-4633-847e-6c89f8231b77",
      note: "Hộp 60 viên",
      price: 1295000,
      quantity: ["60 viên"],
      rate: 4.5,
    },
    {
      title: "Thực phẩm chức năng",
      name: "Bột Hapacol 150 DHG giảm đau, hạ sốt (24 gói)",
      img: "https://firebasestorage.googleapis.com/v0/b/insta-clone-48dad.appspot.com/o/a.png?alt=media&token=26bf348e-28bc-45cc-ba99-39d2864f57f1",
      note: "Hộp 24 gói",
      price: 1295000,
      quantity: ["60 viên"],
      rate: 4.5,
      discount: 25,
    },

    {
      title: "Mỹ phẩm",
      name: "Sữa rửa mặt Reihaku Hatomugi Acne Care and Facial Washing ngừa mụn, dưỡng ẩm và làm sáng da (130g)",
      img: "https://firebasestorage.googleapis.com/v0/b/insta-clone-48dad.appspot.com/o/b.png?alt=media&token=a27a383e-b7b1-4789-9e4f-7584ba22a888",
      note: "Chai 140ml",
      price: 1295000,
      quantity: ["60 viên"],
      rate: 4.5,
      discount: 20,
    },
    {
      title: "Mỹ phẩm",
      name: "Sữa rửa mặt Reihaku Hatomugi Acne Care and Facial Washing ngừa mụn, dưỡng ẩm và làm sáng da (130g)",
      img: "https://firebasestorage.googleapis.com/v0/b/insta-clone-48dad.appspot.com/o/b.png?alt=media&token=a27a383e-b7b1-4789-9e4f-7584ba22a888",
      note: "Chai 140ml",
      price: 1295000,
      quantity: ["60 viên"],
      rate: 4.5,
      discount: 20,
    },
  ];

  return (
    <div className="flex p-10">
      <FilterSidebar />
      <div className="flex-1">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-semibold">Danh sách sản phẩm</h1>
          <div className="space-x-2 flex items-center">
            <h1>Sắp xếp theo </h1>
            {["Bán chạy", "Giá thấp", "Giá cao"].map((sort) => (
              <button
                key={sort}
                className="px-3 py-1 border border-black rounded-2xl font-bold text-sm hover:bg-gray-200"
              >
                {sort}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {data.map((product, index) => (
            <RecommendationProduct
              key={index}
              title={product.title}
              name={product.name}
              img={product.img}
              note={product.note}
              price={product.price}
              quantity={product.quantity}
              rate={product.rate}
              discount={product.discount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
