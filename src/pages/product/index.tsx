import React, { useEffect, useState } from "react";
// import { CiFilter } from "react-icons/ci";

import FilterSidebar from "../../components/product-filter";
import RecommendationProduct from "../../components/recommendation-product";
import useProductService from "../../services/useProductService";
import { ProductType } from "../../types/product.type";

const ProductPage: React.FC = () => {
  const { getProducts } = useProductService();
  const [products, setProducts] = useState<ProductType[]>([]);
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
    };
    fetchData();
  }, []);

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
          {products?.map((product, index) => (
            <RecommendationProduct
              key={index}
              _id={product?._id}
              note={product?.note}
              category={product?.category}
              name={product?.name}
              image_url={product?.image_url}
              price={product?.price}
              stock={product?.stock}
              brand={product?.brand}
              unit={product?.unit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
