import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import { LOGIN } from "../constants/routes";

export const router = createBrowserRouter([
  {
    path: LOGIN,
    element: <Login />,
  },

]);
