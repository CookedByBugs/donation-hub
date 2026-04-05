import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Form, Col, Row, Divider, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined, LockFilled } from "@ant-design/icons";
import axios from "axios";
import { useAuthContext } from "../../../contexts/Auth/AuthContext";
const Login = () => {
  document.title = "Login | Donation Hub";
  const navigate = useNavigate();
  const { fetchProfile } = useAuthContext();
  const initState = {
    email: "",
    password: "",
  };
  const [state, setState] = useState(initState);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let { email, password } = state;
    email = email.trim();
    if (!email) {
      return message.error("Please enter email address");
    }
    if (!password) {
      return message.error("Please enter password");
    }
    const formData = {
      email,
      password,
    };
    console.log(formData);
    await axios
      .post(`${import.meta.env.VITE_API_URL}/api/user/login`, formData)
      .then(async (res) => {
        console.log(res.data);
        localStorage.setItem("authToken", res.data.token);
        if (res.data.status === "success") {
          message.success("User logged in successfully");
          console.log("Login was successful");
          await fetchProfile();

          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("User login failed");
      });
  };
  return (
    <div className="bg-nav p-3 flex justify-center items-center min-h-screen">
      <div className="bg-white md:max-w-[70%] w-full mx-auto shadow-2xl py-10 px-5 rounded-2xl">
        <div className="flex justify-center items-center md:gap-3 gap-1">
          <h2 className="md:text-5xl text-center text-3xl text-primary font-semibold my-5 ">
            Login <UserOutlined />
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
                  <Form.Item label="Email" required>
                    <input
                      placeholder="Enter your email"
                      className="auth-field transition-150"
                      name="email"
                      type="email"
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item label="Password" required>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      onChange={handleChange}
                      className="auth-field transition-150"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Link to="/auth/register" className="text-center">
                      Don't have an account? <span>Register</span>
                    </Link>
                  </Form.Item>
                  <Form.Item className="text-center">
                    <button
                      onClick={handleSubmit}
                      className="btn-primary transition-150"
                    >
                      Login <LockFilled />
                    </button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
