import FeatureBar from "../../components/feature-bar";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { motion } from "framer-motion";
function About() {
  const tags = [
    "Chất lượng",
    "Phát triển bền vững",
    "Khách hàng là trọng tâm",
    "Minh bạch",
  ];
  return (
    <>
      <div className="bg-[url('/src/assets/bgAbout.png')] object-cover object-center bg-cover bg-center h-full min-h-fit w-full">
        <Header navbarType="green" />
        <div className="relative pl-10">
          <div className="flex justify-center items-center">
            <motion.img
              src="/src/assets/vitamin.png"
              className="z-10"
              initial={{ y: -200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
          <div className="w-1/3 text-white font-light text-[17px] leading-6 absolute bottom-[20%] pl-10">
            <p>
              BioLab là một thương hiệu tiên phong trong lĩnh vực phân phối thực
              phẩm chức năng tại Việt Nam, chuyên cung cấp các sản phẩm bổ sung
              dinh dưỡng được thiết kế riêng để phù hợp với thể trạng của người
              Việt.
            </p>
            <p className="pt-5">
              Chúng tôi cam kết mang đến những giải pháp chăm sóc sức khỏe chất
              lượng cao, minh bạch về nguồn gốc và thành phần, giúp khách hàng
              an tâm trên hành trình nâng cao sức khỏe và cải thiện chất lượng
              cuộc sống.
            </p>
          </div>
        </div>
        {/* <div className="absolute top-1/3 p-5 ">
          <h1 className="pl-8 text-9xl leading-[170px] font-semibold bg-gradient-to-b from-white to-[#FFFFFF1A] bg-clip-text text-transparent">
            SỨC KHỎE
          </h1>
        </div> */}
        <div className="absolute top-1/3 p-5 ">
          <motion.h1
            className="pl-8 text-9xl leading-[170px] font-semibold bg-gradient-to-b from-white to-[#FFFFFF1A] bg-clip-text text-transparent"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            SỨC KHỎE
          </motion.h1>
        </div>
        <div className="absolute top-[60%] left-[59%] p-5 ">
          <motion.h1
            className="text-9xl leading-[150px] font-semibold text-[#FFFFFFF2] "
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            NGƯỜI
          </motion.h1>
          <motion.h1
            className="-mt-2 text-9xl leading-[150px] font-semibold bg-gradient-to-b from-white to-[#FFFFFF1A] bg-clip-text text-transparent"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            VIỆT
          </motion.h1>
        </div>

        <div className="flex justify-center items-center p-5 py-20">
          <div className="w-[30%]">
            <h1 className="text-white text-[40px] text-left">Biolab đề cao</h1>

            <div className="flex flex-row justify-start items-center gap-4">
              {tags?.slice(0, 2).map((tag, index) => (
                <div
                  key={index}
                  className="bg-[#FFFFFF2E] border border-[2px] rounded-full max-w-fit px-[15px] py-[10px] text-sm font-bold text-white"
                >
                  {tag}
                </div>
              ))}
            </div>
            <div className="flex flex-row justify-start items-center gap-4 pt-3">
              {tags?.slice(2, 4).map((tag, index) => (
                <div
                  key={index}
                  className="bg-[#FFFFFF2E] border border-[2px] rounded-full max-w-fit px-[15px] py-[10px] text-sm font-bold text-white"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className="w-3/5 bg-white p-5 rounded-2xl">
            <h1 className="text-4xl text-[#373737] font-normal">Sứ mệnh</h1>
            <p className="text-[16px] leading-5 py-5">
              Chúng tôi tin rằng sức khỏe là nền tảng của một cuộc sống hạnh
              phúc và viên mãn. Với sứ mệnh nâng cao sức khỏe và chất lượng cuộc
              sống của cộng đồng, BioLab mang đến những sản phẩm dược phẩm và
              thực phẩm bổ sung an toàn, lành tính và hiệu quả. Chúng tôi hy
              vọng rằng, bằng các sản phẩm đạt tiêu chuẩn cao, BioLab sẽ góp
              phần tạo nên một cộng đồng khỏe mạnh, yêu đời và tràn đầy năng
              lượng tích cực.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;
