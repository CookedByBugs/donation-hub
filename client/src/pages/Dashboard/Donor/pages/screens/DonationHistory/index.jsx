import React from "react";
import Donations from "./Donations";

const DonationHistory = () => {
  document.title = "Donation History | Donation Hub";
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 pt-28">
      <div className="max-w-[95%] md:max-w-[85%] mx-auto">
        <div className="text-center mb-12">
          <h1 className="md:text-5xl text-3xl font-extrabold text-gray-800 tracking-tight mb-4">
            Donation <span className="text-primary font-medium">History</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Your incredible journey of giving. Track the impact of your contributions over time.
          </p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8">
          <Donations />
        </div>
      </div>
    </div>
  );
};

export default DonationHistory;
