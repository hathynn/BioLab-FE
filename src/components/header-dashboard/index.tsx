// import { BellOutlined } from "@ant-design/icons";
import { FC } from "react";
// import { Notification } from "../notification";
import Account from "../account";

interface HeaderDashboardProps {
  title?: string;
}

const HeaderDashboard: FC<HeaderDashboardProps> = ({ title }) => {
  // const [data, setData] = useState([]);

  //   // Format items for Dropdown menu
  //   const notificationItems = data
  //     ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)) // Sort by date in descending order
  //     .map((item) => ({
  //       key: item.id,
  //       label: (
  //         <div className="p-2">
  //           <strong>{item?.title}</strong>
  //           <p>{item?.message}</p>
  //           <span className="text-xs text-gray-500">
  //             {formatDateAndHour(item?.createdAt)}
  //           </span>
  //         </div>
  //       ),
  //     }));

  return (
    <div className="flex justify-between pt-7">
      <div>
        <h1 className="text-2xl font-bold pt-3">{title}</h1>
      </div>
      <div className="flex gap-5">
        {/* <Notification
          count={8}
          items={[]}
          placement="bottomRight"
          styleClass="cursor-pointer text-shade-800"
        >
          <div className="h-14 w-14 flex justify-center items-center rounded-full">
            <BellOutlined style={{ fontSize: 26 }} />
          </div>
        </Notification> */}
        <Account
          src={
            "data:image/png;base64,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"
          }
          subTitle={"Xin chào nhà bán lẻ"}
          title={"Nguyễn Văn A"}
        />
      </div>
    </div>
  );
};

export default HeaderDashboard;
