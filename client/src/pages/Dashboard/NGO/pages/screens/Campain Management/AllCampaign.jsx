import { Pagination, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Active from "./Active";
import Completed from "./Completed";
import Expired from "./Expired";
import { useCampaignContext } from "@/contexts/Campaigns/CampaignContext";

const AllCampaign = () => {
  const {
    getCampaigns,
    activeTab,
    setActiveTab,
    campaigns,
    setCampaigns,
    limit,
    page,
    setPage,
    total,
  } = useCampaignContext();

  useEffect(() => {
    setCampaigns([]);
    setPage(1);
  }, [activeTab]);
  useEffect(() => {
    getCampaigns();
  }, [activeTab, page]);
  return (
    <div className="">
      <Tabs
        className="w-full"
        defaultActiveKey="active"
        accessKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: "active",
            label: "Active",
            children: (
              <Active campaigns={campaigns} setCampaigns={setCampaigns} />
            ),
          },
          {
            key: "completed",
            label: "Completed",
            children: (
              <Completed campaigns={campaigns} setCampaigns={setCampaigns} />
            ),
          },
          {
            key: "inactive",
            label: "Expired",
            children: (
              <Expired campaigns={campaigns} setCampaigns={setCampaigns} />
            ),
          },
        ]}
      />
      <div className="py-10">
        <Pagination
          current={page}
          align="center"
          total={total}
          pageSize={limit}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default AllCampaign;
