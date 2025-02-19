import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/auth/Login";

import SignUp from "../pages/auth/SignUp";

import {
  ADMIN_ROUTES,
  PAYMENT_ROUTES,
  PRODUCT_ROUTES,
  USER_ROUTES,
} from "../constants/routes";
import HomePage from "../pages/home";
import Header from "../components/header";
import Footer from "../components/footer";
import ProductDetail from "../pages/productDetail";
import DashboardLayout from "../components/layouts/dashboard-layout";
import OverviewTeamplate from "../components/templates/overview";
import ShoppingCart from "../pages/shopping-cart";
import Blog from "../pages/blog";
import CreateBlog from "../components/templates/create-blog";
import ShippingInfo from "../pages/payment/shipping-info";
import Payment from "../pages/payment";
import Product from "../components/templates/product";
import BrandAdmin from "../components/templates/brand";
import SOP from "../pages/sop";

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
        path: "/",
        element: <HomePage />,
      },
      {
        path: USER_ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: USER_ROUTES.SOP,
        element: <SOP />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <>
        <Header navbarType="green" />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: USER_ROUTES.BLOG,
        element: <Blog />,
      },
      {
        path: PRODUCT_ROUTES.CART,
        element: <ShoppingCart />,
      },
      {
        path: PRODUCT_ROUTES.DETAIL,
        element: <ProductDetail />,
      },
      {
        path: PAYMENT_ROUTES.SHIPPING_INFO,
        element: <ShippingInfo />,
      },
      {
        path: PAYMENT_ROUTES.PAYMENT,
        element: <Payment />,
      },
    ],
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
      {
        path: ADMIN_ROUTES.BLOG,
        element: <CreateBlog />,
      },
      {
        path: ADMIN_ROUTES.PRODUCT,
        element: <Product />,
      },
      {
        path: ADMIN_ROUTES.BRAND,
        element: <BrandAdmin />,
      },
    ],
  },
]);
