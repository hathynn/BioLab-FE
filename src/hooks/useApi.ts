/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

const useApi = () => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const callApi = useCallback(
    async (
      method: "get" | "post" | "put" | "delete" | "patch",
      url: string,
      data?: any,
      message?: string,
      pathNavigate?: string
    ) => {
      try {
        setIsLoading(true);
        const response = await api[method](url, data);
        if (message) console.log(message);
        if (pathNavigate) navigate(pathNavigate);
        return response.data;
      } catch (e: any) {
        console.error(e);
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  return { loading, callApi, setIsLoading };
};

export default useApi;