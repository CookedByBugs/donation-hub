import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import Health from "./Health";
import Education from "./Education";
import Disaster from "./Disaster";
import Other from "./Other";
import axios from "axios";
import Campaign from "./Campaign";
import Pagination from "./Pagination";
const ActiveCampaigns = () => {
  const [activeTab, setActiveTab] = useState("health");
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const handleTabChange = (key) => {
    setActiveTab(key);
    setPage(1); // reset pagination
  };
  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/campaign`,
        {
          params: {
            category: activeTab,
            page: page,
            limit: 10,
            status: "active",
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );

      setCampaigns(res.data.campaigns);
      console.log(res.data);
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
      // children: <Health campaigns={campaigns} />,
    },
    {
      key: "education",
      label: "Education",
      children: <Campaign campaigns={campaigns} />,
      // children: <Education campaigns={campaigns} />,
    },
    {
      key: "disaster",
      label: "Disaster",
      children: <Campaign campaigns={campaigns} />,
      // children: <Disaster campaigns={campaigns} />,
    },
    {
      key: "other",
      label: "Other",
      children: <Campaign campaigns={campaigns} />,
      // children: <Other campaigns={campaigns} />,
    },
  ];
  return (
    <div className="md:max-w-[80%] max-w-[95%] mx-auto">
      <div className="mt-32 mb-15 text-primary md:text-5xl text-3xl font-bold text-center">
        Active Campaigns
      </div>
      <div className="">
        <Tabs
          defaultActiveKey="health"
          className="w-full"
          // accessKey={activeTab}
          activeKey={activeTab}
          items={items}
          onChange={handleTabChange}
        />
      </div>
      <div className="mt-10">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default ActiveCampaigns;
