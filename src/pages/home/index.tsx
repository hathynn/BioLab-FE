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
import { useState } from "react";
import { sendMsgToOpenAI } from "../../config/openAI";
import { marked } from "marked";
import { BsSendFill } from "react-icons/bs";

function HomePage() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(
    "Xin chào bạn cần giúp đỡ gì không?"
  );

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
  const data = [
    {
      id:"1",
      title: "Thực phẩm chức năng",
      name: "Siro ho thảo mộc Tanacol siro ho cảm cho trẻ sơ sinh",
      img: "https://firebasestorage.googleapis.com/v0/b/insta-clone-48dad.appspot.com/o/Frame%2011.png?alt=media&token=6e79df5f-8d6b-4633-847e-6c89f8231b77",
      note: "Hộp 60 viên",
      price: 1295000,
      quantity: ["60 viên"],
      rate: 4.5,
    },
    {
      id:"2",
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
      id:"3",
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
      id:"4",
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
      id:"5",
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

  const likes = [
    {
      brand_img:
        "https://s3-alpha-sig.figma.com/img/634f/df55/45765bbe06dbe09617e3c3e8ad650061?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gmbhqwoW94DARdl4kO7NbOetNXtzOuApLIoCIkPfxQEnVUFDDgVRQ28dg9x1T9CRtvZ1ezhKuPZdFMROcLGCI-EwzPqtv02hsyn3kTXbs5EgadXqVYvNNINyf~01D~Sj8vwuamcYSZPzBC0mYU1oToRrmW-lxu-cQx8mnGDdUHDMixRd8X0jh-mJmK9lfJ-ymhxEBAzHeC8aa7l6HRlcZLuIEf8YjSGxgje9iwlE9uuVgiTjyEXNKxYdwedK6M-KGVRoW1T0NiQPhs6ZYE~huZSOpPYsbSlCF3UPduthcJLDe5G8oD7TksuEe~nbioya2NGDRShR7aAKV~ITO~-vhw__",
      product_img:
        "https://s3-alpha-sig.figma.com/img/f62f/634e/f1421f8be0a43ecf7668cc6327e16094?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TKkr7m9rAHm6iWxjnWDYfj22Mc955OeOq6ElRbgDApDcj4R27~UnqBxwqKDxfXIKbDZMf47fSIFid1QMEcSnPmAyBZNjKZVkwLHwDPdHz5ntt9HOzF~bHlI8oOfZ2aG8Crl09PZhCFxv4EHJxVZNXXQ-8c2I8rZ80-p6eqN2z5AYn~Sn78TspiMyT6TaqQYGAh~T2fmxgx7lS4OXhUw3Lr~hhKNqjM-L4AdXqpwpEfk1mzJI5sDSus-Sg2Ey042JEEYqhYTpiJk8mJPwdIRb~R4pyMFYkMZmzGVOYdSPXqudVhRh-tJmNM3LkCTOUy9Dn5fgngg~Ouj7UlbWaWg30w__",
      note: "Giảm 20%",
    },
    {
      brand_img:
        "https://s3-alpha-sig.figma.com/img/5f5a/bd67/cc87e31a9236a044f257ee1179ec7d9e?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=q8GhMTD-FrPVIKF0nBd0oK6pr1~RTSaboEvX59cVxDnLuMBruy97YV3N3-jfRkJGrjdMy0e7Tg~jo6nfXp-k20LwSRBJBvV5r9SIoiZ4WdjyW5MIwMhc9ltEmNsZDYEWpZlehkKkaIaXj15893W1ijmIKfCDuIwLXNrFaF18NYGq1Jgyk7kQ-n1OuYVS-MRmUzPu5885vPb50OHy7vAfeOXaBL-83XRwxaWLalLj-JwpwiJj39JKjH42xkzwdcozXpzeKGMsjYFs7wv1aKU6xKsDwKo18wZ4j5wGJgMWOeYtSb0S11nsEa0JQEHoW6vYuhyuYAFQ13izwA0ARNK11g__",
      product_img:
        "https://s3-alpha-sig.figma.com/img/e1f9/709b/6641515f6c0d2e4d58fa3a7685f82233?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pxyVPHm7ApIeGuQxUkbXAj2sc~xRcyoLn~oAqgBmQExOhCrTagCAIT6M4SFY-ZrRA14crvsVLdv6xBID0CV~aywEee-Yjg7X~1MsNbw7jbQLiBCB6Wzy1NW4o6IFs6Pw32np9S78WxLNtPiunS7yi5hUXIdfEqb1GBvbnvO4hV8g4n9IoK44YCS68YbjrQ~GDpWMy85Ijt70v7GAYuYSQccZFhSuPzj7gXxuB9sdfhEgmhCRgP2lAJYp9-2QVMjVPGRsP39ixo--duGcQquzybBQ5aPjEKrsUEU1Q1whBFk6j4~sDu6efF9zqY5ZD9P~2-tLB-Yny5UnQGg7WwPUGg__",
      note: "Giảm 20%",
    },
    {
      brand_img:
        "https://s3-alpha-sig.figma.com/img/c7dc/9a8e/e9987e1f5bdd5c6fe77da4f0e5604ea7?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lqvVKOq34pZP4s8l6mGXunisUB554qSFPbMupX6dtALtVBETxgIwnVFjRHOwuhPasPLr58nGCHDeN3h1bwgnbhsuOc-ryt~AjtzD6LJYG2DHkfhPZgf8iqgZCuOH31RgyYGyz1ay7hW2pUyT7Y3eC5FaWzamuxsRb9vTsSNZPds40tPgzOQKWHuJSFlaHfBtNQnUj4zoM2M~SmWLCdWmNyqQyPPlSGaqVKFozC3VvaVtXWT5lXHdwXpzVkK1iZ8ITlFK6sjyeYwaTHR3ygtyrfg4iPm5eXJuR2ZkqVn9XffqKnlQQ9UkPntDLwYmYZB1D8GS3o8XY5jarowUisIFIA__",
      product_img:
        "https://s3-alpha-sig.figma.com/img/c874/adca/ec9dc6fe21c739747283858dcded48bd?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=m6oIkFf0DXHWXvSLrfzC68ZagV2aAccPdfNDSOzpRVoWfDB-vR8aafSCCMElC3MQj8xefMAlayUz-XFFhAv39l3~wvaGwcMgff3KI9JmGgAqmLgQt1Lkjgx6E9MACeCedkSA0TtU0A00ytLWWNNsFezc77h8L-Nn43l53MJQjA3SvJAzAYFgakYV2vQtVtqY1uxKx93ju~51i1iVhnxq77ElDG0J~KhkziKImyKWX24ZtebNlr0Vs-~nIHc6-Z-vkibNr2cHPLIjXbaa4ZFAFcaba7fNjpTJyTVh71hWE1gcDjHJPnhK1JDbf45RabC-7lFJNlCHGXpgOEcrk9mllA__",
      note: "Giảm 20%",
    },
    {
      brand_img:
        "https://s3-alpha-sig.figma.com/img/634f/df55/45765bbe06dbe09617e3c3e8ad650061?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gmbhqwoW94DARdl4kO7NbOetNXtzOuApLIoCIkPfxQEnVUFDDgVRQ28dg9x1T9CRtvZ1ezhKuPZdFMROcLGCI-EwzPqtv02hsyn3kTXbs5EgadXqVYvNNINyf~01D~Sj8vwuamcYSZPzBC0mYU1oToRrmW-lxu-cQx8mnGDdUHDMixRd8X0jh-mJmK9lfJ-ymhxEBAzHeC8aa7l6HRlcZLuIEf8YjSGxgje9iwlE9uuVgiTjyEXNKxYdwedK6M-KGVRoW1T0NiQPhs6ZYE~huZSOpPYsbSlCF3UPduthcJLDe5G8oD7TksuEe~nbioya2NGDRShR7aAKV~ITO~-vhw__",
      product_img:
        "https://s3-alpha-sig.figma.com/img/f62f/634e/f1421f8be0a43ecf7668cc6327e16094?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TKkr7m9rAHm6iWxjnWDYfj22Mc955OeOq6ElRbgDApDcj4R27~UnqBxwqKDxfXIKbDZMf47fSIFid1QMEcSnPmAyBZNjKZVkwLHwDPdHz5ntt9HOzF~bHlI8oOfZ2aG8Crl09PZhCFxv4EHJxVZNXXQ-8c2I8rZ80-p6eqN2z5AYn~Sn78TspiMyT6TaqQYGAh~T2fmxgx7lS4OXhUw3Lr~hhKNqjM-L4AdXqpwpEfk1mzJI5sDSus-Sg2Ey042JEEYqhYTpiJk8mJPwdIRb~R4pyMFYkMZmzGVOYdSPXqudVhRh-tJmNM3LkCTOUy9Dn5fgngg~Ouj7UlbWaWg30w__",
      note: "Giảm 20%",
    },
    {
      brand_img:
        "https://s3-alpha-sig.figma.com/img/5f5a/bd67/cc87e31a9236a044f257ee1179ec7d9e?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=q8GhMTD-FrPVIKF0nBd0oK6pr1~RTSaboEvX59cVxDnLuMBruy97YV3N3-jfRkJGrjdMy0e7Tg~jo6nfXp-k20LwSRBJBvV5r9SIoiZ4WdjyW5MIwMhc9ltEmNsZDYEWpZlehkKkaIaXj15893W1ijmIKfCDuIwLXNrFaF18NYGq1Jgyk7kQ-n1OuYVS-MRmUzPu5885vPb50OHy7vAfeOXaBL-83XRwxaWLalLj-JwpwiJj39JKjH42xkzwdcozXpzeKGMsjYFs7wv1aKU6xKsDwKo18wZ4j5wGJgMWOeYtSb0S11nsEa0JQEHoW6vYuhyuYAFQ13izwA0ARNK11g__",
      product_img:
        "https://s3-alpha-sig.figma.com/img/e1f9/709b/6641515f6c0d2e4d58fa3a7685f82233?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pxyVPHm7ApIeGuQxUkbXAj2sc~xRcyoLn~oAqgBmQExOhCrTagCAIT6M4SFY-ZrRA14crvsVLdv6xBID0CV~aywEee-Yjg7X~1MsNbw7jbQLiBCB6Wzy1NW4o6IFs6Pw32np9S78WxLNtPiunS7yi5hUXIdfEqb1GBvbnvO4hV8g4n9IoK44YCS68YbjrQ~GDpWMy85Ijt70v7GAYuYSQccZFhSuPzj7gXxuB9sdfhEgmhCRgP2lAJYp9-2QVMjVPGRsP39ixo--duGcQquzybBQ5aPjEKrsUEU1Q1whBFk6j4~sDu6efF9zqY5ZD9P~2-tLB-Yny5UnQGg7WwPUGg__",
      note: "Giảm 20%",
    },
  ];
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/" + USER_ROUTES.BLOG);
  };

  return (
    <>
      <div className="homepage">
        {/* <div className="container mx-auto  flex justify-center items-center gap-4">
          <div className="w-[70%]">
            <Carousel arrows infinite={false} dots={false}>
              <img
                src="https://s3-alpha-sig.figma.com/img/b128/3697/e5f3d2460105e95b6c1ca97681048d62?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FtTEgmPNyZzEI6UK66Sg~PX5tWmFxh00tR3KGbefDqG6IU6eq0VubjU3kqtNU459n2EoO3Xexkp7JyJtKCi-8Yv1eQQmoCAo9nevfm-W~qlW2DDKKuNokMc~9R4wlG62fnWWqikp9qu0g95f-9VypAdKv0Cwysn~g5vGoYzhTU6drqsn1TXPLqsHt~yV~AvM3T0F2wJPHbEPD1-IUIEXQk7BoME9KZTZn9AifXH1ukFMXJQF2qwy6Idtidtuk~YZ7GSkMSlX6~p3DUzzXcQ~ktAKDGpbfI1sNViABfnepsgJbAa780LT53gQAjmz39wKWCXLfrI9eU3HTwn78zKsuQ__"
                className="object-cover w-full h-[375px] rounded-2xl "
              />
              <img
                src="https://s3-alpha-sig.figma.com/img/b128/3697/e5f3d2460105e95b6c1ca97681048d62?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FtTEgmPNyZzEI6UK66Sg~PX5tWmFxh00tR3KGbefDqG6IU6eq0VubjU3kqtNU459n2EoO3Xexkp7JyJtKCi-8Yv1eQQmoCAo9nevfm-W~qlW2DDKKuNokMc~9R4wlG62fnWWqikp9qu0g95f-9VypAdKv0Cwysn~g5vGoYzhTU6drqsn1TXPLqsHt~yV~AvM3T0F2wJPHbEPD1-IUIEXQk7BoME9KZTZn9AifXH1ukFMXJQF2qwy6Idtidtuk~YZ7GSkMSlX6~p3DUzzXcQ~ktAKDGpbfI1sNViABfnepsgJbAa780LT53gQAjmz39wKWCXLfrI9eU3HTwn78zKsuQ__"
                className="object-cover w-full h-[375px] rounded-2xl "
              />
              <img
                src="https://s3-alpha-sig.figma.com/img/b128/3697/e5f3d2460105e95b6c1ca97681048d62?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FtTEgmPNyZzEI6UK66Sg~PX5tWmFxh00tR3KGbefDqG6IU6eq0VubjU3kqtNU459n2EoO3Xexkp7JyJtKCi-8Yv1eQQmoCAo9nevfm-W~qlW2DDKKuNokMc~9R4wlG62fnWWqikp9qu0g95f-9VypAdKv0Cwysn~g5vGoYzhTU6drqsn1TXPLqsHt~yV~AvM3T0F2wJPHbEPD1-IUIEXQk7BoME9KZTZn9AifXH1ukFMXJQF2qwy6Idtidtuk~YZ7GSkMSlX6~p3DUzzXcQ~ktAKDGpbfI1sNViABfnepsgJbAa780LT53gQAjmz39wKWCXLfrI9eU3HTwn78zKsuQ__"
                className="object-cover w-full h-[375px] rounded-2xl "
              />
            </Carousel>
          </div>
          <div className="lg:col-span-1 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1  ">
            <img
              src="https://s3-alpha-sig.figma.com/img/069f/178d/e59afbefcacd17912267d6a6991cc15c?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=X9gDwJ2fvD9fEYj46zXAtJbrrzCnGCW1RgXI3Z4VdBVfNxeqeGYjHDdZGAuMlNMkdsAOSh4GcsNOf4mY6SbRK7YOsVfzNqVG9wH~2vLlGDhEjrlwwCK08q3wZRjzkEFXkYp8NOUoeLW-xwasZ8SFN3mhmQ40VKl68xYDl7ptT1GmZdCZT7R78NETItyLIwnwRaofJnFAv1VIC39VJJ6MypkAlUsTpydkobfS6D6B2isd6pVusJ0MpZJ4O4su93maasQc2IzaxAsBEBkNiREf-wY8~d7p-K6PWFTbfoKFrOmk1akQrg5TbGWz9LkYz~CLi2J-xWCKIbhUptrbu48WLg__"
              className="rounded-2xl w-full h-full object-cover "
              alt="Image 1"
            />

            <img
              src="https://s3-alpha-sig.figma.com/img/4c81/3a4c/51d8108e0a9edaa3d6a1fde795b3f1ac?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b-zmbSqEqhrLChckPoRQcTOjJp2YyA-zFCVSa4m6Bu60QfdP77PvzNpi7t5JJR5exujyb5BhiH8gdA5ubAOqp37TbBQdoMjGGw2471gxNQY2egV5ZKnFUJxpbyVb2Uj4SVkLeXg62o~OMS5daBUoppQRnm9EBsmx3q1kdGi8jmH3i2xoICKNDVWVzdlqYIQqSG0NTUUMoA5v-i11MhqM8baYHc58uSyu1khmn2NlSGzT4zO~JnKwvhuWL44iRggidcqRTddibtxj8VuXtVImOFneqtUVmNKe6NGWU5AHH~y8Dkvkjf03yUS5-pVyjDw-3UYMCtekxUcjDhUcQER9ag__"
              className="rounded-2xl w-full h-full object-cover "
              alt="Image 2"
            />
          </div>
        </div> */}
        <Flex align="center" justify="center" className="container mx-auto">
          <Row gutter={[16, 16]}>
            <Col lg={17}>
              <Carousel arrows infinite={false} dots={false}>
                <img
                  src="https://s3-alpha-sig.figma.com/img/b128/3697/e5f3d2460105e95b6c1ca97681048d62?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Fnv~jumJcq103T4J6WTiBIbb8dORQBPP00MKt6m20DFEa3mHCT95p28i0b-NgFn38H~wbRgeXevgJEsw5sxjYLxLqiCPFrOJT99MSK20GbrLsaO-JyeU2p-RXh~0auSCfKXnIniK785iNt8PXQDTEDevniVbzmU9Pbst5DBJCxz4co8k8aLCvCvoEhBZB9LlVwStjCYj1fiIFEuMCnLqAKFdT5HDEB0jcQReDKMdUqkck7~IwNeldqQ4dkiUaL2JTOR66knxsAVFUQviGLplzD28yihU3DiQbGmow0EW-T6ZIzBweHQ-aIuzUr4X-w3SLV~LUSuYBZDTt84Eq3~8zA__"
                  className="object-cover w-full h-[200px] lg:h-[375px] rounded-2xl "
                />
                <img
                  src="https://cdn.nhathuoclongchau.com.vn/unsafe/1920x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Banner_Web_PC_1610x492_ba2ba6f811.png"
                  className="object-cover w-full h-[200px] lg:h-[375px] rounded-2xl "
                />
                <img
                  src="https://s3-alpha-sig.figma.com/img/b128/3697/e5f3d2460105e95b6c1ca97681048d62?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Fnv~jumJcq103T4J6WTiBIbb8dORQBPP00MKt6m20DFEa3mHCT95p28i0b-NgFn38H~wbRgeXevgJEsw5sxjYLxLqiCPFrOJT99MSK20GbrLsaO-JyeU2p-RXh~0auSCfKXnIniK785iNt8PXQDTEDevniVbzmU9Pbst5DBJCxz4co8k8aLCvCvoEhBZB9LlVwStjCYj1fiIFEuMCnLqAKFdT5HDEB0jcQReDKMdUqkck7~IwNeldqQ4dkiUaL2JTOR66knxsAVFUQviGLplzD28yihU3DiQbGmow0EW-T6ZIzBweHQ-aIuzUr4X-w3SLV~LUSuYBZDTt84Eq3~8zA__"
                  className="object-cover w-full h-[200px] lg:h-[375px] rounded-2xl "
                />
              </Carousel>
            </Col>
            <Col lg={7}>
              <Row gutter={[12, 12]}>
                <img
                  src="https://s3-alpha-sig.figma.com/img/069f/178d/e59afbefcacd17912267d6a6991cc15c?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=uPsXDPvpCxIpux1jMAqXpY7ue6-3Tlp6u0ZUJXuzpUzxsoIZzUUPXhoAK4G~bk~vYMuZJFccVeIIGcH4zYaLhXFV6vyXEv2xF7hawBf1rNsI3JiN0486jlTzis~vlOE3whTd6u2OnG72eBj8mAOILXCwc9sbefGrIKzYnDXrTERa5bTaSmHtmXz0wqMcNnfvKvfvsOv3UlKn~HDtPXimodPdc-H2OBBIRER2ne0CbQ6c2B9xDO6pKJdic-Qa3VQrCStM4BMks4aBM7Ibd0cmmcoL1RSsGV4f5SrD8doNUzwn0dZjfNO~aY5HigcJKumueLuf8nzd4T-DOd9kF43YXA__"
                  className="rounded-2xl w-full h-full object-cover "
                  alt="Image 1"
                />

                <img
                  src="https://s3-alpha-sig.figma.com/img/4c81/3a4c/51d8108e0a9edaa3d6a1fde795b3f1ac?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YOcvyHI26b48IiMS6b8wNRwrflhymo5ZpLVhtC8nIgACqweBqGXES~MH8W~954HXKd4E7Yy2QkI4HsHRKPT3mA2-3K~gf8MxUkbMtysRB~uvbFdm0yfWm2E6VOMUWsrgtvUQOK1PaXNoHazeDKZWuIIdOTyLc-I9UVgb1FJxq~~mZU1MsTcX60bud~UVOS0pl6oHNOnphvqVRMR7anc41fyaqr6kC3C96QsjCUgV338iBmFJc-ChBCIm2rR~I6kATG2c69b6a-g5DSrls7cpG2zYO9tVCHQe45gNZh7Tn2A4wX1WQyCeH4ahmsS195MUse-8S3lsi7cZRFxyoaB6vQ__"
                  className="rounded-2xl w-full h-full object-cover "
                  alt="Image 2"
                />
              </Row>
            </Col>
          </Row>
        </Flex>

        <div className="flex justify-center items-center gap-4 h-[170px] lg:h-[335px] pt-7">
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
            {data.map((product, index) => (
              <RecommendationProduct
                key={index}
                id={product.id}
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
        <div className="bg-white h-full w-full rounded-3xl">
          <div className="p-10">
            <h1 className="text-4xl text-[#565656] font-normal flex justify-start items-center gap-2">
              <FaHeart /> Thương hiệu được yêu thích nhất
            </h1>
            <div className="p-10">
              <div className="container flex justify-center items-center p-2 w-full">
                {likes?.map((p, index) => (
                  <div
                    className="flex flex-col justify-center items-center gap-2  w-1/5  max-h-[300px]"
                    key={index}
                  >
                    <img src={p.brand_img} className="min-h-16 object-cover" />
                    <img src={p.product_img} />

                    <div className="bg-[#FF5500] text-white text-[16px] text-center p-3 rounded-full w-3/5">
                      Giảm 20%
                    </div>
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
