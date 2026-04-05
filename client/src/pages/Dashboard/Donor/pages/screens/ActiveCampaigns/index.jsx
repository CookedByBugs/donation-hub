import React, { useEffect, useState } from "react";
import { Pagination, Tabs } from "antd";
import axios from "axios";
import Campaign from "./Campaign";

const ActiveCampaigns = () => {
  document.title = "Active Campaigns | Donation Hub";
  const [activeTab, setActiveTab] = useState("health");
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCampaigns, setTotalCampaigns] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(12);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setPage(1); // reset pagination
  };

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/campaign/all`,
        {
          params: {
            category: activeTab,
            page: page,
            limit,
            status: "active",
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      setCampaigns(res.data.campaigns);
      setTotalCampaigns(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [activeTab, page]);

  const items = [
    {
      key: "health",
      label: "Health",
      children: <Campaign campaigns={campaigns} />,
    },
    {
      key: "education",
      label: "Education",
      children: <Campaign campaigns={campaigns} />,
    },
    {
      key: "disaster",
      label: "Disaster",
      children: <Campaign campaigns={campaigns} />,
    },
    {
      key: "others",
      label: "Other",
      children: <Campaign campaigns={campaigns} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 pt-28">
      <div className="max-w-[95%] md:max-w-[85%] mx-auto">
        <div className="text-center mb-12">
          <h1 className="md:text-5xl text-3xl font-extrabold text-gray-800 tracking-tight mb-4">
            Active <span className="text-primary font-medium">Campaigns</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Discover and support causes that matter to you. Every contribution makes a meaningful difference.
          </p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8">
          <div className="w-full">
            <Tabs
              defaultActiveKey="health"
              className="w-full custom-tabs"
              activeKey={activeTab}
              items={items}
              onChange={handleTabChange}
              size="large"
            />
          </div>
          <div className="mt-12 flex justify-center">
            <Pagination
              current={page}
              total={totalCampaigns}
              pageSize={limit}
              onChange={(page) => setPage(page)}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveCampaigns;
