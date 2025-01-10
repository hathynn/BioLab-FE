import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/bg-login.png";
import biolabLogo from "../../assets/logo.png";

const SignUp: React.FC = () => {
  const nav = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Không được để trống họ và tên."),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Không được để trống email."),
    password: Yup.string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .required("Không được để trống mật khẩu."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
      .required("Cần nhập lại mật khẩu."),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Số điện thoại không hợp lệ")
      .required("Không được để trống số điện thoại."),
  });

  const initialValues = {
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form Submitted:", values);
    nav("/login");
  };

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
          <h2 className="text-3xl text-gray-800">Đăng ký</h2>
          <p className="text-gray-400 mt-2">
            Đăng ký vào tài khoản BioLab để mở rộng trải nghiệm <br /> của bạn
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="mt-10 space-y-4">
                <div>
                  <Field
                    name="fullName"
                    type="text"
                    placeholder="Tên đăng nhập"
                    className="w-full h-[57px] px-6 py-2 border border-gray-300 text-gray-900 rounded-[330px] focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm trans"
                  />
                </div>
                <div>
                  <Field
                    name="email"
                    type="text"
                    placeholder="Email"
                    className="w-full h-[57px] px-6 py-2 border border-gray-300 text-gray-900 rounded-[330px] focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Mật khẩu"
                    className="w-full h-[57px] px-6 py-2 border border-gray-300 text-gray-900 rounded-[330px] focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    className="w-full h-[57px] px-6 py-2 border border-gray-300 text-gray-900 rounded-[330px] focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Field
                    name="phoneNumber"
                    type="text"
                    placeholder="Số điện thoại"
                    className="w-full h-[57px] px-6 py-2 border border-gray-300 text-gray-900 rounded-[330px] focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-[57px] mt-10 bg-black text-white py-2 rounded-[330px] hover:bg-gray-800"
                >
                  Đăng ký
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-center text-gray-300 mt-4">
            Đã có tài khoản?{" "}
            <a
              href="#"
              className="text-gray-300 hover:underline hover:text-green-500"
              onClick={() => nav("/login")}
            >
              Đăng nhập ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
