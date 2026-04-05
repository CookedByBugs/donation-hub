import React from "react";
import HeroImage from "../../../assets/hero.webp";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HeroImage}
          alt="Hero"
          className="w-full h-full object-cover select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[95%] md:max-w-[80%] mx-auto px-4 md:px-0">
        <div data-aos="fade-up" className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight">
            Make A Difference <br />
            <span className="text-primary italic">Today.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-medium">
            Every contribution matters. Join Donation Hub to seamlessly connect with causes you care about and create lasting impact.
          </p>
          <div className="flex gap-4">
            <button
              className="btn-primary text-lg !px-8 !py-4 rounded-full shadow-lg hover:shadow-primary/50 transition-all hover:-translate-y-1"
              onClick={() => navigate("/dashboard")}
            >
              Start Donating
            </button>
            <button
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-black text-lg !px-8 !py-4 rounded-full shadow-lg transition-all"
              onClick={() => navigate("/about")}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
