/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";

const BASE_URL = "https://open.oapi.vn/location";

const useLocationService = () => {
  const [loading, setLoading] = useState(false);

  const fetchData = async (url: string) => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data?.data;
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getProvinces = useCallback(async () => {
    return await fetchData(`${BASE_URL}/provinces?page=0&size=1000`);
  }, []);

  const getDistricts = useCallback(async (provinceId: number) => {
    return await fetchData(
      `${BASE_URL}/districts/${provinceId}?page=0&size=1000`
    );
  }, []);

  const getWards = useCallback(async (districtId: number) => {
    return await fetchData(`${BASE_URL}/wards/${districtId}?page=0&size=1000`);
  }, []);

  return {
    loading,
    getProvinces,
    getDistricts,
    getWards,
  };
};

export default useLocationService;
