import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <div className="py-24 bg-white text-center">
      <div className="md:max-w-[80%] max-w-[95%] mx-auto bg-primary rounded-3xl p-12 md:p-20 shadow-xl">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Make a Difference?
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Join thousands of other donors and help fund campaigns that change lives. Your contribution, big or small, matters.
        </p>
        <Link to="/campaigns" className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-md">
          Explore Campaigns
        </Link>
      </div>
    </div>
  );
};

export default CTA;
