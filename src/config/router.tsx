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
import Category from "../components/templates/category";
import SOP from "../pages/sop";
import SOPDetail from "../pages/sop/sop-detail";
import CreateProduct from "../components/templates/product/create-product";
import ProductPage from "../pages/product";
import About from "../pages/about";
import PostCategory from "../components/templates/post-category";
import BlogDetail from "../pages/blog/blog-detail";
import Test from "../pages/test";
import Page404 from "../pages/error";

import Create from "../components/templates/product/create-product/test";

import PaymentSuccess from "../pages/payment/payment-sucess";
import PaymentFailed from "../pages/payment/payment-fail";
import Order from "../pages/order";
import ManageSOP from "../components/templates/manage-sop";
import ManageOrder from "../components/templates/manage-order";

export const router = createBrowserRouter([
  {
    path: "test",
    element: (
      <div className="m-10 flex gap-10">
        <Test />
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
    path: USER_ROUTES.ABOUT,
    element: <About />,
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
        path: "*",
        element: <Page404 />,
      },
      {
        path: USER_ROUTES.BLOG,
        element: <Blog />,
      },
      {
        path: `${USER_ROUTES.BLOG}/:id`,
        element: <BlogDetail />,
      },

      {
        path: `${USER_ROUTES.SOP}/:id`,
        element: <SOPDetail />,
      },
      {
        path: USER_ROUTES.CART,
        element: <ShoppingCart />,
      },
      {
        path: PRODUCT_ROUTES.PRODUCT,
        element: <ProductPage />,
      },
      {
        path: `${PRODUCT_ROUTES.PRODUCT}/:id`,
        element: <ProductDetail />,
      },

      {
        path: PAYMENT_ROUTES.SHIPPING_INFO,
        element: <ShippingInfo />,
      },
      {
        path: `${PAYMENT_ROUTES.SUCESS}`,
        element: <PaymentSuccess />,
      },
      {
        path: PAYMENT_ROUTES.FAIL,
        element: <PaymentFailed />,
      },
      {
        path: PAYMENT_ROUTES.PAYMENT,
        children: [
          {
            path: ":id",
            element: <Payment />,
          },
        ],
      },
      {
        path: USER_ROUTES.ORDER,
        element: <Order />,
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
        path: ADMIN_ROUTES.BLOG_CATEGORY,
        element: <PostCategory />,
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
        path: `${ADMIN_ROUTES.PRODUCT}/${ADMIN_ROUTES.CREATE_PRODUCT}`,
        element: <CreateProduct />,
      },

      {
        path: ADMIN_ROUTES.BRAND,
        element: <BrandAdmin />,
      },
      {
        path: ADMIN_ROUTES.CATEGORY,
        element: <Category />,
      },
      {
        path: ADMIN_ROUTES.SOP,
        element: <ManageSOP />,
      },
      {
        path: ADMIN_ROUTES.ORDER,
        element: <ManageOrder />,
      },
    ],
  },
]);
