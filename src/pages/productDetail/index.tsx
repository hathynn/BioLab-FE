import { useEffect, useState } from "react";
import RatingStars from "../../components/rating-star";
import "./index.scss";
import { PiClockClockwise } from "react-icons/pi";

import {
  Breadcrumb,
  Carousel,
  Collapse,
  CollapseProps,
  Radio,
  Tabs,
  TabsProps,
} from "antd";
import { BsHeart } from "react-icons/bs";
import ProductReviews from "../../components/product-review";
import RecommendationProduct from "../../components/recommendation-product";
import FeatureBar from "../../components/feature-bar";
import { ProductType } from "../../types/product.type";
import useProductService from "../../services/useProductService";
import { useParams } from 'react-router-dom';


const ProductDetail = () => {
  const { getProducts } = useProductService();
  const { getProductById } = useProductService();
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [product, setProduct] = useState<ProductType>();
  const { id } = useParams();

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductDetail = async () => {
    try {
      if (id) {
        const response = await getProductById(id);
        setProduct(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const options = [
    { label: "Hộp ", value: "a" },
    { label: "Vỉ", value: "b" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataDetail = async () => {
      await fetchProductDetail();
    };
    fetchDataDetail();
  }, [id, getProductById]);

  const DescribeProduct = () => {
    return (
      <div className="pt-4 mr-10">
        <h1 className="text-xl font-bold ">Mô tả sản phẩm</h1>
        <p className="text-sm my-4 text-justify">
          {product?.details?.map((detail, index) => (
            <div key={index} className="detail-section">
              {detail.title === "Mô tả sản phẩm" && (
                <>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: detail.content }}
                  />
                </>
              )}
            </div>
          ))}
        </p>
      </div>
    );
  };

  const IngredientProduct = () => {
    return (
      <div className="pt-4 mr-10">
        <h1 className="text-xl font-bold ">Thành phần</h1>
        <p className="text-sm my-4 text-justify">
          {product?.details?.map((detail, index) => (
            <div key={index} className="detail-section">
              {detail.title === "Thành phần" && (
                <>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: detail.content }}
                  />
                </>
              )}
            </div>
          ))}
        </p>
      </div>
    );
  };

  const UsageProduct = () => {
    return (
      <div className="pt-4 mr-10">
        <h1 className="text-xl font-bold ">Công dụng</h1>
        <p className="text-sm my-4 text-justify">
          {product?.details?.map((detail, index) => (
            <div key={index} className="detail-section">
              {detail.title === "Công dụng" && (
                <>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: detail.content }}
                  />
                </>
              )}
            </div>
          ))}
        </p>
      </div>
    );
  };

  const SideEffectProduct = () => {
    return (
      <div className="pt-4 mr-10">
        <h1 className="text-xl font-bold ">Tác dụng phụ</h1>
        <p className="text-sm my-4 text-justify">
          {product?.details?.map((detail, index) => (
            <div key={index} className="detail-section">
              {detail.title === "Tác dụng phụ" && (
                <>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: detail.content }}
                  />
                </>
              )}
            </div>
          ))}
        </p>
      </div>
    );
  };

  const NoteProduct = () => {
    return (
      <div className="pt-4 mr-10">
        <h1 className="text-xl font-bold ">Lưu ý</h1>
        <p className="text-sm my-4 text-justify">
          {product?.details?.map((detail, index) => (
            <div key={index} className="detail-section">
              {detail.title === "Lưu ý" && (
                <>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: detail.content }}
                  />
                </>
              )}
            </div>
          ))}
        </p>
      </div>
    );
  };

  const PreserveProduct = () => {
    return (
      <div className="pt-4 mr-10">
        <h1 className="text-xl font-bold ">Bảo quản</h1>
        <p className="text-sm my-4 text-justify">
          {product?.details?.map((detail, index) => (
            <div key={index} className="detail-section">
              {detail.title === "Bảo quản" && (
                <>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: detail.content }}
                  />
                </>
              )}
            </div>
          ))}
        </p>
      </div>
    );
  };


  // const handleQuantityChange = (value: number) => {
  //   if (value > 0) setQuantity(value);
  // };

  const menu: TabsProps["items"] = [
    {
      label: `Mô tả sản phẩm`,
      key: "1",
      children: <DescribeProduct />,
    },
    {
      label: `Thành phần`,
      key: "2",
      children: <IngredientProduct />,
    },
    {
      label: `Công dụng`,
      key: "3",
      children: <UsageProduct />,
    },
    {
      label: `Tác dụng phụ`,
      key: "4",
      children: <SideEffectProduct />,
    },
    {
      label: `Lưu ý`,
      key: "5",
      children: <NoteProduct />,
    },
    {
      label: `Bảo quản`,
      key: "6",
      children: <PreserveProduct />,
    },
  ];
  const text = (
    <p style={{ paddingInlineStart: 24 }}>
      Những trường hợp nên dùng: Phụ nữ sau 30 tuổi và phụ nữ tiền
      mãn kinh. Phụ nữ da bị sạm nám, suy giảm sinh lý, khô âm đạo, rối loạn
      kinh nguyệt, bốc hỏa, mất ngủ. Phụ nữ dưới 30 tuổi và phụ nữ sau khi sinh
      nở nếu có dấu hiệu thiếu hụt hoặc rối loạn nội tiết tố nữ.
    </p>
  );
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label:
        "Những ai nên dùng thực phẩm chức năng",
      children: text,
    },
    {
      key: "2",
      label:
        "Những ai nên dùng thực phẩm chức năng cân bằng nội tiết tố",
      children: text,
    },
    {
      key: "3",
      label:
        "Những ai nên dùng thực phẩm chức năng cân bằng",
      children: text,
    },
  ];

  return (
    <>
      <Breadcrumb
        className="ml-12 mt-6 text-sm"
        items={[
          {
            title: <a href="/home">Trang chủ</a>,
          },
          {
            title: <a href="#">Thực phẩm chức năng</a>,
          },
          {
            title: <p className="font-bold">Nội tiết tố </p>,
          },
        ]}
      />
      <div className="detail-product ">
        <div className="p-4 mb-7 md:p-8">
          <div className="max-w-6xl mx-auto rounded-lg ">
            <div className="grid md:grid-cols-2  gap-6 p-6">
              <div className="flex flex-col justify-start items-center space-y-3">
                <div className="w-[70%]">
                  <Carousel arrows infinite={false} dots={true}>
                    <img
                      src={product?.image_url?.join("")}
                      alt="Product"
                      className="rounded-lg w-full"
                    />

                    <img
                      src="https://bizweb.dktcdn.net/100/011/344/products/omega3-a223b96b-88f8-45b6-9c0e-89c7db4cd048.jpg?v=1639712259133"
                      alt="Product"
                      className="rounded-lg w-full"
                    />
                    <img
                      src="https://bizweb.dktcdn.net/100/011/344/products/omega3-a223b96b-88f8-45b6-9c0e-89c7db4cd048.jpg?v=1639712259133"
                      alt="Product"
                      className="rounded-lg w-full"
                    />
                    <img
                      src="https://bizweb.dktcdn.net/100/011/344/products/omega3-a223b96b-88f8-45b6-9c0e-89c7db4cd048.jpg?v=1639712259133"
                      alt="Product"
                      className="rounded-lg w-full"
                    />
                  </Carousel>
                </div>
                <div className="flex space-x-2">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/5444/5f36/4d8a152aa8343d7f9ecf66b67784bdc8?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Xx~orRdSMtjbu0Bp7ulbGcxlj4WnIzaznfidKJXNim16lEgDI9Qv~mgw1iC78~dEfC9lflULi959IqyVTnd-lSL3ivZsXJlFKkxmXj0flSnb3Kkvj9gxCZzMx7pP-29YEkUnH9uV83pUBWCO~0GPyWCxVNmYqPUydLVtm9-EU0gwkwlBxNJbNALkoJuXCbFgwmOSXM1EwM0ty6emd0rEstjAMi4CgtSRmxjwDt5f8SCO7FgysgMi9bXDniS9Yz~dnha7v-NMfWGRoFQfHhkeIfaAI2qMPC9jVocKZpRmajEmhxuy6ov5r4h0uhC2u3DLnCCBSP6Bi4O2V9bXXip2Fg__"
                    alt="Thumbnail 1"
                    className="rounded-lg w-32 h-32 object-cover"
                  />
                  <img
                    src="https://bizweb.dktcdn.net/100/421/115/products/3-df21fc2a-f256-4144-a537-f4aa586f2a29.jpg?v=1680864997713"
                    alt="Thumbnail 2"
                    className="rounded-lg w-32 h-32 object-cover"
                  />
                  <img
                    src="https://bizweb.dktcdn.net/100/421/115/products/3-df21fc2a-f256-4144-a537-f4aa586f2a29.jpg?v=1680864997713"
                    alt="Thumbnail 3"
                    className="rounded-lg w-32 h-32 object-cover"
                  />
                  <img
                    src="https://s3-alpha-sig.figma.com/img/5444/5f36/4d8a152aa8343d7f9ecf66b67784bdc8?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Xx~orRdSMtjbu0Bp7ulbGcxlj4WnIzaznfidKJXNim16lEgDI9Qv~mgw1iC78~dEfC9lflULi959IqyVTnd-lSL3ivZsXJlFKkxmXj0flSnb3Kkvj9gxCZzMx7pP-29YEkUnH9uV83pUBWCO~0GPyWCxVNmYqPUydLVtm9-EU0gwkwlBxNJbNALkoJuXCbFgwmOSXM1EwM0ty6emd0rEstjAMi4CgtSRmxjwDt5f8SCO7FgysgMi9bXDniS9Yz~dnha7v-NMfWGRoFQfHhkeIfaAI2qMPC9jVocKZpRmajEmhxuy6ov5r4h0uhC2u3DLnCCBSP6Bi4O2V9bXXip2Fg__"
                    alt="Thumbnail 1"
                    className="rounded-lg w-32 h-32 object-cover"
                  />
                </div>
              </div>

              <div>
                <h1 className=" mb-22">
                  Thương hiệu:&nbsp;
                  <span className="text-green-600 font-extrabold">{product?.brand.brand_name}</span>
                </h1>
                <h1 className="text-2xl font-bold text-gray-800">
                  {product?.name}
                </h1>
                <div className="flex items-center space-x-2 mt-2">
                  <RatingStars rating={4} />
                  <span className="text-sm text-gray-600">(150 đánh giá)</span>
                  <div className="bg-gradient-to-r from-[#62D985] to-[#ABFFC5] text-xs text-white p-1 px-2 rounded-full">
                    Còn hàng
                  </div>
                </div>
                <h1 className="flex text-black font-bold text-xl mt-4">
                  {product?.price} &nbsp;
                  <span className="font-semibold text-green-900">/ {product?.unit}</span>
                </h1>
                <h1 className="line-through font-semibold text-lg text-gray-400">
                  500.000₫
                </h1>

                <div className="space-y-4 mt-6">
                  <div className="flex items-start">
                    <p className="w-1/4 text-sm font-bold">Chọn đơn vị</p>
                    <p className="w-3/4 text-sm">
                      {/* <Radio.Group
                      options={options}
                      optionType="button"
                      buttonStyle="solid"
                      size="small"
                      defaultValue="a"
                    /> */}
                      <Radio.Group
                        options={options}
                        optionType="button"
                        buttonStyle="solid"
                        size="small"
                        defaultValue="a"
                      />
                    </p>
                  </div>

                  <div className="flex items-start">
                    <p className="w-1/4 text-sm font-bold">Danh mục</p>
                    <p className="w-3/4 text-sm text-green-600 hover:text-green-300 cursor-pointer">
                      {product?.category?.category_name}
                    </p>
                  </div>

                  <div className="flex items-start">
                    <p className="w-1/4 text-sm font-bold">Dạng bào chế</p>
                    <p className="w-3/4 text-sm">Viên nang mềm</p>
                  </div>

                  <div className="flex items-start">
                    <p className="w-1/4 text-sm font-bold">Nhà sản xuất</p>
                    <p className="w-3/4 text-sm">{product?.brand.brand_name}</p>
                  </div>

                  <div className="flex items-start">
                    <p className="w-1/4 text-sm font-bold">Thành phần</p>
                    <p className="w-3/4 text-sm text-justify">
                      Phụ liệu: Dầu đậu nành, Gelatin, Glycerin
                    </p>
                  </div>

                  <div className="flex items-start">
                    <p className="w-1/4 text-sm font-bold">Mô tả ngắn</p>
                    <p className="w-3/4 text-sm text-justify">
                      {product?.description}
                    </p>
                  </div>

                  <div className="flex items-start">
                    <p className="w-1/4 text-sm font-bold">Số đăng ký</p>
                    <p className="w-3/4 text-sm">9677/2021/ĐKSP</p>
                  </div>
                  <div className="flex items-start">
                    <p className="w-1/4 text-sm font-bold">Chọn số lượng</p>
                    <div className="w-3/4 text-sm">
                      <div className="flex items-center border-2 border-gray-400 rounded-full w-20 ">
                        <button
                          onClick={() => setQuantity(quantity - 1)}
                          className="w-8 h-full border-r-2 border-r-gray-400 text-black flex justify-center items-center hover:bg-gray-200 focus:outline-none rounded-l-full"
                        >
                          -
                        </button>

                        <span className="w-12 text-center text-black">
                          {quantity}
                        </span>

                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-8 h-full border-l-2 border-l-gray-400 text-black  flex justify-center items-center hover:bg-gray-200 focus:outline-none rounded-r-full"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  <button className=" w-2/5  px-6 py-3 bg-customGreen text-white rounded-lg shadow-md hover:bg-green-500">
                    Mua ngay
                  </button>
                  <button className=" w-2/5  px-6 py-3 bg-customLightGreen text-green-600 border-customGreen border-2 rounded-lg shadow-md hover:bg-customGreen hover:text-white">
                    Thêm vào giỏ hàng
                  </button>
                  <span className="text-2xl pt-4">
                    <BsHeart />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-10">
          <FeatureBar />
        </div>
        <Tabs tabPosition={"left"} items={menu} className="w-full" />

        <div className="bg-gray-50 m-8 rounded-2xl p-6 mt-10 w-full">
          <h1 className="text-lg mb-3 font-bold">Câu hỏi thường gặp</h1>
          <Collapse items={items} bordered={false} defaultActiveKey={["1"]} />
        </div>
        <ProductReviews />
        <div className="mb-16 mt-16 ">
          <div className="flex justify-between ">
            <div className="flex gap-2">
              <PiClockClockwise className="text-4xl" />
              <h1 className="text-3xl font-bold">Sản phẩm đã xem </h1>
            </div>
            <button className="bg-buttonColor text-gray-200 py-3 px-5 text-base rounded-full hover:bg-black hover:text-white ">
              Xem tất cả ➜
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-10">
            {products?.map((product, index) => (
              <RecommendationProduct
                key={index}
                _id={product._id}
                note={product.note}
                category={product.category}
                name={product.name}
                image_url={product.image_url}
                price={product.price}
                stock={product.stock}
                brand={product.brand}
                unit={product.unit}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
