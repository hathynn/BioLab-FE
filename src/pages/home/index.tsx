import { Carousel } from "antd";
import "./index.scss";
import { RiVipCrown2Fill } from "react-icons/ri";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import RecommendationProduct from "../../components/recommendation-product";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import MediaInfoCard from "../../components/mediaInfoCard";

function HomePage() {
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

  return (
    <>
      <div className="homepage">
        <Header />
        <div className="container mx-auto  flex justify-center items-center gap-4">
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
        </div>
        <div className="flex justify-center items-center gap-4 h-[335px] pt-7">
          <img
            src="https://s3-alpha-sig.figma.com/img/b24e/d6b4/3baa0caeaa29aaab596c684ab438ac20?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dVY8--RyFJNXHIhAkD7Nv-YYAcd3vVPzA7QFgMhIltgaOc5Kz6ssRSg5EowdnJ~1CuuWHVP88OkiSj7dwr80Qb-1g2WYyDbTqPDWmGnkkDpugME~QhTbAN7OHSSLEitf4jELqVbtWuKzCR3JGBieLGbB6B41GpdK0ffrCA1iO-kvYQPmiQ-3BYVeGIDFQQPt6knNSvDyM1qsrZQBSGXcZ~iRJU1pGph8QfQSwy1Ax5W0yigulEKF78JK7y1Jtx52zOIkTzTQT~LdcyYbObSH-wy1~TnHXyQWBTk-Z3T~mSWOZvU2Hy7QyXC3KwGWvI-Skyouzw3VOyKmTi-x0qV9zw__"
            className="rounded-2xl w-[30%] h-full object-cover "
            alt="Image 2"
          />
          <img
            src="https://s3-alpha-sig.figma.com/img/b49f/1b80/e9ad7f0f94224a4118fddda8131b9432?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=m8E0F3VDXmRlCodsJ~rX3Hcwb3B06zNFPHws4qHblgrZAu9aqd6dhutTI6vHeiOuAhVXjnmzs7czwAHUOVEce8hxtjsvO8q1RhbrY~b9Ngy32sY0BOqgICkcGm-VQc76eDLIRqqHsIx4xylPlbl1ejsOnOxmelDAa7PKDlscnddYLFGQFZqdauWVWFiOR5Y0tZ10IcQFm2JJRcUoWib3GGhhS1ZTePpkF4f05hw8RcxOK5zpnh1fdcMnmpdKgk2VT8cMyf4-e3zPWlisjUTkiN-YYdBRiy16KqYfc8a6VTmATch94ghFJHx-dUTZKnrIvqLagn32L5XgPuOIUDTXpw__"
            className="rounded-2xl w-[30%] h-full object-cover "
            alt="Image 2"
          />
          <img
            src="https://s3-alpha-sig.figma.com/img/2810/afb8/d6cce381df614aa5c564c287bdc35c88?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Gc5D4Sm28Jlt0XU0auPlJCPA4HFKLBRoQ~R-f3Cy0xyJwixccnXTwAKFunk84nzVoHrZ5Nm0JwWcxE0DittV6h29apQEFP88DpudGIfrX4KaztCowr59sTn4RoZaIDA2voPcNnM-5Pml~gDNsw5rWGMhls-3PXXOreTbAYcI2YC5J-1VI31Nb6kl4wc5QUM3C5iw-A0rJ9vZkvsaiJwy29TMGNOAw3ZLusogRVe5TeaNG1kd127ufiYgsOG4TNbviQKobceBd6AecdWKmpimQvLt~eliAwiS9e3BNFyNZQo1WwBoKiQUQYPmHkAMr2bPicrG5y9hQASYBY2agwDWAA__"
            className="rounded-2xl w-[40%] h-full object-cover "
            alt="Image 2"
          />
        </div>
      </div>
      <div className="bg-gradient-to-b from-[#B1F0B0] to-[#5BD07E] h-full w-full rounded-3xl">
        <div className="p-10">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl text-white font-normal flex justify-center items-center gap-2">
              <RiVipCrown2Fill /> Đề xuất của chuyên gia
            </h1>
            <button className="bg-[#373737] text-white text-[16px] rounded-full p-3 px-4 flex justify-between items-center gap-3">
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
        <div className="bg-white h-full w-full rounded-3xl">
          <div className="p-10">
            <h1 className="text-4xl text-[#565656] font-normal flex justify-start items-center gap-2">
              <FaHeart /> Thương hiệu được yêu thích nhất
            </h1>
            <div className="p-10">
              <div className="flex justify-center items-center">
                {likes?.map((p, index) => (
                  <div
                    className="flex flex-col justify-center items-center gap-2 w-1/5 max-h-[300px]"
                    key={index}
                  >
                    <img src={p.brand_img} className="min-h-16 object-cover" />
                    <img src={p.product_img} />

                    <div className="bg-[#FF5500] text-white text-[16px] text-center p-3 rounded-full w-3/5 ">
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
                <button className="bg-white text-[#006DC0] text-[16px] font-semibold rounded-full p-3 px-4 flex justify-between items-center gap-3">
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
                  <button className="bg-gradient-to-l from-[#FC853E] to-[#F05334] text-white text-[16px] font-semibold rounded-full p-3 px-4 flex justify-between items-center gap-3">
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

      <Footer />
    </>
  );
}

export default HomePage;
