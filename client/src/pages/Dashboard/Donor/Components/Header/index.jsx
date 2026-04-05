import React, { useState } from "react";
import { MenuOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useTabContext } from "../../../../../contexts/Tab/TabContext";
import { useAuthContext } from "../../../../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { setIsOpen, isOpen } = useTabContext();
  const [hover, setHover] = useState(false);
  const { user, handleLogout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-3 fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      <div className="max-w-[95%] md:max-w-[90%] mx-auto flex justify-between items-center">
        {/* Left Side: Menu + Title */}
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            className="text-xl md:text-2xl text-gray-700 hover-text-primary hover:bg-gray-100 p-2 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MenuOutlined />
          </button>
          <div className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-tight select-none">
            Donor <span className="text-primary font-medium">Dashboard</span>
          </div>
        </div>

        {/* Right Side: Profile */}
        <div 
          className="relative flex items-center justify-center"
          onMouseEnter={() => setHover(true)} 
          onMouseLeave={() => setHover(false)}
        >
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-primary/20 p-0.5 cursor-pointer shadow-sm hover:shadow-md hover:border-primary transition-all">
            {user?.profileImage ? (
              <img src={user?.profileImage} alt="profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-lg">
                <UserOutlined />
              </div>
            )}
          </div>

          {/* Improved Dropdown */}
          <div 
            className={`absolute z-50 top-full pt-3 right-0 transition-all duration-300 ${
              hover ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-56 overflow-hidden">
              <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100">
                <p className="font-bold text-gray-800 text-base truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
              </div>
              <div className="p-2">
                <button 
                  onClick={() => navigate("/dashboard/profile")} 
                  className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-gray-700 font-medium rounded-xl hover-text-primary hover:bg-primary/5 transition-colors"
                >
                  <UserOutlined /> Profile
                </button>
                <button 
                  onClick={() => {
                    handleLogout();
                    navigate("/");
                  }}
                  className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors mt-1"
                >
                  <LogoutOutlined /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
