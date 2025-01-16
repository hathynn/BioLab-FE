import { MenuProps } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, SnippetsOutlined } from "@ant-design/icons";
import { Key } from "react";
import { FiSettings } from "react-icons/fi";

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

export const getLabel = (key?: Key, role?: string): string | undefined => {
  return adminItems.find((item) => item.key === key)?.label;
};

const adminItems = [
  { label: "Trang Chủ", key: "overview", icon: <HomeOutlined /> },
  { label: "Cài đặt", key: "setting", icon: <FiSettings /> },
  { label: "Cài đặt", key: "setting1", icon: <SnippetsOutlined /> },
];

export const adminMenuItems: MenuItem[] = adminItems.map((item) =>
  getItem(item.label, item.key, item.icon)
);
