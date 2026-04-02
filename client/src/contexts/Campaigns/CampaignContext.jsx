import { message } from "antd";
import axios from "axios";
import React, { createContext, useContext } from "react";

const CampaignContext = createContext();

const CampaignProvider = ({ children }) => {
  const handleDelete = async (id) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/campaign/update-status/${id}`,
        { status: "inactive" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      console.log(res);
      message.success("Campaign deleted successfully");
    } catch (error) {
      message.error("Failed to delete campaign");
      console.error(error);
    }
  };
  const handleComplete = async (id) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/campaign/update-status/${id}`,
        { status: "completed" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      message.success("Campaign completed successfully");
    } catch (error) {
      message.error("Failed to complete campaign");
      console.error(error);
    }
  };

  return (
    <CampaignContext.Provider value={{ handleDelete, handleComplete }}>
      {children}
    </CampaignContext.Provider>
  );
};
export const useCampaignContext = () => useContext(CampaignContext);

export default CampaignProvider;
