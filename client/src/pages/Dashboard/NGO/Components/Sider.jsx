import React from "react";
import {
  BarChartOutlined,
  HomeOutlined,
  MenuOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import Logo from "../../../../assets/logo.jpeg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTabContext } from "../../../../contexts/Tab/TabContext";

const Sider = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsOpen, isOpen } = useTabContext();
  const links = [
    { label: "Dashboard", to: "/dashboard", icons: BarChartOutlined },
    {
      label: "Campaigns",
      to: "/dashboard/campaign-management",
      icons: NotificationOutlined,
    },
  ];

  return (
    <div
      className={`sider transition-all duration-500 overflow-y-auto overflow-x-hidden ${
        !isOpen
          ? "w-0 -translate-x-full"
          : "w-[280px] md:w-[320px] translate-x-0"
      }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="flex items-center gap-3 select-none group">
            <img
              src={Logo}
              className="w-10 h-10 rounded-full shadow-sm group-hover:scale-105 transition-transform"
              alt="Logo"
            />
            <span className="text-xl font-extrabold text-gray-800 tracking-tight whitespace-nowrap">
              Donation <span className="text-primary font-medium">Hub</span>
            </span>
          </Link>
          <button
            className="text-gray-500 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <MenuOutlined className="text-xl" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link key={link.label} to={link.to}>
                <div
                  className={`px-4 py-3.5 rounded-xl transition-all duration-200 flex items-center group ${
                    isActive
                      ? "bg-primary/10 text-primary font-bold shadow-sm"
                      : "text-gray-600 hover:bg-primary/5 hover:text-primary font-medium"
                  }`}
                >
                  <link.icons
                    className={`text-xl mr-4 ${isActive ? "text-primary" : "text-gray-400 group-hover:text-primary"}`}
                  />
                  <span className="whitespace-nowrap">{link.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 px-6">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 p-3 rounded-xl hover-bg-primary cursor-pointer hover:text-white hover:border-primary transition-all duration-300 text-gray-600 shadow-sm"
        >
          <HomeOutlined className="text-lg" />
          <span className="font-semibold whitespace-nowrap">Back to Home</span>
        </button>
      </div>
    </div>
  );
};

export default Sider;
