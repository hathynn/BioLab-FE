import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { getLabel, adminMenuItems } from "../../../constants/menuItems";
import { LogoutOutlined } from "@ant-design/icons";
// import { useDispatch } from "react-redux";
// import { logout } from "../../../redux/features/userSlice";
// import { toast } from "react-toastify";
// import { useCurrentUser } from "../../../utils/getcurrentUser";
import "./index.scss";
import HeaderDashboard from "../../header-dashboard";
import logo from "../../../assets/logo2.png"

const { Content, Sider } = Layout;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const handleLogout = () => {
  //     dispatch(logout());
  //     navigate("/login");
  //     toast.success("Logged out");
  //   };

  //   const user = useCurrentUser(); // get current user
  const menuItem = adminMenuItems;
  const [currentItem, setCurrentItem] = useState(menuItem[0]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ position: "fixed", height: "100vh" }}
      >
        <div className="flex py-9 flex-col justify-between h-full">
          <Link to={"/about"}>
            <img
              className="demo-logo-vertical h-16 "
              src={logo}
            />
          </Link>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={menuItem}
            onClick={(e) => setCurrentItem(e)}
          />
          <button className="h-[51px] w-[51px] text-white flex justify-center items-center bg-gradient-to-b from-[#504C51] to-[#323033] rounded-full">
            <LogoutOutlined className="text-[18px] stroke-white stroke-[10px]" />
          </button>
        </div>
      </Sider>
      <Layout
        style={{ padding: "0 26px 0 106px", background: colorBgContainer }}
      >
        <HeaderDashboard title={getLabel(currentItem?.key)} />
        <Content>
          <div
            style={{
              minHeight: 360,
              height: "88vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              position: "relative",
            }}
          >
            <Outlet />
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
