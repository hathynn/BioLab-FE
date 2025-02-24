import { useState, useCallback } from "react";
import axios from "axios";

const BASE_URL = "https://rsapi.goong.io/Place/AutoComplete";
const API_KEY = import.meta.env.VITE_API_KEY; 

const useAddressService = () => {
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = useCallback(async (input: string) => {
    if (input.length < 3) return [];

    setLoading(true);
    try {
      const response = await axios.get(BASE_URL, {
        params: { api_key: API_KEY, input },
      });

      return response.data?.predictions || [];
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, fetchSuggestions };
};

export default useAddressService;
