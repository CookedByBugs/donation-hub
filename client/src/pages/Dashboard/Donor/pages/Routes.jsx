import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import ActiveCampaigns from "./screens/ActiveCampaigns";
import CampaignViewer from "./screens/CampaignViewer";
import Profile from "./screens/Profile";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/components/stripe";
import DonationHistory from "./screens/DonationHistory";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/active-campaigns" element={<ActiveCampaigns />} />
      <Route
        path="/active-campaigns/:id"
        element={
          <Elements stripe={stripePromise}>
            <CampaignViewer />
          </Elements>
        }
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/donation-history" element={<DonationHistory />} />
    </Routes>
  );
};

export default Index;
