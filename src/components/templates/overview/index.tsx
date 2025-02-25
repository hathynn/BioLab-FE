import CustomLineChart from "../../line-chart";
import CustomizedCard from "../../card";
import { PieChart } from "../../pie-chart/PieChart";

function OverviewTeamplate() {
  return (
    <div className="pt-6 pb-10 h-full w-full flex gap-6">
      <div className="w-1/3 h-full gap-6 flex flex-col">
        <div className="h-1/3">
          <CustomizedCard
            background="url('/src/assets/blue-abstract.svg')"
            styleClass="border-none "
          >
            <div className="h-full flex flex-col justify-between">
              <div className="text-white gap-1 flex flex-col pb-5">
                <span className="text-[16px]">Hiện tại bạn đang có</span>
                <h1 className="text-2xl font-bold">12 đơn hàng mới</h1>
              </div>
            </div>
            <div className="flex justify-end items-end">
              <button className="bg-black text-sm px-5 py-2 text-white rounded-full">
                Xem ngay
              </button>
            </div>
          </CustomizedCard>
        </div>
        <div className="h-2/3">
          <CustomizedCard styleClass="bg-gradient-to-b from-[#FF9873] to-[#FD3D20] border-none">
            <div className="h-80 w-full">
              <div className="text-white flex justify-between items-center">
                <span className="text-xs-medium">
                  Tỉ lệ phản hồi tích cực từ khách hàng (%)
                </span>
                {/* <ButtonF
                  styleClass="bg-[#FFFFFF30] rounded-[12px] h-[43px] w-[43px] flex justify-center items-center"
                  status="none"
                >
                  <EyeOutlined />
                </ButtonF> */}
              </div>
              <PieChart
                variant="secondary"
                data={[
                  {
                    id: "bad",
                    label: "Phần còn lại",
                    value: 10,
                  },
                  {
                    id: "good",
                    label: "Phản hồi tốt",
                    value: 90,
                  },
                ]}
              />
            </div>
          </CustomizedCard>
        </div>
      </div>
      <div className="w-2/3 h-full gap-6 flex flex-col">
        <div className="h-[calc(50%)]">
          <CustomizedCard styleClass="border border-[#D5D5D7] border-[1px] rounded-2xl overflow-y-scroll">
            <div className="flex flex-col justify-between items-left gap-5 mb-4 ">
              <h3 className="text-sm font-medium">
                Biểu đồ phân tích lợi nhuận
              </h3>
              <CustomLineChart />
            </div>
          </CustomizedCard>
        </div>
        <div className="h-[calc(50%-12px)]">
          <CustomizedCard styleClass="border-none bg-gradient-to-b from-[#555555] to-[#353535] rounded-2xl">
            <div className="flex justify-between items-center mb-4 ">
              <h3 className="text-sm text-white">
                Lịch sử yêu cầu phê duyệt yêu cầu thêm sản phẩm
              </h3>
            </div>
          </CustomizedCard>
        </div>
      </div>
    </div>
  );
}

export default OverviewTeamplate;
