import logo2 from "../../assets/logo2.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/cartStore";

function Header({ navbarType = "light" }) {
  const { cart } = useCartStore();
  const nav = useNavigate();

  const navbarBackground =
    navbarType === "green"
      ? "bg-navColor text-black"
      : navbarType === "light"
      ? "bg-white text-black"
      : "bg-gray-100 text-black";

  return (
    <header className="px-10 pt-7">
      <div className="flex items-center justify-between">
        <img
          onClick={() => nav("/home")}
          src={logo2}
          alt="Logo"
          className="h-15 w-12 cursor-pointer"
        />

        <div className="relative w-[500px]">
          <i className="absolute left-4 top-5 transform -translate-y-1/2">
            <CiSearch className="text-xl text-gray-800" />
          </i>
          <input
            type="text"
            placeholder="Tìm triệu chứng, vitamin và thực phẩm chức năng..."
            className="w-full px-10 py-2 rounded-full text-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="flex items-center font-bold space-x-2 hover:text-white hover:bg-black w-18 py-3 px-4 rounded-full"
            onClick={() => nav("/login")}
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
            <span onClick={() => nav("/shopping-cart")} className="text-sm">
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

      <div className={` mt-3 py-3 rounded-full  ${navbarBackground}`}>
        <nav className="flex justify-between text-sm px-10">
          <a href="#" className="hover:text-green-500">
            Giới thiệu
          </a>
          <a href="#" className="flex hover:text-green-500">
            Danh mục sản phẩm{" "}
            <span>
              <RiArrowDropDownLine className="text-xl" />
            </span>
          </a>
          <a href="#" className="hover:text-green-500">
            Hoạt động xã hội
          </a>
          <a href="#" className="hover:text-green-500">
            Tin tức sự kiện
          </a>
          <a href="#" className="hover:text-green-500">
            SOP
          </a>
          <a href="#" className="hover:text-green-500">
            Cẩm nang sức khỏe
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
