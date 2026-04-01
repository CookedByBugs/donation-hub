import React, { useEffect, useState } from "react";
import { Pagination, Tabs } from "antd";
import axios from "axios";
import Campaign from "./Campaign";
const ActiveCampaigns = () => {
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
        `${import.meta.env.VITE_API_URL}/api/campaign`,
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
      console.table(res.data);
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
      key: "other",
      label: "Other",
      children: <Campaign campaigns={campaigns} />,
    },
  ];

  return (
    <div className="md:max-w-[80%] max-w-[95%] mx-auto">
      <div className="pt-32 mb-15 text-primary md:text-5xl text-3xl font-bold text-center">
        Active Campaigns
      </div>
      <div className="">
        <Tabs
          defaultActiveKey="health"
          className="w-full"
          activeKey={activeTab}
          items={items}
          onChange={handleTabChange}
        />
      </div>
      <div className="mt-10">
        <Pagination
          align="center"
          current={page}
          total={totalCampaigns}
          pageSize={limit}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default ActiveCampaigns;
