import { Button, Carousel, Col, Drawer, Flex, Input, Row, Space } from "antd";
import "./index.scss";
import { RiVipCrown2Fill } from "react-icons/ri";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import RecommendationProduct from "../../components/recommendation-product";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import MediaInfoCard from "../../components/mediaInfoCard";
import { useNavigate } from "react-router-dom";
import { USER_ROUTES } from "../../constants/routes";
import { useEffect, useState } from "react";
import { sendMsgToOpenAI } from "../../config/openAI";
import { marked } from "marked";
import { BsSendFill } from "react-icons/bs";
import useBrandService from "../../services/useBrandService";
import { BrandType } from "../../types/brand.type";
import { ProductType } from "../../types/product.type";
import useProductService from "../../services/useProductService";

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
      brands.map(async (brand) => {
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
    if (brands.length > 0) {
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
              <img
                src="https://s3-alpha-sig.figma.com/img/b128/3697/e5f3d2460105e95b6c1ca97681048d62?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Fnv~jumJcq103T4J6WTiBIbb8dORQBPP00MKt6m20DFEa3mHCT95p28i0b-NgFn38H~wbRgeXevgJEsw5sxjYLxLqiCPFrOJT99MSK20GbrLsaO-JyeU2p-RXh~0auSCfKXnIniK785iNt8PXQDTEDevniVbzmU9Pbst5DBJCxz4co8k8aLCvCvoEhBZB9LlVwStjCYj1fiIFEuMCnLqAKFdT5HDEB0jcQReDKMdUqkck7~IwNeldqQ4dkiUaL2JTOR66knxsAVFUQviGLplzD28yihU3DiQbGmow0EW-T6ZIzBweHQ-aIuzUr4X-w3SLV~LUSuYBZDTt84Eq3~8zA__"
                className="object-cover w-full h-[30vh] md:h-[calc(50vh+16px)] rounded-2xl"
              />
              <img
                src="https://cdn.nhathuoclongchau.com.vn/unsafe/1920x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Banner_Web_PC_1610x492_ba2ba6f811.png"
                className="object-cover w-full h-[30vh] md:h-[calc(50vh+16px)] rounded-2xl"
              />
              <img
                src="https://s3-alpha-sig.figma.com/img/b128/3697/e5f3d2460105e95b6c1ca97681048d62?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Fnv~jumJcq103T4J6WTiBIbb8dORQBPP00MKt6m20DFEa3mHCT95p28i0b-NgFn38H~wbRgeXevgJEsw5sxjYLxLqiCPFrOJT99MSK20GbrLsaO-JyeU2p-RXh~0auSCfKXnIniK785iNt8PXQDTEDevniVbzmU9Pbst5DBJCxz4co8k8aLCvCvoEhBZB9LlVwStjCYj1fiIFEuMCnLqAKFdT5HDEB0jcQReDKMdUqkck7~IwNeldqQ4dkiUaL2JTOR66knxsAVFUQviGLplzD28yihU3DiQbGmow0EW-T6ZIzBweHQ-aIuzUr4X-w3SLV~LUSuYBZDTt84Eq3~8zA__"
                className="object-cover w-full h-[30vh] md:h-[calc(50vh+16px)] rounded-2xl"
              />
            </Carousel>
          </div>
          <div className="md:flex hidden flex-col gap-4">
            <div className="h-[30vh] md:h-[25vh]">
              <img
                src="https://s3-alpha-sig.figma.com/img/069f/178d/e59afbefcacd17912267d6a6991cc15c?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=uPsXDPvpCxIpux1jMAqXpY7ue6-3Tlp6u0ZUJXuzpUzxsoIZzUUPXhoAK4G~bk~vYMuZJFccVeIIGcH4zYaLhXFV6vyXEv2xF7hawBf1rNsI3JiN0486jlTzis~vlOE3whTd6u2OnG72eBj8mAOILXCwc9sbefGrIKzYnDXrTERa5bTaSmHtmXz0wqMcNnfvKvfvsOv3UlKn~HDtPXimodPdc-H2OBBIRER2ne0CbQ6c2B9xDO6pKJdic-Qa3VQrCStM4BMks4aBM7Ibd0cmmcoL1RSsGV4f5SrD8doNUzwn0dZjfNO~aY5HigcJKumueLuf8nzd4T-DOd9kF43YXA__"
                className="rounded-2xl w-full h-full object-cover "
                alt="Image 1"
              />
            </div>
            <div className="h-[30vh] md:h-[25vh]">
              <img
                src="https://s3-alpha-sig.figma.com/img/4c81/3a4c/51d8108e0a9edaa3d6a1fde795b3f1ac?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YOcvyHI26b48IiMS6b8wNRwrflhymo5ZpLVhtC8nIgACqweBqGXES~MH8W~954HXKd4E7Yy2QkI4HsHRKPT3mA2-3K~gf8MxUkbMtysRB~uvbFdm0yfWm2E6VOMUWsrgtvUQOK1PaXNoHazeDKZWuIIdOTyLc-I9UVgb1FJxq~~mZU1MsTcX60bud~UVOS0pl6oHNOnphvqVRMR7anc41fyaqr6kC3C96QsjCUgV338iBmFJc-ChBCIm2rR~I6kATG2c69b6a-g5DSrls7cpG2zYO9tVCHQe45gNZh7Tn2A4wX1WQyCeH4ahmsS195MUse-8S3lsi7cZRFxyoaB6vQ__"
                className="rounded-2xl w-full h-full object-cover "
                alt="Image 2"
              />
            </div>
          </div>
        </div>

        <div className="md:flex hidden justify-center items-center gap-4 h-[335px] pt-7">
          <img
            src="https://s3-alpha-sig.figma.com/img/b24e/d6b4/3baa0caeaa29aaab596c684ab438ac20?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=t72kRf6FaZadqWuzYbZeo4bBk27FixJ6EWeHYoXekwSh50vDLWOHDoroFODnt7LcAY5QoVxTlcszYVJmKdSr9LXKx1ard0AwzDJfPRblhGNxgI8SYGH85sZE6RIVQvPidiRKXPSDpNfRDEYbjattk4xARaNT-o9vKcPFgx3PdPz9yUebRtq-Ehty2MeEHiMfisplaeydWKvABrP~wyvaouoxGkT57VryxF0-bBDYf1tkz2XQ5IALkR15-poo5dfGQR2DLQKcV-MdqMlhMlMLDaYCnBbiBHbhr0ZtiV1~VkD8xkb2tV6w0p68sYzHN8OWHAOP-bRQ0sGDt9OvY8GGPQ__"
            className="rounded-2xl w-[30%] h-full object-cover "
            alt="Image 2"
          />
          <img
            src="https://s3-alpha-sig.figma.com/img/b49f/1b80/e9ad7f0f94224a4118fddda8131b9432?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=CD8fR23ViH98sC00DihpaJuzzeyR~F22wZUgZLUfI-YTctQ~KF8k54GUNHXPz5odF~SasvuZcsriF8lm7McwgZ~aq067IzVrzwQ-522yFqLNtR~k8R97ts4r9FI1JDTzGlIFcpcja2kCST-C2DlFUt8ZA8eziO1MwDSV0nIKJvXxyJcQI9l8o0NVcgdFYEc3D74qc6V6474lJQfgycVIma4YL8qXht3kAk-~UBrGHA0SuxQAXl9acW3Bd6Ys7nE5uN47YgBXPWT7050nfLkHLIuxJnFO24~Hpn2XSk0PInx8dtpMEWYAyaeZ4STrC61~940~R5clOPIzOCS7qOCuOg__"
            className="rounded-2xl w-[30%] h-full object-cover "
            alt="Image 2"
          />
          <img
            src="https://s3-alpha-sig.figma.com/img/2810/afb8/d6cce381df614aa5c564c287bdc35c88?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=oEiG-ctE9d~yLtf5lfsw6YHbUCMEVOzarmROw4igHGPpNRh4~EbfjwUd~fI6ghPIjUsPsihKBDxZUTmoijYmBX3SOIQfhFL9KrYzPlzjtPNZX~B3yepTS3aC1YLAhzLDih1ofi6ezwp50NSFxprdmzqiTag488NvS~VPF8zcRMOsxh0C3QaH3Mj2XKHNG4HCcna-T2BFT-7W3YWys4KKLTaPe-PQtMHnSoLe3urIVFZVn7y4eSabzQaXtc1lx~fTqPjsJ4Bbt2~U-jhYLdKkvkepM-aKNfdX8uJTa~IdVcmWtHRpd7OJBZN5rzqklcOMfRUR8pjaH6-JElmT5DgOEw__"
            className="rounded-2xl w-[40%] h-full object-cover "
            alt="Image 2"
          />
        </div>
      </div>
      <div className="bg-gradient-to-b from-[#B1F0B0] to-[#5BD07E] h-full w-full rounded-3xl">
        <div className="p-10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl lg:text-4xl text-white font-normal flex justify-center items-center gap-2">
              <RiVipCrown2Fill /> Đề xuất của chuyên gia
            </h1>
            <button className="bg-[#373737] text-white text-[16px] rounded-full p-3 px-4 flex justify-between items-center gap-3 text-nowrap">
              Xem tất cả <FaArrowRight />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-10">
            {products.map((product, index) => (
              <RecommendationProduct
                key={index}
                _id={product._id}
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
              <div className="flex justify-start items-center gap-3">
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
              <MediaInfoCard tags={true} />
            </div>
            <div className="bg-white h-full w-full rounded-3xl">
              <div className="p-10">
                <div className="flex justify-between items-center">
                  <h1 className="text-4xl text-[#FC853E] font-normal flex justify-start items-center gap-2">
                    <AiFillLike /> Sản phẩm theo đối tượng
                  </h1>
                  <button className="bg-gradient-to-l from-[#FC853E] to-[#F05334] text-white text-[16px] font-semibold rounded-full p-3 px-4 flex justify-between items-center gap-3 text-nowrap">
                    Xem tất cả <FaArrowRight />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-10">
                  {products.map((product, index) => (
                    <RecommendationProduct
                      key={index}
                      _id={product._id}
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
