// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrDocumentVerified } from "react-icons/gr";
// import cod from "../../../assets/cod.png";
// import vnpay from "../../../assets/vnpay.png";
import { Switch } from "antd";
import "./index.scss";
import useCartStore, { Product } from "../../../store/cartStore";
import useLocationService from "../../../services/useLocationService";
import { useEffect, useState } from "react";
import {
  OrderStatus,
  OrderType,
  PaymentMethod,
  PaymentStatus,
} from "../../../types/order.type";
import { toast } from "react-toastify";
import useOrderService from "../../../services/useOrderService";
import useOrderDetailService from "../../../services/useOrderDetailService";
import { OrderDetailType } from "../../../types/orderDetail.type";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { debounce } from "lodash";
import useAddressService from "../../../services/useAddressService";
import { payOS } from "../../../utils/payment";
import { PayOSConfig, usePayOS } from "payos-checkout";
import usePaymentService from "../../../services/usePaymentService";
function ShippingInfo() {
  const { cart } = useCartStore();
  const { createOrder } = useOrderService();
  const { createPayment } = usePaymentService();
  const { createOrderDetail } = useOrderDetailService();
  const { getProvinces, getDistricts, getWards } = useLocationService();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.COD
  );
  const [provinces, setProvinces] = useState<{ id: number; name: string }[]>(
    []
  );
  const [districts, setDistricts] = useState<{ id: number; name: string }[]>(
    []
  );
  const [wards, setWards] = useState<{ id: number; name: string }[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const [selectedWard, setSelectedWard] = useState<number | null>(null);
  const [address, setAddress] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    { place_id: string; description: string }[]
  >([]);
  const { fetchSuggestions, loading } = useAddressService();

  const [checkoutUrl, setCheckoutUrl] = useState<any | null>(null);

  useEffect(() => {
    if (checkoutUrl) {
      console.log(checkoutUrl);

      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl]);

  useEffect(() => {
    const debouncedFetch = debounce(async () => {
      const results = await fetchSuggestions(input);
      setSuggestions(results);
    }, 300);

    if (input) debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [input, fetchSuggestions]);

  const handleSelectAddress = (description: string) => {
    setInput(description);
    setSuggestions([]);
  };

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item: Product) => total + (item.price || 0) * item.quantity,
      0
    );
  };

  const calculateTotalQuantity = () => {
    return cart.reduce((total, item: Product) => total + item.quantity, 0);
  };

  const nav = useNavigate();
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        if (data) setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const data = await getDistricts(selectedProvince);
          if (data) setDistricts(data);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        try {
          const data = await getWards(selectedDistrict);
          if (data) setWards(data);
        } catch (error) {
          console.error("Error fetching wards:", error);
        }
      };
      fetchWards();
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  const handleCreateOrder = async () => {
    // if (!selectedProvince || !selectedDistrict || !selectedWard || !address) {
    //   toast.error("Vui lòng nhập đầy đủ địa chỉ nhận hàng!");
    //   return;
    // }
    // const province = provinces?.length
    //   ? provinces.find((p) => String(p.id) === String(selectedProvince))?.name
    //   : "N/A";
    // const district = districts?.length
    //   ? districts.find((d) => String(d.id) === String(selectedDistrict))?.name
    //   : "N/A";
    // const ward = wards?.length
    //   ? wards.find((w) => String(w.id) === String(selectedWard))?.name
    //   : "N/A";
    // const main_address = `${address}, ${ward}, ${district}, ${province}`;
    // const orderData = {
    //   customerName: name,
    //   phoneNumber: phone,
    //   email: email,
    //   address: main_address,
    //   paymentMethod,
    //   totalPrice: calculateTotalPrice(),
    //   note,
    //   orderDetails: cart.map((item) => ({
    //     productId: item.id,
    //     quantity: item.quantity,
    //     price: item.price,
    //   })),
    // };
    // try {
    //   const order: OrderType = {
    //     address: orderData.address,
    //     customer_name: orderData.customerName,
    //     email: orderData.email,
    //     payment_method: paymentMethod == PaymentMethod.COD ? "COD" : "VNPAY",
    //     payment_status: PaymentStatus.UNPAID,
    //     phone: orderData.phoneNumber,
    //     status: OrderStatus.PROCESSING,
    //     total_amount: orderData.totalPrice,
    //   };
    //   const response = await createOrder(order);
    //   if (response) {
    //     const order_id = response?.order_id;
    //     cart.map(async (item) => {
    //       console.log(order_id, item.id);
    //       const order_detail: OrderDetailType = {
    //         order_id: order_id,
    //         product_id: item.id || "",
    //         quantity: item.quantity,
    //         subtotal: item.quantity * (item.price || 1),
    //       };
    //       await createOrderDetail(order_detail);
    //     });
    //   }
    //   if (!response) throw new Error("Lỗi khi tạo đơn hàng");
    //   toast.success("Đơn hàng đã được tạo thành công!");
    //   if (paymentMethod !== PaymentMethod.COD) {
    //     nav("/payment/" + response?.order_id);
    //   }
    // } catch (error) {
    //   console.error("Error creating order:", error);
    //   toast.error("Có lỗi xảy ra khi tạo đơn hàng, vui lòng thử lại.");
    // }
  };

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    // selectedProvince: null,
    // selectedDistrict: null,
    // selectedWard: null,
    // address: input,
    note: "",
    paymentMethod: "COD", // Giá trị mặc định
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập họ và tên"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
      .min(10, "Số điện thoại phải có ít nhất 10 số")
      .max(11, "Số điện thoại tối đa 11 số")
      .required("Vui lòng nhập số điện thoại"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    // selectedProvince: Yup.number().required("Vui lòng chọn tỉnh/thành phố"),
    // selectedDistrict: Yup.number().required("Vui lòng chọn quận/huyện"),
    // selectedWard: Yup.number().required("Vui lòng chọn phường/xã"),
    // address: Yup.string().required("Vui lòng nhập địa chỉ cụ thể"),
    note: Yup.string(),
    paymentMethod: Yup.string().oneOf(
      ["COD", "VNPAY"],
      "Phương thức thanh toán không hợp lệ"
    ),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    if (!input.trim()) {
      toast.error("Vui lòng nhập địa chỉ.");
    }

    const orderData = {
      customerName: values.name,
      phoneNumber: values.phone,
      email: values.email,
      address: input,
      paymentMethod: paymentMethod,
      totalPrice: calculateTotalPrice(),
      note,
      orderDetails: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    try {
      const order: OrderType = {
        address: orderData.address,
        customer_name: orderData.customerName,
        email: orderData.email,
        payment_method: paymentMethod == PaymentMethod.COD ? "COD" : "VNPAY",
        payment_status: PaymentStatus.UNPAID,
        phone: orderData.phoneNumber,
        status: OrderStatus.PROCESSING,
        total_amount: orderData.totalPrice,
      };

      const response = await createOrder(order);
      if (response) {
        const order_id = response?.order_id;
        cart.map(async (item) => {
          const order_detail: OrderDetailType = {
            order_id: order_id,
            product_id: item.id || "",
            quantity: item.quantity,
            subtotal: item.quantity * (item.price || 1),
          };
          await createOrderDetail(order_detail);
        });
      }

      if (!response) throw new Error("Lỗi khi tạo đơn hàng");
      toast.success("Đơn hàng đã được tạo thành công!");

      if (paymentMethod == PaymentMethod.COD) {
        nav("/payment-success/");
      } else {
        const initiatePayment = async () => {
          const paymentData = {
            orderCode: Date.now(),
            amount: 2000,
            description: "Thanh toán đơn hàng",
            returnUrl: "https://biolab.life/" + "payment-success",
            cancelUrl: "https://biolab.life/" + "payment-fail",
          };

          const response = await createPayment(paymentData);
          if (response) {
            setCheckoutUrl(response?.checkoutUrl);
          }
        };

        initiatePayment();

        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        }
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Có lỗi xảy ra khi tạo đơn hàng, vui lòng thử lại.");
    }
  };

  return (
    <div className="payment px-10 mx-auto p-6">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="p-4 mb-4 space-y-5">
                  <div className="flex space-x-2">
                    <GrDocumentVerified className="text-2xl mt-1" />
                    <p className="text-2xl font-bold">Thông tin giao hàng</p>
                  </div>
                  <div className="flex space-x-3">
                    <p className="text-base font-bold ">
                      Chọn hình thức nhận hàng
                    </p>
                    <button className=" px-6 text-sm text-green-600 border-customGreen border-2 rounded-full">
                      Giao hàng tận nơi
                    </button>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold mb-2">
                      Thông tin người đặt
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-700">
                          Họ và tên
                        </label>
                        {/* <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        /> */}
                        <Field
                          name="name"
                          placeholder="Họ và tên"
                          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700">
                          Số điện thoại
                        </label>
                        {/* <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        /> */}

                        <Field
                          name="phone"
                          placeholder="Số điện thoại"
                          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm text-gray-700">
                        Email
                      </label>
                      {/* <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                      /> */}
                      <Field
                        name="email"
                        placeholder="Email"
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <h2 className="text-lg font-semibold mb-4">
                      Địa chỉ nhận hàng
                    </h2>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        onChange={(e) =>
                          setSelectedProvince(Number(e.target.value))
                        }
                      >
                        <option value="">Chọn tỉnh/thành phố</option>
                        {provinces.map((province) => (
                          <option key={province.id} value={province.id}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        onChange={(e) =>
                          setSelectedDistrict(Number(e.target.value))
                        }
                        disabled={!selectedProvince}
                      >
                        <option value="">Chọn quận/huyện</option>
                        {districts.map((district) => (
                          <option key={district.id} value={district.id}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        onChange={(e) =>
                          setSelectedWard(Number(e.target.value))
                        }
                        disabled={!selectedDistrict}
                      >
                        <option value="">Chọn phường/xã</option>
                        {wards.map((ward) => (
                          <option key={ward.id} value={ward.id}>
                            {ward.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* <input
                      type="text"
                      placeholder="Nhập địa chỉ cụ thể"
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 mb-4"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    /> */}
                    <div className="relative w-full mx-auto">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Nhập địa chỉ..."
                        className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      {!input && (
                        <p className="text-red-500 py-1">
                          Vui lòng nhập địa chỉ
                        </p>
                      )}
                      {loading && (
                        <div className="absolute bg-white text-gray-500 px-4 py-2">
                          Đang tải...
                        </div>
                      )}
                      {suggestions.length > 0 && (
                        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                          {suggestions.map((item) => (
                            <li
                              key={item.place_id}
                              onClick={() =>
                                handleSelectAddress(item.description)
                              }
                              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            >
                              {item.description}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <h2 className="text-lg font-semibold mb-4">Ghi chú</h2>
                    <input
                      type="text"
                      placeholder="Che tên khi giao hàng"
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 mb-4"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">
                        Yêu cầu xuất hóa đơn điện tử
                      </span>

                      <Switch
                        className="text-customGreen"
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-fit rounded-lg  p-4 border">
                <h1 className="font-bold mb-2">Thông tin đơn hàng</h1>
                {cart.map((item) => (
                  <div className="flex justify-between mb-4">
                    <div className="flex w-2/5 space-x-2">
                      <img
                        src={item.img}
                        alt="Product"
                        className="w-20 h-20 object-cover border rounded-md"
                      />
                    </div>
                    <div className="flex justify-end ">
                      <div className="pr-2 flex flex-col justify-between h-full">
                        <p className="font-bold text-sm text-gray-800">
                          {item.name}
                        </p>
                        <div className="flex justify-between">
                          <h1 className="flex text-customGreen text-sm font-bold gap-2">
                            {item.price}
                          </h1>
                          <p className="text-sm font-bold">
                            x{item.quantity} {item.unit}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between mb-2">
                  <h1 className="font-bold">Thành tiền</h1>
                  <h1 className="text-customGreen font-bold">
                    {calculateTotalPrice()}
                  </h1>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold flex justify-center">
                    {calculateTotalQuantity()} sản phẩm
                  </h1>
                  <button
                    type="submit"
                    className=" text-sm  px-4 py-2 bg-customGreen text-white rounded-3xl shadow-md hover:bg-green-500"
                  >
                    Thanh toán ngay
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <p className="text-lg font-semibold mb-4 pl-4">
        Chọn hình thức nhận hàng
      </p>
      <div className="flex-col space-y-2 pl-4">
        <div className="space-x-2">
          <button
            type="button"
            className={`flex gap-2 px-3 py-3 text-base border-2 rounded-lg  hover:border-black ${
              paymentMethod === PaymentMethod.COD
                ? "bg-emerald-100"
                : "bg-white"
            }`}
            onClick={() => {
              setPaymentMethod(PaymentMethod.COD);
            }}
          >
            <img src="/assets/cod.png" className="w-6" />
            Thanh toán khi nhận hàng (COD)
          </button>
        </div>
        <div className="space-x-2">
          <button
            type="button"
            className={`flex gap-2 px-3 py-3 text-base border-2 rounded-lg  hover:border-black ${
              paymentMethod == PaymentMethod.VNPAY
                ? "bg-emerald-100"
                : "bg-white"
            }`}
            onClick={() => setPaymentMethod(PaymentMethod.VNPAY)}
          >
            <img src="/assets/vnpay.png" className="w-6 h-6 object-cover" />
            Thanh toán qua VnPay
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShippingInfo;
