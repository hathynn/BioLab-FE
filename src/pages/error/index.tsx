import error from "../../assets/error.png";

function Page404() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-10">
      <img src={error} />
      <h1 className="text-4xl text-[#2FBB5A] font-semibold ">Oops!</h1>
      <p className="text-[#003A20] text-2xl font-medium pb-10">Không tìm thấy trang</p>
    </div>
  );
}

export default Page404;
