import React from "react";

const Hero = () => {
  return (
    <div className="bg-nav py-20 text-center">
      <div className="md:max-w-[80%] max-w-[95%] mx-auto mt-10">
        <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 animate-fade-in">
          About Us
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          We are a community-driven platform dedicated to connecting passionate donors with verified NGOs to create meaningful and lasting impact.
        </p>
      </div>
    </div>
  );
};

export default Hero;
