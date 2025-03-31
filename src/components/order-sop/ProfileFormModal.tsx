import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message, Spin, Select } from "antd";
import { debounce } from "lodash";
import useAddressService from "../../services/useAddressService";
import useLocationService from "../../services/useLocationService";

const { Option } = Select;

interface ProfileFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: ProfileFormValues) => void;
  loading: boolean;
}

export interface ProfileFormValues {
  customer_name: string;
  email: string;
  phone: string;
  address: string;
}

const ProfileFormModal: React.FC<ProfileFormModalProps> = ({
  visible,
  onClose,
  onSubmit,
  loading
}) => {
  const [form] = Form.useForm();
  const { getProvinces, getDistricts, getWards } = useLocationService();
  
  const [provinces, setProvinces] = useState<{ id: number; name: string }[]>([]);
  const [districts, setDistricts] = useState<{ id: number; name: string }[]>([]);
  const [wards, setWards] = useState<{ id: number; name: string }[]>([]);
  
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const [selectedWard, setSelectedWard] = useState<number | null>(null);
  
  const [detailAddress, setDetailAddress] = useState<string>("");
  
  const [suggestions, setSuggestions] = useState<{ place_id: string; description: string }[]>([]);
  const { fetchSuggestions, loading: suggestionsLoading } = useAddressService();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        if (data) setProvinces(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tỉnh/thành phố:", error);
      }
    };
    
    fetchProvinces();
  }, [getProvinces]);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const data = await getDistricts(selectedProvince);
          if (data) setDistricts(data);
          setSelectedDistrict(null);
          setWards([]);
          setSelectedWard(null);
        } catch (error) {
          console.error("Lỗi khi lấy danh sách quận/huyện:", error);
        }
      };
      
      fetchDistricts();
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [selectedProvince, getDistricts]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        try {
          const data = await getWards(selectedDistrict);
          if (data) setWards(data);
          setSelectedWard(null);
        } catch (error) {
          console.error("Lỗi khi lấy danh sách phường/xã:", error);
        }
      };
      
      fetchWards();
    } else {
      setWards([]);
    }
  }, [selectedDistrict, getWards]);

  useEffect(() => {
    if (!detailAddress || detailAddress.length < 3) {
      setSuggestions([]);
      return;
    }

    let searchAddress = detailAddress;
    if (selectedWard && wards.length) {
      const ward = wards.find(w => w.id === selectedWard);
      if (ward) searchAddress += `, ${ward.name}`;
    }
    if (selectedDistrict && districts.length) {
      const district = districts.find(d => d.id === selectedDistrict);
      if (district) searchAddress += `, ${district.name}`;
    }
    if (selectedProvince && provinces.length) {
      const province = provinces.find(p => p.id === selectedProvince);
      if (province) searchAddress += `, ${province.name}`;
    }

    const debouncedFetch = debounce(async () => {
      const results = await fetchSuggestions(searchAddress);
      setSuggestions(results);
    }, 300);

    debouncedFetch();
    
    return () => debouncedFetch.cancel();
  }, [detailAddress, selectedWard, selectedDistrict, selectedProvince, wards, districts, provinces, fetchSuggestions]);

  const handleSelectAddress = (description: string) => {
    setDetailAddress(description);
    setSuggestions([]);
  };

  const handleSubmit = () => {
    form.validateFields()
      .then((values) => {
        let fullAddress = detailAddress;
        
        const province = provinces.find(p => p.id === selectedProvince)?.name || '';
        const district = districts.find(d => d.id === selectedDistrict)?.name || '';
        const ward = wards.find(w => w.id === selectedWard)?.name || '';
        
        if (ward) fullAddress += `, ${ward}`;
        if (district) fullAddress += `, ${district}`;
        if (province) fullAddress += `, ${province}`;
        
        const updatedValues = {
          ...values,
          address: fullAddress
        };
        
        onSubmit(updatedValues);
      })
      .catch(() => {
        message.error("Vui lòng kiểm tra lại thông tin!");
      });
  };

  useEffect(() => {
    if (visible) {
      form.resetFields();
      setSelectedProvince(null);
      setSelectedDistrict(null);
      setSelectedWard(null);
      setDetailAddress("");
      setSuggestions([]);
    }
  }, [visible, form]);

  return (
    <Modal
      title="Tạo hồ sơ mới"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
          style={{ backgroundColor: "#62D985" }}
        >
          Tạo hồ sơ
        </Button>
      ]}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        name="profile_form"
      >
        <Form.Item
          name="customer_name"
          label="Họ và tên"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" }
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^(0[3|5|7|8|9])+([0-9]{8})\b/,
              message: "Số điện thoại không hợp lệ!"
            }
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item label="Địa chỉ" required>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <Select
              placeholder="Tỉnh/thành phố"
              value={selectedProvince || undefined}
              onChange={(value) => setSelectedProvince(value)}
              className="w-full"
              showSearch
              filterOption={(input, option) =>
                (option?.children as unknown as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              optionFilterProp="children"
            >
              {provinces.map(province => (
                <Option key={province.id} value={province.id}>{province.name}</Option>
              ))}
            </Select>
            
            <Select
              placeholder="Quận/huyện"
              value={selectedDistrict || undefined}
              onChange={(value) => setSelectedDistrict(value)}
              className="w-full"
              disabled={!selectedProvince}
              showSearch
              filterOption={(input, option) =>
                (option?.children as unknown as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              optionFilterProp="children"
            >
              {districts.map(district => (
                <Option key={district.id} value={district.id}>{district.name}</Option>
              ))}
            </Select>
            
            <Select
              placeholder="Phường/xã"
              value={selectedWard || undefined}
              onChange={(value) => setSelectedWard(value)}
              className="w-full"
              disabled={!selectedDistrict}
              showSearch
              filterOption={(input, option) =>
                (option?.children as unknown as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              optionFilterProp="children"
            >
              {wards.map(ward => (
                <Option key={ward.id} value={ward.id}>{ward.name}</Option>
              ))}
            </Select>
          </div>
          
          <div className="relative">
            <Input
              placeholder="Nhập địa chỉ chi tiết (số nhà, tên đường...)"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              className="w-full"
              required
            />
            
            {suggestionsLoading && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Spin size="small" />
              </div>
            )}
            
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto shadow-lg">
                {suggestions.map((item) => (
                  <li
                    key={item.place_id}
                    onClick={() => handleSelectAddress(item.description)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                  >
                    {item.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {!detailAddress && (
            <div className="text-red-500 text-sm mt-1">Vui lòng nhập địa chỉ chi tiết</div>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProfileFormModal;