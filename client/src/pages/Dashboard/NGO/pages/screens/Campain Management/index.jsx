import React, { useEffect } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Input } from "antd";
import AllCampaign from "./AllCampaign";
import { useCampaignContext } from "@/contexts/Campaigns/CampaignContext";

const CampaignManagement = () => {
  document.title = "Campaign Management | Donation Hub";
  const { setSearch, search, setPage, getCampaigns } = useCampaignContext();
  const handleSearch = () => {
    getCampaigns();
    setPage(1);
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setTimeout(() => {
        handleSearch();
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 pt-28">
      <div className="max-w-[95%] md:max-w-[85%] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="md:text-4xl text-3xl font-extrabold text-gray-800 tracking-tight">
              Campaign{" "}
              <span className="text-primary font-medium">Management</span>
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Manage, create, and track all your campaigns.
            </p>
          </div>
          <Link
            to="/dashboard/campaign-management/add-campaign"
            className="btn-primary md:text-base text-sm flex items-center justify-center gap-2 px-6 py-3 shadow-md hover:shadow-lg transition-all rounded-xl"
          >
            <PlusOutlined />
            Create Campaign
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8">
          <div className="max-w-md mb-8">
            <Input.Search
              onSearch={handleSearch}
              onChange={(e) => handleChange(e)}
              placeholder="Search campaigns..."
              size="large"
              enterButton={<SearchOutlined />}
              className="custom-search"
            />
          </div>
          <div className="">
            <AllCampaign />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignManagement;
