import React from "react";
import {
  BarChartOutlined,
  DollarCircleFilled,
  HeartFilled,
  MenuOutlined,
  NotificationOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useTabContext } from "../../../../contexts/Tab/TabContext";
const Sider = () => {
  const location = useLocation();
  const { setIsOpen, isOpen } = useTabContext();
  const links = [
    { label: "Dashboard", to: "/dashboard", icons: BarChartOutlined },
    {
      label: "Campaign Management",
      to: "/dashboard/campaign-management",
      icons: NotificationOutlined,
    },
  ];

  return (
    <div
      className={`sider z-50 transition-all duration-500 overflow-y-hidden bg-primary ${
        !isOpen ? "w-0" : "md:w-[350px] w-[300px] p-3"
      }`}
    >
      <div className={`flex justify-between flex-row-reverse items-center `}>
        <div
          className={`text-2xl cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuOutlined />
        </div>
        <Link title="Home" to="/" className="text-2xl text-center">
          <HeartFilled className="bg-secondary p-3 rounded-full" /> Donation Hub
        </Link>
      </div>
      <hr className="my-4" />
      <div>
        {links.map((link) => (
          <Link key={link.label} to={link.to}>
            <div
              className={`p-3 hover:bg-white/85 hover:text-black ${
                location.pathname === link.to && "bg-white !text-black"
              } rounded transition-150 border-primary my-2 flex items-center `}
            >
              <link.icons />
              <span className="ml-2">{link.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sider;
