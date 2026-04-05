import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import CampaignManagement from "./screens/Campain Management";
import Analytics from "./screens/Analytics";
import AddCampaign from "./screens/Campain Management/AddCampaign";
import Campaign from "./screens/Campaign";
import Profile from "./screens/Profile";
import CampaignViewer from "./screens/CampaignViewer";
const Index = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="campaign-management" element={<CampaignManagement />} />
      <Route
        path="campaign-management/add-campaign"
        element={<AddCampaign />}
      />
      <Route path="campaign-management/:id" element={<Campaign />} />
      <Route path="analytics-reports" element={<Analytics />} />
      <Route path="profile" element={<Profile />} />
      <Route path="campaign-viewer/:id" element={<CampaignViewer />} />
    </Routes>
  );
};

export default Index;
