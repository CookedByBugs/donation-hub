import React, { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { useTabContext } from "../../../../../contexts/Tab/TabContext";
import { useAuthContext } from "../../../../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { setIsOpen, isOpen } = useTabContext();
  const [hover, setHover] = useState();
  const { user, handleLogout } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="bg-primary py-3 fixed top-0 left-0 right-0 z-45">
      <div className="w-[80%] font-bold text-white mx-auto flex justify-between items-center">
        <div
          className="text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuOutlined />
        </div>
        <div className="text-3xl">Donor Panel</div>
        <div className="md:w-10 md:h-10 w-8 h-8 flex items-center justify-center rounded-full transition-150">
          <div
            className="relative"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <img
              src={user?.profileImage}
              alt="profile"
              className="w-full h-full rounded-full"
            />
            <div
              className={`absolute transition-300 z-50 top-10 right-0 rounded-xl text-black bg-white  overflow-hidden ${hover ? "max-h-52" : "max-h-0 opacity-0"}`}
            >
              <div className="px-4 py-2 rounded-xl">
                <p
                  onClick={() => {
                    navigate("/dashboard/profile");
                  }}
                  className="cursor-pointer"
                >
                  Profile
                </p>
                <hr className="my-2" />
                <p
                  className="cursor-pointer text-danger"
                  onClick={() => {
                    handleLogout();
                    navigate("/");
                  }}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
