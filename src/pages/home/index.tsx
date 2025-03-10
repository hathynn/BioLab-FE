import { Button, Carousel, Drawer, Input } from "antd";
import "./index.scss";
import { RiVipCrown2Fill } from "react-icons/ri";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import RecommendationProduct from "../../components/recommendation-product";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import MediaInfoCard from "../../components/mediaInfoCard";
import { data, useNavigate } from "react-router-dom";
import { PRODUCT_ROUTES, USER_ROUTES } from "../../constants/routes";
import { useEffect, useState } from "react";
import { sendMsgToOpenAI } from "../../config/openAI";
import { marked } from "marked";
import { BsSendFill } from "react-icons/bs";
import useBrandService from "../../services/useBrandService";
import { BrandType } from "../../types/brand.type";
import { ProductType } from "../../types/product.type";
import useProductService from "../../services/useProductService";
import IMAGE_URLS from "../../constants/imageUrls";
import { useQuery } from "@tanstack/react-query";

function HomePage() {
  const { getBrands, getBrandFeatured } = useBrandService();
  const { getProducts } = useProductService();
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [features, setFeatures] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(
    "Xin chào bạn cần giúp đỡ gì không?"
  );
  const { data: posts } = useQuery({ queryKey: ["posts"] });


  const fetchBrands = async () => {
    try {
      const response = await getBrands();
      setBrands(response.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllFeatures = async () => {
    const featureMap: { [key: string]: string } = {};
    await Promise.all(
      brands?.map(async (brand) => {
        featureMap[brand._id] =
          ((await getBrandFeatured(brand._id)) as ProductType)
            ?.image_url?.[0] || "";
      })
    );
    setFeatures(featureMap);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchBrands();
      await fetchProducts();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (brands?.length > 0) {
      fetchAllFeatures();
    }
  }, [brands]);

  async function handleSendMessage() {
    setMessage("");
    setQuestion(message);
    setResponse("");
    await sendMsgToOpenAI(message, (chunk) => {
      setResponse((prevResponse) => prevResponse + chunk);
    });
  }

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/" + USER_ROUTES.BLOG);
  };

  return (
    <>
      <div className="homepage">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div className="flex flex-col md:col-span-2">
            <Carousel
              arrows
              infinite={true}
              dots={false}
              className="h-[30vh] md:h-[calc(50vh+16px)] w-full"
            >
              {IMAGE_URLS.HOME.BANNERS?.map((img, _) => (
                <img
                  loading="lazy"
                  src={img}
                  className="object-cover w-full h-[30vh] md:h-[calc(50vh+16px)] rounded-2xl"
                />
              ))}
            </Carousel>
          </div>
          <div className="md:flex hidden flex-col gap-4">
            {IMAGE_URLS.HOME.INTRO.map((img, _) => (
              <div className="h-[30vh] md:h-[25vh]">
                <img
                  src={img}
                  className="rounded-2xl w-full h-full object-cover "
                  alt="Image 1"
                />
              </div>
            ))}
          </div>
        </div>
        {posts?.length > 0 && (
          <div className="md:flex hidden justify-center items-center gap-4 h-[335px] pt-7">
            <img
              src={posts[0]?.banner}
              className="rounded-2xl w-[30%] h-full object-cover "
              alt="Image 2"
            />
            <img
              src={posts[1]?.banner}
              className="rounded-2xl w-[30%] h-full object-cover "
              alt="Image 2"
            />
            <img
              src={posts[2]?.banner}
              className="rounded-2xl w-[40%] h-full object-cover "
              alt="Image 2"
            />
          </div>
        )}
      </div>
      <div className="bg-gradient-to-b from-[#B1F0B0] to-[#5BD07E] h-full w-full rounded-3xl">
        <div className="p-10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl lg:text-4xl text-white font-normal flex justify-center items-center gap-2">
              <RiVipCrown2Fill /> Đề xuất của chuyên gia
            </h1>
            <button
              onClick={() => navigate("/" + PRODUCT_ROUTES.PRODUCT)}
              className="bg-[#373737] text-white text-[16px] rounded-full p-3 px-4 flex justify-between items-center gap-3 text-nowrap"
            >
              Xem tất cả <FaArrowRight />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-10">
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
        <div className="bg-white h-full w-full rounded-3xl">
          <div className="p-10">
            <h1 className="text-4xl text-[#565656] font-normal flex justify-start items-center gap-2">
              <FaHeart /> Thương hiệu được yêu thích nhất
            </h1>
            <div className="p-10">
              <div className="container flex justify-center items-center p-2 w-full h-[300px]">
                {brands?.map((p, index) => (
                  <div
                    className="flex flex-col justify-between items-center gap-2 w-1/5 h-full"
                    key={index}
                  >
                    <img
                      src={p.image_url}
                      className="h-24 object-contain object-center"
                    />
                    <img
                      src={features[p._id] ?? "Loading..."}
                      className="h-auto object-contain object-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-l from-[#99DBF7] to-[#90CCFA] h-full w-full rounded-3xl">
            <div className="p-10">
              <div className="flex justify-start items-center gap-3 pb-6">
                <h1 className="text-4xl text-white font-normal flex justify-start items-center gap-2">
                  <IoIosAddCircle /> Cẩm nang sức khỏe
                </h1>
                <button
                  onClick={handleNavigate}
                  className="bg-white text-[#006DC0] text-[16px] font-semibold rounded-full p-3 px-4 flex justify-between items-center gap-3 hover:bg-slate-200 text-nowrap"
                >
                  Xem tất cả <FaArrowRight />
                </button>
              </div>
              <MediaInfoCard />
            </div>
            <div className="bg-white h-full w-full rounded-3xl">
              <div className="p-10">
                <div className="flex justify-between items-center">
                  <h1 className="text-4xl text-[#FC853E] font-normal flex justify-start items-center gap-2">
                    <AiFillLike /> Sản phẩm theo đối tượng
                  </h1>
                  <button
                    onClick={() => navigate("/" + PRODUCT_ROUTES.PRODUCT)}
                    className="bg-gradient-to-l from-[#FC853E] to-[#F05334] text-white text-[16px] font-semibold rounded-full p-3 px-4 flex justify-between items-center gap-3 text-nowrap"
                  >
                    Xem tất cả <FaArrowRight />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-10">
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
          </div>
        </div>
      </div>
      <Button
        className="h-fit w-fit px-4 py-3 flex justify-center border-none items-center gap-2 cursor-pointer bg-emerald-400 shadow-xl rounded-full fixed bottom-9 right-8 text-white"
        onClick={showDrawer}
      >
        <span className="absolute -translate-y-6 -translate-x-11 flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-200 opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full bg-emerald-200"></span>
        </span>

        <span>Tư vấn với AI</span>
      </Button>
      <Drawer
        title="Biolab AI"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingTop: 10,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <div
          className="flex flex-col space-y-4 overflow-y-auto p-4"
          style={{ height: "100%" }}
        >
          <div className={question ? "flex justify-end" : "hidden"}>
            <div className="bg-emerald-500 text-white p-2 rounded-xl max-w-[80%] mb-2">
              {question}
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-gray-100 text-black p-2 rounded-xl max-w-[80%] mb-2">
              <div
                className="message-response"
                style={{
                  wordWrap: "break-word",
                  lineHeight: "1.5",
                  padding: "8px",
                }}
                dangerouslySetInnerHTML={{ __html: marked(response) }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4 p-4">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhập câu hỏi ở đây"
            className="w-full rounded-full"
          />
          <Button
            onClick={handleSendMessage}
            className="ml-2 w-fit rounded-full"
          >
            <BsSendFill />
          </Button>
        </div>
      </Drawer>
    </>
  );
}

export default HomePage;
