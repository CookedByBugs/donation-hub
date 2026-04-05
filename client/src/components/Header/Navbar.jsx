import React, { useState, useEffect } from "react";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/Auth/AuthContext";
import Logo from "../../assets/logo.jpeg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuth, handleLogout } = useAuthContext();

  // Add scroll listener for dynamic header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `font-semibold text-base transition-colors duration-200 px-2 py-1 ${
      isActive(path)
        ? "text-primary border-b-2 border-primary"
        : "text-gray-700 hover-text-primary"
    }`;

  const mobileLinkClass = (path) =>
    `block px-4 py-3 text-lg font-medium transition-colors ${
      isActive(path)
        ? "text-primary bg-primary/5"
        : "text-gray-700 hover:bg-gray-50 hover-text-primary"
    }`;

  return (
    <div
      className={`transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-2"
          : "bg-white py-4"
      }`}
    >
      <div className="max-w-[95%] md:max-w-[80%] mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 select-none group">
          <img
            src={Logo}
            alt="Donation Hub Logo"
            className="w-10 h-10 rounded-full shadow-sm group-hover:scale-105 transition-transform"
          />
          <span className="text-2xl font-extrabold text-gray-800 tracking-tight">
            Donation<span className="text-primary font-medium">Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link className={linkClass("/")} to="/">
            Home
          </Link>
          <Link className={linkClass("/about")} to="/about">
            About
          </Link>
          <Link className={linkClass("/contact")} to="/contact">
            Contact
          </Link>
          {isAuth && (
            <Link className={linkClass("/dashboard")} to="/dashboard">
              Dashboard
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isAuth ? (
            <button
              onClick={() => handleLogout()}
              className="text-gray-600 font-semibold hover:text-red-500 transition-colors px-4 py-2"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="text-gray-700 font-semibold hover-text-primary transition-colors px-4 py-2"
              >
                Log in
              </Link>
              <Link
                to="/auth/register"
                className="btn-primary !py-2.5 !px-6 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm font-bold"
              >
                Sign Up Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <CloseOutlined className="text-xl" /> : <MenuOutlined className="text-xl" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out absolute w-full left-0 bg-white border-b border-gray-100 shadow-xl ${
          open ? "max-h-96 opacity-100 top-full" : "max-h-0 opacity-0 top-full pointer-events-none"
        }`}
      >
        <nav className="flex flex-col py-2">
          <Link className={mobileLinkClass("/")} to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link className={mobileLinkClass("/about")} to="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link className={mobileLinkClass("/contact")} to="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
          {isAuth && (
            <Link className={mobileLinkClass("/dashboard")} to="/dashboard" onClick={() => setOpen(false)}>
              Dashboard
            </Link>
          )}
          
          <div className="px-4 py-4 mt-2 border-t border-gray-100 flex flex-col gap-3">
            {isAuth ? (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="w-full py-3 text-center text-red-500 font-bold bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  onClick={() => setOpen(false)}
                  className="w-full py-3 text-center text-gray-700 font-bold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/auth/register"
                  onClick={() => setOpen(false)}
                  className="w-full py-3 text-center text-white font-bold bg-primary rounded-lg shadow-md hover:brightness-110 transition-all"
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
