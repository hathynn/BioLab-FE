import { BellOutlined } from "@ant-design/icons";
import { FC } from "react";
import { Notification } from "../notification";
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
        <Notification
          count={8}
          items={[]}
          placement="bottomRight"
          styleClass="cursor-pointer text-shade-800"
        >
          <div className="h-14 w-14 flex justify-center items-center rounded-full">
            <BellOutlined style={{ fontSize: 26 }} />
          </div>
        </Notification>
        <Account
          src={""}
          subTitle={"Xin chào nhà bán lẻ"}
          title={"Nguyễn Văn A"}
        />
      </div>
    </div>
  );
};

export default HeaderDashboard;
