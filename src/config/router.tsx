import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";

import SignUp from "../pages/auth/SignUp";

import { USER_ROUTES } from "../constants/routes";
import RecommendationProduct from "../components/recommendation-product";
import HomePage from "../pages/home";

export const router = createBrowserRouter([
  {
    path: "test",
    element: <div className="m-10 flex gap-10"></div>,
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
