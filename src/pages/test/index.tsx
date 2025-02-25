import { useState } from "react";
import axios from "axios";
import { Button, Image, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const API_KEY = import.meta.env.VITE_API_KEY_REMOVE_BG;

const Test: React.FC = () => {
  const [originalImages, setOriginalImages] = useState<string[]>([]);
  const [processedImages, setProcessedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = async (files: File[]) => {
    setLoading(true);

    const originalUrls = files.map((file) => URL.createObjectURL(file));
    setOriginalImages(originalUrls);

    const formDataArray = files.map((file) => {
      const formData = new FormData();
      formData.append("image_file", file);
      formData.append("size", "auto");
      return formData;
    });

    try {
      const responses = await Promise.all(
        formDataArray.map((formData) =>
          axios.post<Blob>("https://api.remove.bg/v1.0/removebg", formData, {
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

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Upload
        multiple
        beforeUpload={(file, fileList) => {
          handleUpload(fileList as File[]);
          return false;
        }}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />} loading={loading}>
          Upload Images
        </Button>
      </Upload>

      <div className="flex flex-wrap justify-center gap-5 mt-5">
        {originalImages.length > 0 && (
          <div>
            <h3>Original Images:</h3>
            <div className="grid grid-cols-3 gap-4">
              {originalImages.map((url, index) => (
                <Image key={index} src={url} alt={`Original ${index}`} />
              ))}
            </div>
          </div>
        )}

        {processedImages.length > 0 && (
          <div>
            <h3>Processed Images:</h3>
            <div className="grid grid-cols-3 gap-4">
              {processedImages.map((url, index) => (
                <Image key={index} src={url} alt={`Processed ${index}`} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
