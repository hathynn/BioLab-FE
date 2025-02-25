import { Button, Image, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useRemoveBgServices } from "../../services/useRemoveBgService";


const Test: React.FC = () => {
  const { originalImages, processedImages, loading, handleUpload } =
    useRemoveBgServices();

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
