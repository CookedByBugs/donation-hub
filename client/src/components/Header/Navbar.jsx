import React, { useState } from "react";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/Auth/AuthContext";
const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { isAuth, handleLogout } = useAuthContext();
  return (
    <header className="p-3 bg-primary ">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="text-2xl text-white font-bold select-none">
          Donation Hub
        </a>

        <nav className="hidden md:flex items-center gap-1">
          <a className="nav-link transition-150" href="#">
            Home
          </a>
          <a className="nav-link transition-150" href="#">
            About
          </a>
          <a className="nav-link transition-150" href="#">
            Contact
          </a>
          <Link to="/dashboard" className="nav-link transition-150">
            Dashboard
          </Link>
        </nav>

        {isAuth ? (
          <div className="hidden md:block">
            <button
              onClick={() => handleLogout()}
              className="btn-danger transition-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:block">
            <Link to="/auth/login" className="btn-danger transition-300">
              Login
            </Link>
          </div>
        )}

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 transition-150"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only !text-xl">Open main menu</span>

          {!open ? <MenuOutlined /> : <CloseOutlined />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="mt-2 rounded-lg bg-primary backdrop-blur-[2px] border border-white/10">
          <nav className="flex flex-col">
            <a
              className="text-white px-4 py-3 hover:bg-white/10 transition-150"
              href="#"
              onClick={() => setOpen(false)}
            >
              Home
            </a>
            <a
              className="text-white px-4 py-3 hover:bg-white/10 transition-150"
              href="#"
              onClick={() => setOpen(false)}
            >
              About
            </a>
            <a
              className="text-white px-4 py-3 hover:bg-white/10 transition-150"
              href="#"
              onClick={() => setOpen(false)}
            >
              Contact
            </a>
            {isAuth && (
              <a
                className="text-white px-4 py-3 hover:bg-white/10 transition-150"
                href="#"
                onClick={() => {
                  setOpen(false);
                  navigate("/dashboard");
                }}
              >
                Dashboard
              </a>
            )}
          </nav>
          {isAuth ? (
            <div className="px-4 py-3 border-t border-white/10">
              <button
                onClick={() => handleLogout()}
                className="btn-danger transition-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="px-4 py-3 border-t border-white/10">
              <Link to="/auth/login" className="btn-danger transition-300">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
