import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Form, Col, Row, Divider, message, Select, Upload } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LockFilled, PlusOutlined, UserOutlined } from "@ant-design/icons";
const Register = () => {
  document.title = "Register | Donation Hub";
  const navigate = useNavigate();
  const initState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    NGO: "",
  };
  const [state, setState] = useState(initState);
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let { firstName, lastName, email, password, confirmPassword } = state;
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    if (!firstName) {
      return message.error("Please enter first name");
    }
    if (!lastName) {
      return message.error("Please enter last name");
    }
    if (!email) {
      return message.error("Please enter email address");
    }
    if (!password) {
      return message.error("Please enter password");
    }
    if (password !== confirmPassword) {
      return message.error("Password does not match");
    }
    if (!role) {
      return message.error("Please select role");
    }
    if (role === "ngo" && !state.NGO) {
      return message.error("Please enter NGO name");
    }
    if (!image) {
      return message.error("Please upload profile image");
    }
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    if (role === "ngo") {
      formData.append("NGO", state.NGO);
    }
    if (image) {
      formData.append("profileImage", image);
    }

    console.log("formData", formData);
    await axios
      .post(`${import.meta.env.VITE_API_URL}/api/user/register`, formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          setState(initState);
          message.success("User registered successfully");
          console.log("Directing to login page...");
          navigate("/auth/login");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("User registration failed");
      });
  };
  return (
    <div className="bg-nav p-3 flex justify-center items-center min-h-screen">
      <div className="bg-white md:max-w-[70%] w-full mx-auto shadow-2xl py-10 px-5 rounded-2xl">
        <div className="flex items-center justify-center gap-3">
          <h2 className="md:text-5xl text-3xl pb-5 text-primary font-semibold my-5">
            Register <UserOutlined />
          </h2>
        </div>
        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} sm={0} xs={0}>
            <div className="flex justify-center items-center h-full">
              <DotLottieReact
                src="https://lottie.host/a53c8c12-bba7-4f17-b843-202373f8803f/rff4aFXMw1.lottie"
                loop
                className="w-full"
                autoplay
              />
            </div>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <div className="max-w-[500px] mx-auto h-full flex justify-center items-center">
              <div className="w-full">
                <Form layout="vertical">
                  <Row gutter={[16, 16]}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Form.Item label="First Name" required>
                        <input
                          className="auth-field transition-150"
                          name="firstName"
                          type="text"
                          onChange={handleChange}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Form.Item label="Last Name" required>
                        <input
                          className="auth-field transition-150"
                          name="lastName"
                          type="text"
                          onChange={handleChange}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="Email" required>
                        <input
                          className="auth-field transition-150"
                          name="email"
                          type="email"
                          onChange={handleChange}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Form.Item label="Password" required>
                        <input
                          type="password"
                          name="password"
                          onChange={handleChange}
                          className="auth-field transition-150"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Form.Item label="Confirm Password" required>
                        <input
                          type="password"
                          name="confirmPassword"
                          onChange={handleChange}
                          className="auth-field transition-150"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="Role" required>
                        <Select
                          placeholder="What defines you well?"
                          className="transition-150"
                          onChange={(val) => setRole(val)}
                        >
                          <Select.Option value="donor">Donor</Select.Option>
                          <Select.Option value="ngo">NGO</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    {role === "ngo" && (
                      <Col span={24}>
                        <Form.Item label="NGO name" className="text-center">
                          <input
                            type="text"
                            name="NGO"
                            onChange={handleChange}
                            className="auth-field transition-150"
                          />
                        </Form.Item>
                      </Col>
                    )}
                    <Col span={24}>
                      <Form.Item required label="Profile Image">
                        <Upload
                          beforeUpload={(file) => {
                            setImage(file);
                            return false;
                          }}
                          maxCount={1}
                          onChange={(e) => setImage(e.file)}
                          className="p-3"
                        >
                          <p className="flex items-center gap-2 shadow border rounded-lg p-2">
                            <PlusOutlined className="text-4xl" />
                            Upload Image
                          </p>
                        </Upload>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Link to="/auth/login" className="text-center">
                        Already have an account?
                      </Link>
                    </Col>
                    <Col span={24}>
                      <Form.Item className="text-center">
                        <button
                          onClick={handleSubmit}
                          className="btn-primary transition-150"
                        >
                          Register <LockFilled />
                        </button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Register;
