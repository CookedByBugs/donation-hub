import React from "react";
import Donations from "./Donations";

const DonationHistory = () => {
  document.title = "Donation History | Donation Hub";
  return (
    <div className="md:max-w-[80%] max-w-[95%] mx-auto">
      <div className="pt-32 mb-15 text-primary md:text-5xl text-3xl font-bold text-center">
        Donation History
      </div>
      <Donations />
    </div>
  );
};

export default DonationHistory;
