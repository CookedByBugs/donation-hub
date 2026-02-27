import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import ActiveCampaigns from "./screens/ActiveCampaigns";
import CampaignViewer from "./screens/CampaignViewer";
import Profile from "./screens/Profile";
const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/active-campaigns" element={<ActiveCampaigns />} />
      <Route path="/active-campaigns/:id" element={<CampaignViewer />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default Index;
