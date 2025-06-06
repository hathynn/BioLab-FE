import api from "../config/api";
import { USER_API } from "../constants/endpoints";

export const refreshAuthToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    const response = await api.post(USER_API.REFRESH, {
      refreshToken: refreshToken,
    });

    const newAccessToken = response.data.data.token;
    console.log(response);
    localStorage.setItem("token", newAccessToken);
    // store.dispatch(loginRedux(response.data));

    return newAccessToken;
  }
  throw new Error("Refresh token not available");
};
