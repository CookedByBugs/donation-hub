import { Col, Form, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useAuthContext } from "@/contexts/Auth/AuthContext";
import axios from "axios";

const ProfileForm = () => {
  const { Item } = Form;
  const [isEdit, setIsEdit] = useState(false);
  const { user, fetchProfile } = useAuthContext();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (user) {
      setState({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        city: user.city || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
    message.info(!isEdit ? "Editing Profile" : "Profile Updated");
    if (isEdit === false) return;
    const { firstName, lastName, email, phone, city, address } = state;
    if (!firstName) return message.error("First Name is required");
    if (!lastName) return message.error("Last Name is required");
    if (!email) return message.error("Email is required");
    if (!phone) return message.error("Phone is required");
    if (!city) return message.error("City is required");
    if (!address) return message.error("Address is required");
    const formData = {
      firstName,
      lastName,
      email,
      phone,
      city,
      address,
    };
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      console.log(res.data);
      message.success("Profile Updated Successfully");
      fetchProfile();
    } catch (error) {
      console.log(error);
      message.error("Failed to Update Profile");
    }
  };
  const cities = [
    "abbottabad",
    "ahmedpur east",
    "arifwala",
    "attock",
    "bahawalnagar",
    "bahawalpur",
    "burewala",
    "chakwal",
    "chaman",
    "chiniot",
    "dera ghazi khan",
    "dera ismail khan",
    "faisalabad",
    "gojra",
    "gujranwala",
    "gujrat",
    "hafizabad",
    "hyderabad",
    "islamabad",
    "jaccoabad",
    "jhang",
    "jhelum",
    "kamoke",
    "karachi",
    "kasur",
    "khairpur",
    "khanewal",
    "khanpur",
    "kohat",
    "kot addu",
    "lahore",
    "larkana",
    "mardan",
    "mianwali",
    "mingora",
    "mirpur khas",
    "multan",
    "muzaffargarh",
    "nawabshah",
    "nowshera",
    "okara",
    "pakpattan",
    "peshawar",
    "quetta",
    "rahim yar khan",
    "rawalpindi",
    "sahiwal",
    "sargodha",
    "sheikhupura",
    "sialkot",
    "sukkur",
    "tando adam",
    "wah cantt",
  ];
  return (
    <div className="my-10">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-400 p-5">
        <Form>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Profile Information</h2>
                <button
                  type="button"
                  onClick={handleEdit}
                  className="btn-primary"
                >
                  {isEdit ? "Save" : "Edit"}
                </button>
              </div>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Item label={"First Name:"} layout="vertical">
                <input
                  name="firstName"
                  disabled={!isEdit}
                  className="auth-field"
                  onChange={handleChange}
                  value={state.firstName}
                />
              </Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Item label={"Last Name:"} layout="vertical">
                <input
                  name="lastName"
                  disabled={!isEdit}
                  className="auth-field"
                  onChange={handleChange}
                  value={state.lastName}
                />
              </Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Item label={"Email:"} layout="vertical">
                <input
                  name="email"
                  disabled={!isEdit}
                  className="auth-field"
                  onChange={handleChange}
                  value={state.email}
                />
              </Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Item label={"Phone:"} layout="vertical">
                <input
                  name="phone"
                  disabled={!isEdit}
                  className="auth-field"
                  onChange={handleChange}
                  value={state.phone}
                />
              </Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="h-full!">
              <Item label={"City:"} layout="vertical">
                <Select
                  name="city"
                  className="capitalize! mt-4.5!"
                  disabled={!isEdit}
                  showSearch
                  onChange={(value) => setState({ ...state, city: value })}
                  value={state.city}
                >
                  {cities.map((city) => {
                    return (
                      <Select.Option className="capitalize!" value={city}>
                        {city}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Item label={"Address:"} layout="vertical">
                <input
                  name="address"
                  disabled={!isEdit}
                  className="auth-field"
                  onChange={handleChange}
                  value={state.address}
                />
              </Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default ProfileForm;
