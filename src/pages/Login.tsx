import logo from "../assets/bg-login.png"; // Background image
import biolabLogo from "../assets/logo.png"; // BioLab logo

const Login = () => {
  return (
    <div className="flex h-screen w-screen bg-white">
    
      <div
        className="w-3/5 h-full relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${logo})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-green-500 to-transparent opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={biolabLogo} alt="BioLab Logo" className="w-[250px]" />
        </div>
      </div>

   
      <div className="w-4/6 bg-white flex items-center justify-center">
        <div className="w-2/3 max-w-md">
          <h2 className="text-3xl font-semibold text-gray-800 font-manrope">
            Đăng nhập
          </h2>
          <p className="text-gray-400 mt-2 font-manrope">
            Đăng nhập vào tài khoản BioLab để mở rộng trải nghiệm <br /> của bạn
          </p>

          <form className="mt-10 space-y-4">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              className="w-full h-[57px] px-6 py-2 border border-gray-300 text-gray-300 rounded-[330px] focus:outline-none focus:ring-2 focus:ring-green-500 font-manrope"
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="w-full h-[57px] px-6 py-2 border border-gray-300 text-gray-300 rounded-[330px] focus:outline-none focus:ring-2 focus:ring-green-500 font-manrope"
            />
            <button
              type="submit"
              className="w-full h-[57px] mt-10 bg-black text-white py-2 rounded-[330px] hover:bg-gray-800 font-manrope"
            >
              Đăng nhập
            </button>
          </form>

          <p className="text-center text-gray-300 mt-4 font-manrope">
            Chưa có tài khoản?{" "}
            <a
              href="#"
              className="text-gray-300 hover:underline hover:text-green-500"
            >
              Đăng kí ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
