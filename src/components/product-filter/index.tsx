import { useState } from "react";
import { Slider, Collapse, ConfigProvider } from "antd";
import { CiFilter } from "react-icons/ci";
import "./index.scss";
const { Panel } = Collapse;

const FilterSidebar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Trẻ em"
  );

  const categories = [
    "Trẻ em",
    "Nam",
    "Nữ",
    "Người lớn tuổi",
    "Phụ nữ mang thai",
  ];

  return (
    <aside className="product-filter w-64 p-4 bg-white rounded-2xl shadow-md">
      {/* Tiêu đề + Icon */}
      <div className="flex justify-between items-center pb-2 mb-4 border-b">
        <h2 className="text-lg font-semibold">Bộ lọc nâng cao</h2>
        <CiFilter style={{ fontSize: "20px" }} />
      </div>

      {/* Collapse Ant Design */}
      <Collapse defaultActiveKey={["1", "2"]} ghost expandIconPosition="end">
        {/* Giá */}
        <Panel header="Giá" key="1">
          <ConfigProvider
            theme={{
              components: {
                Slider: {
                    trackBg: "black", // Màu thanh trượt
                    trackHoverBg: "black", // Màu thanh trượt khi hover
                    railBg: "gray", // Đường ray phía sau
        
                    handleColor: "black", // Màu nút trượt
                    handleActiveColor: "black", // Khi nhấn giữ
        
                    dotBorderColor: "black", // Màu viền dot
                    dotActiveBorderColor: "black", // Màu viền dot khi active
                },
              },
            }}
          >
            <Slider
              range
              defaultValue={[120000, 560000]}
              min={120000}
              max={560000}
            />
          </ConfigProvider>

          <div className="flex justify-between text-sm text-gray-600">
            <span>120.000đ</span>
            <span>560.000đ</span>
          </div>
        </Panel>

        {/* Đối tượng sử dụng */}
        <Panel header="Đối tượng sử dụng" key="2">
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                className={`px-3 py-1 rounded-full border ${
                  selectedCategory === item
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setSelectedCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </Panel>

        {/* Các bộ lọc khác */}
        <Panel header="Chỉ định" key="3"></Panel>
        <Panel header="Thương hiệu" key="4"></Panel>
        <Panel header="Xuất xứ thương hiệu" key="5"></Panel>
      </Collapse>
    </aside>
  );
};

export default FilterSidebar;
