import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/auth/Login";

import SignUp from "../pages/auth/SignUp";

import { ADMIN_ROUTES, PRODUCT_ROUTES, USER_ROUTES } from "../constants/routes";
import RecommendationProduct from "../components/recommendation-product";
import HomePage from "../pages/home";
import Header from "../components/header";
import Footer from "../components/footer";
import ProductDetail from "../pages/productDetail";
import DashboardLayout from "../components/layouts/dashboard-layout";
import OverviewTeamplate from "../components/templates/overview";

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
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: USER_ROUTES.HOME,
        element: <HomePage />,
      },
    ],
  },
  {
    path: PRODUCT_ROUTES.DETAIL,
    element: <ProductDetail />,
  },
  {
    path: ADMIN_ROUTES.ADMIN,
    element: <DashboardLayout />,
    children: [
      {
        path: ADMIN_ROUTES.OVERVIEW,
        element: <OverviewTeamplate />,
      },
      {
        path: ADMIN_ROUTES.SETTING,
        element: <></>,
      },
    ],
  },
]);
