import React from "react";
import HeroImage from "../../../assets/hero.webp";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="relative">
        <div className="top-[50%] left-[50%] -translate-1/2 z-50 absolute">
          <div data-aos="fade-up" className="text-center text-white">
            <h1 className="text-6xl font-bold my-2">Donation Hub</h1>
            <p className="text-xl my-2 capitalize">
              Every rupee matters
            </p>
            <div className="text-center">
              <button
                className="btn-primary"
                onClick={() => navigate("/dashboard")}
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
        <img
          src={HeroImage}
          alt="Hero"
          className="select-none brightness-50 w-full h-[600px] object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
