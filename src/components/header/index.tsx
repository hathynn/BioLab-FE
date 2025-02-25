import logo2 from "../../assets/logo2.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
// import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/cartStore";
import { headerItems } from "../../constants/menuItems";
import { USER_ROUTES } from "../../constants/routes";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Drawer, Menu, MenuProps } from "antd";

function Search() {
  return (
    <>
      <div className="relative w-full">
        <i className="absolute left-4 top-5 transform -translate-y-1/2">
          <CiSearch className="text-xl text-gray-800" />
        </i>
        <input
          type="text"
          placeholder="Tìm triệu chứng, vitamin và thực phẩm chức năng..."
          className="w-full px-10 py-2 rounded-full text-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </>
  );
}

function Header({ navbarType = "light" }) {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const { cart } = useCartStore();
  const nav = useNavigate();

  const navbarBackground =
    navbarType === "green"
      ? "bg-navColor text-black"
      : navbarType === "light"
      ? "bg-white text-black"
      : "bg-gray-100 text-black";

  const onClick: MenuProps["onClick"] = (e) => {
    nav(`/${e.key}`);
    onClose();
  };
  return (
    <>
      <header className="px-10 pt-7">
        <div className="flex items-center justify-between gap-3">
          <img
            onClick={() => nav("/home")}
            src={logo2}
            alt="Logo"
            className="h-15 w-12 cursor-pointer hidden lg:block"
          />
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={showDrawer}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <FaBars size={24} />
            </button>
          </div>

          <div className="lg:hidden flex">
            <a
          
              className="flex items-center font-bold space-x-2 hover:text-white hover:bg-black w-18 py-3 px-4 rounded-full"
              onClick={() => nav(`/${USER_ROUTES.LOGIN}`)}
            >
              <i aria-hidden="true">
                <AiOutlineUser className="text-xl" />
              </i>
              <span className="text-sm">Đăng nhập</span>
            </a>
            <a
             
              className="relative flex items-center bg-cartColor text-gray-100 hover:text-white hover:bg-black font-bold w-18 py-3 px-3 space-x-2 rounded-full"
            >
              <i aria-hidden="true">
                <AiOutlineShoppingCart className="text-xl" />
              </i>
              {/* <span onClick={() => nav("/shopping-cart")} className="text-sm">
                Giỏ hàng
              </span> */}
              {cart.length != 0 && (
                <span className="absolute -top-2 -right-1 px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                  {cart.length}
                </span>
              )}
            </a>
          </div>

          <div className="hidden lg:block lg:w-[500px]">
            <Search />
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-4 ">
            <a
              href="#"
              className="flex items-center font-bold space-x-2 hover:text-white hover:bg-black w-18 py-3 px-4 rounded-full"
              onClick={() => nav(`/${USER_ROUTES.LOGIN}`)}
            >
              <i aria-hidden="true">
                <AiOutlineUser className="text-xl" />
              </i>
              <span className="text-sm">Đăng nhập</span>
            </a>
            <a
              href="#"
              className="relative flex items-center bg-cartColor text-gray-100 hover:text-white hover:bg-black font-bold w-18 py-3 px-4 space-x-2 rounded-full"
            >
              <i aria-hidden="true">
                <AiOutlineShoppingCart className="text-xl" />
              </i>
              <span onClick={() => nav(`/${USER_ROUTES.CART}`)} className="text-sm">
                Giỏ hàng
              </span>
              {cart.length != 0 && (
                <span className="absolute -top-2 -right-1 px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                  {cart.length}
                </span>
              )}
            </a>
          </div>
        </div>

        <div className={`hidden lg:block mt-3 py-3 rounded-full  ${navbarBackground}`}>
          <nav className="hidden lg:flex justify-between text-sm px-10">
            {headerItems.map((item, index) => (
              <a
                key={index}
                href={`/${item.key}`}
                className="flex hover:text-green-500"
              >
                {item.label}
                {/* {item.hasDropdown && (
                  <RiArrowDropDownLine className="text-xl" />
                )} */}
              </a>
            ))}
          </nav>
        </div>
        <div className="pt-2 lg:hidden">
          <Search />
        </div>
      </header>
      <Drawer placement="left" onClose={onClose} open={open} width={"70%"}>
        <Menu
          onClick={onClick}
          // style={{ width: 256 }}
          mode="inline"
          items={headerItems}
        />
      </Drawer>
    </>
  );
}

export default Header;
