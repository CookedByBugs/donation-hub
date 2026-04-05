import React from "react";
import {
  HeartFilled,
  InstagramOutlined,
  LinkedinFilled,
  MailOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-nav pt-16 pb-8 border-t border-gray-200 mt-auto w-full">
      <div className="max-w-[95%] md:max-w-[80%] mx-auto w-full flex flex-col md:flex-row gap-12 md:gap-8 justify-between">
        {/* Brand Section */}
        <div className="md:w-1/3 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="Donation Hub Logo"
              className="w-12 h-12 rounded-full shadow-sm"
            />
            <span className="text-3xl font-extrabold text-gray-800 tracking-tight">
              Donation <span className="text-primary font-medium">Hub</span>
            </span>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Empowering communities to make a lasting difference. Join us in
            connecting generous donors with verified NGOs across the globe to
            fund meaningful campaigns.
          </p>
          <div className="flex gap-4 items-center">
            <div className="social-icons flex items-center justify-center w-10 h-10">
              <InstagramOutlined className="text-lg" />
            </div>
            <div className="social-icons flex items-center justify-center w-10 h-10">
              <LinkedinFilled className="text-lg" />
            </div>
            <div className="social-icons flex items-center justify-center w-10 h-10">
              <MailOutlined className="text-lg" />
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-xl text-gray-800 mb-2">Join Us</h3>
            <Link to="/auth/login" className="foot-link !border-none w-max">
              Login
            </Link>
            <Link to="/auth/register" className="foot-link !border-none w-max">
              Register
            </Link>
            <Link to="/dashboard" className="foot-link !border-none w-max">
              Dashboard
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-xl text-gray-800 mb-2">Company</h3>
            <Link to="/about" className="foot-link !border-none w-max">
              About Us
            </Link>
            <Link to="/contact" className="foot-link !border-none w-max">
              Contact
            </Link>
            <Link to="/blog" className="foot-link !border-none w-max">
              Blog & News
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-xl text-gray-800 mb-2">Info</h3>
            <Link to="/about" className="foot-link !border-none w-max">
              Privacy Policy
            </Link>
            <Link to="/about" className="foot-link !border-none w-max">
              Terms of Service
            </Link>
            <Link to="/about" className="foot-link !border-none w-max">
              Help Center
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[95%] md:max-w-[80%] mx-auto w-full mt-16 pt-8 border-t border-gray-300/50 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 font-medium">
        <p>
          &copy; {new Date().getFullYear()} Donation Hub. All Rights Reserved.
        </p>
        <div className="flex gap-6">
          <p className="hover-text-primary cursor-pointer transition-colors">
            Privacy
          </p>
          <p className="hover-text-primary cursor-pointer transition-colors">
            Terms
          </p>
          <p className="hover-text-primary cursor-pointer transition-colors">
            Cookies
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
