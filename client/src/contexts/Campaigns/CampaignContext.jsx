import { message } from "antd";
import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const CampaignContext = createContext();

const CampaignProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const getCampaigns = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/campaign?status=${activeTab}&page=${page}&limit=${limit}&search=${search || ""}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      setCampaigns(res.data.campaigns);
      setTotalPages(res.data.totalPages);
      setTotal(res.data.total);
      setLimit(res.data.limit);
    } catch (error) {
      console.log(error);
    }
  };
  const [search, setSearch] = useState("");
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
    <CampaignContext.Provider
      value={{
        activeTab,
        setActiveTab,
        campaigns,
        setCampaigns,
        limit,
        page,
        setPage,
        total,
        totalPages,
        getCampaigns,
        search,
        setSearch,
        handleDelete,
        handleComplete,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};
export const useCampaignContext = () => useContext(CampaignContext);

export default CampaignProvider;
