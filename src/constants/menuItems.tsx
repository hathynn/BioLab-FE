import { MenuProps } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  LineChartOutlined,
  PaperClipOutlined,
  SettingOutlined,
} from "@ant-design/icons";


import { Key } from "react";

export type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Link to={`${key}`}> {label} </Link>,
  } as MenuItem;
}

export const getLabel = (
  key?: Key
  // role?: string
): string | undefined => {
  return adminItems.find((item) => item.key === key)?.label;
};

const adminItems = [
  { label: "Tổng quan", key: "overview", icon: <HomeOutlined /> },
  { label: "Doanh thu", key: "sales", icon: <LineChartOutlined /> },
  { label: "Cài đặt", key: "setting", icon: <SettingOutlined /> },
  { label: "Đăng blog", key: "create-blog", icon: <PaperClipOutlined/> },
];

export const adminMenuItems: MenuItem[] = adminItems.map((item) =>
  getItem(item.label, item.key, item.icon)
);
