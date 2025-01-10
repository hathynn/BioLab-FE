import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";

import SignUp from "../pages/auth/SignUp";

import { USER_ROUTES } from "../constants/routes";
import RecommendationProduct from "../components/recommendation-product";
import HomePage from "../pages/home";

export const router = createBrowserRouter([
  {
    path: "test",
    element: (
      <div className="m-10 flex gap-10">
        <RecommendationProduct
          title="Thực phẩm chức năng"
          name="Siro ho thảo mộc Tanacol siro ho cảm cho trẻ sơ sinh"
          img="https://firebasestorage.googleapis.com/v0/b/insta-clone-48dad.appspot.com/o/Frame%2011.png?alt=media&token=6e79df5f-8d6b-4633-847e-6c89f8231b77"
          note="Hộp 60 viên"
          price={1295000}
          quantity={["60 viên"]}
          rate={4.5}
          // discount={20}
        />
        <RecommendationProduct
          title="Thực phẩm chức năng"
          name="Bột Hapacol 150 DHG giảm đau, hạ sốt (24 gói)"
          img="https://firebasestorage.googleapis.com/v0/b/insta-clone-48dad.appspot.com/o/a.png?alt=media&token=26bf348e-28bc-45cc-ba99-39d2864f57f1"
          note="Hộp 24 gói"
          price={1295000}
          quantity={["60 viên"]}
          rate={4.5}
          discount={25}
        />
        <RecommendationProduct
          title="Mỹ phẩm"
          name="Sữa rửa mặt Reihaku Hatomugi Acne Care and Facial Washing ngừa mụn, dưỡng ẩm và làm sáng da (130g)"
          img="https://firebasestorage.googleapis.com/v0/b/insta-clone-48dad.appspot.com/o/b.png?alt=media&token=a27a383e-b7b1-4789-9e4f-7584ba22a888"
          note="Chai 140ml"
          price={1295000}
          quantity={["60 viên"]}
          rate={4.5}
          discount={20}
        />
      </div>
    ),
  },
  {
    path: USER_ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: USER_ROUTES.REGISTER,
    element: <SignUp />,
  },

  {
    path: USER_ROUTES.HOME,
    element: <HomePage />,
  },
]);
