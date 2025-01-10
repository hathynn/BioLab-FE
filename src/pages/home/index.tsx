import { Carousel } from "antd";
import "./index.scss";
const contentStyle: React.CSSProperties = {
  margin: 0,
  // height: "300px",
  textAlign: "center",
  background: "#B1F0B0",
  borderRadius: "15px",
};
function HomePage() {
  return (
    <div className="homepage">
      <div className="flex justify-center items-center gap-5">
        <div className="w-3/4">
          <Carousel arrows infinite={false} dots={false}>
            <div className="w-full h-full">
              <img
                src="https://s3-alpha-sig.figma.com/img/b128/3697/e5f3d2460105e95b6c1ca97681048d62?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FtTEgmPNyZzEI6UK66Sg~PX5tWmFxh00tR3KGbefDqG6IU6eq0VubjU3kqtNU459n2EoO3Xexkp7JyJtKCi-8Yv1eQQmoCAo9nevfm-W~qlW2DDKKuNokMc~9R4wlG62fnWWqikp9qu0g95f-9VypAdKv0Cwysn~g5vGoYzhTU6drqsn1TXPLqsHt~yV~AvM3T0F2wJPHbEPD1-IUIEXQk7BoME9KZTZn9AifXH1ukFMXJQF2qwy6Idtidtuk~YZ7GSkMSlX6~p3DUzzXcQ~ktAKDGpbfI1sNViABfnepsgJbAa780LT53gQAjmz39wKWCXLfrI9eU3HTwn78zKsuQ__"
                className="object-cover w-full h-full rounded-2xl "
              />
            </div>
            <div className="w-full h-full">
              <img
                src="https://s3-alpha-sig.figma.com/img/b128/3697/e5f3d2460105e95b6c1ca97681048d62?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FtTEgmPNyZzEI6UK66Sg~PX5tWmFxh00tR3KGbefDqG6IU6eq0VubjU3kqtNU459n2EoO3Xexkp7JyJtKCi-8Yv1eQQmoCAo9nevfm-W~qlW2DDKKuNokMc~9R4wlG62fnWWqikp9qu0g95f-9VypAdKv0Cwysn~g5vGoYzhTU6drqsn1TXPLqsHt~yV~AvM3T0F2wJPHbEPD1-IUIEXQk7BoME9KZTZn9AifXH1ukFMXJQF2qwy6Idtidtuk~YZ7GSkMSlX6~p3DUzzXcQ~ktAKDGpbfI1sNViABfnepsgJbAa780LT53gQAjmz39wKWCXLfrI9eU3HTwn78zKsuQ__"
                className="object-cover w-full h-full rounded-2xl "
              />
            </div>
          </Carousel>
        </div>
        <div className="w-1/4">
          <img
            src="https://s3-alpha-sig.figma.com/img/069f/178d/e59afbefcacd17912267d6a6991cc15c?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=X9gDwJ2fvD9fEYj46zXAtJbrrzCnGCW1RgXI3Z4VdBVfNxeqeGYjHDdZGAuMlNMkdsAOSh4GcsNOf4mY6SbRK7YOsVfzNqVG9wH~2vLlGDhEjrlwwCK08q3wZRjzkEFXkYp8NOUoeLW-xwasZ8SFN3mhmQ40VKl68xYDl7ptT1GmZdCZT7R78NETItyLIwnwRaofJnFAv1VIC39VJJ6MypkAlUsTpydkobfS6D6B2isd6pVusJ0MpZJ4O4su93maasQc2IzaxAsBEBkNiREf-wY8~d7p-K6PWFTbfoKFrOmk1akQrg5TbGWz9LkYz~CLi2J-xWCKIbhUptrbu48WLg__"
            className="rounded-2xl mb-5 w-full h-full object-cover"
          />
          <img
            src="https://s3-alpha-sig.figma.com/img/4c81/3a4c/51d8108e0a9edaa3d6a1fde795b3f1ac?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b-zmbSqEqhrLChckPoRQcTOjJp2YyA-zFCVSa4m6Bu60QfdP77PvzNpi7t5JJR5exujyb5BhiH8gdA5ubAOqp37TbBQdoMjGGw2471gxNQY2egV5ZKnFUJxpbyVb2Uj4SVkLeXg62o~OMS5daBUoppQRnm9EBsmx3q1kdGi8jmH3i2xoICKNDVWVzdlqYIQqSG0NTUUMoA5v-i11MhqM8baYHc58uSyu1khmn2NlSGzT4zO~JnKwvhuWL44iRggidcqRTddibtxj8VuXtVImOFneqtUVmNKe6NGWU5AHH~y8Dkvkjf03yUS5-pVyjDw-3UYMCtekxUcjDhUcQER9ag__"
            className="rounded-2xl w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
