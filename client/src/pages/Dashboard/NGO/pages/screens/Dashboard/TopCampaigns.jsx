import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TopCampaigns = ({ refresh }) => {
  const [campaigns, setCampaigns] = useState([]);
  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/campaign/top-campaigns`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      console.log(res.data);
      setCampaigns(res.data.topCampaigns || []);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCampaigns();
  }, [refresh]);

  return (
    <div className="pb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold m-0">Top Campaigns by Donations</h2>
      </div>
      {campaigns?.length === 0 ? (
        <p className="text-gray-500">No top campaigns to show.</p>
      ) : (
        <Row gutter={[16, 16]}>
          {campaigns.map((c) => (
            <Col lg={8} md={12} sm={24} xs={24} key={c._id}>
              <div className="rounded-2xl bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-default">
                <div className="h-1.5 bg-gradient-to-r from-[#FF9800] to-[#FFC107]"></div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-base font-semibold text-gray-800 m-0 line-clamp-1 flex-1 pr-2">
                      {c.campaign.title}
                    </p>
                  </div>
                  <p className="text-2xl font-bold m-0 mb-3 bg-gradient-to-br from-[#FF9800] to-[#FFB300] bg-clip-text text-transparent">
                    ${c.totalAmount || 0} raised
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <p className="m-0 font-medium truncate pr-4">
                      {c.donorCount || 0} {c.donorCount === 1 ? "Donor" : "Donors"}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default TopCampaigns;
