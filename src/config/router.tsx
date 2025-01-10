import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import { LOGIN, SIGNUP } from "../constants/routes";
import SignUp from "../pages/auth/SignUp";

export const router = createBrowserRouter([
  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: SIGNUP,
    element: <SignUp />,
  },

]);
