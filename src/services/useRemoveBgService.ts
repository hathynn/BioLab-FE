import { useState } from "react";
import axios from "axios";
import { message } from "antd";

const BASE_URL = "https://api.remove.bg/v1.0/removebg";
const API_KEY = import.meta.env.VITE_API_KEY_REMOVE_BG;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const useRemoveBgServices = () => {
  const [originalImages, setOriginalImages] = useState<string[]>([]);
  const [processedImages, setProcessedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = async (files: File[]) => {
    const validFiles = files.filter((file) => ALLOWED_TYPES.includes(file.type));

    if (validFiles.length === 0) {
      message.error("Only PNG and JPG images are allowed!");
      return;
    }

    setLoading(true);

    const originalUrls = validFiles.map((file) => URL.createObjectURL(file));
    setOriginalImages(originalUrls);

    const formDataArray = validFiles.map((file) => {
      const formData = new FormData();
      formData.append("image_file", file);
      formData.append("size", "auto");
      return formData;
    });

    try {
      const responses = await Promise.all(
        formDataArray.map((formData) =>
          axios.post<Blob>(BASE_URL, formData, {
            headers: {
              "X-API-Key": API_KEY,
              "Content-Type": "multipart/form-data",
            },
            responseType: "blob",
          })
        )
      );

      const processedUrls = responses.map((response) => {
        const imageBlob = new Blob([response.data], { type: "image/png" });
        return URL.createObjectURL(imageBlob);
      });

      setProcessedImages(processedUrls);
      message.success("Background removed successfully!");
    } catch (error) {
      console.error("Error removing background:", error);
      message.error("Failed to remove background.");
    } finally {
      setLoading(false);
    }
  };

  return { originalImages, processedImages, loading, handleUpload };
};
