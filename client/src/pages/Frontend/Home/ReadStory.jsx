import React from "react";
import aboutImg from "../../../assets/about-cta.webp";
import { useNavigate } from "react-router-dom";

const ReadStory = () => {
  const navigate = useNavigate();
  return (
    <div className="py-20 md:py-32 bg-nav overflow-hidden">
      <div
        className="max-w-[95%] md:max-w-[80%] mx-auto relative rounded-3xl overflow-hidden shadow-2xl"
        data-aos="zoom-in-up"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={aboutImg}
            alt="Impact Story"
            className="w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 px-6 py-16 md:p-24 md:w-3/5 lg:w-1/2 flex flex-col justify-center min-h-[400px] md:min-h-[500px]">
          <div className="w-16 h-1 bg-primary mb-8 rounded-full"></div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            Make giving personal. <br />
            <span className="text-primary italic font-medium">
              Create positive change.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
            By making the giving process more transparent and keeping you
            connected to the causes, we empower everyone to reshape the world
            for the better.
          </p>
          <button
            onClick={() => navigate("/about")}
            className="bg-primary text-white font-bold text-lg !px-10 !py-4 rounded-full shadow-lg hover:bg-white hover:text-black transition-all duration-300 w-max hover:-translate-y-1"
          >
            Read Our Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadStory;
