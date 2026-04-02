import { useCampaignContext } from "@/contexts/Campaigns/CampaignContext";
import { Col, message, Row } from "antd";
import axios from "axios";
import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";

const Completed = ({ campaigns, setCampaigns }) => {
  const { handleDelete } = useCampaignContext();

  return (
    <div className="">
      <Row gutter={[16, 16]}>
        {campaigns.map((c, i) => (
          <Col lg={8} md={12} sm={24} xs={24}>
            <div
              className="shadow shadow-black/20 rounded-2xl mt-1 transition-300 hover:mt-0"
              key={c._id}
            >
              <div className="relative">
                <div className="absolute bg-white px-1 rounded-full top-3 left-3">
                  {c.status}
                </div>
                <img
                  className="w-full h-60 rounded-t-2xl object-cover"
                  src={c.image}
                  alt=""
                />
              </div>
              <div className="p-3 flex items-center justify-between">
                <p className="text-gray-500 line-clamp-1 capitalize">
                  {c.title}
                </p>
                <div className="bg-blue-600 animate-pulse w-3 h-3 rounded-full"></div>
              </div>
              <div className="p-3">
                <button
                  onClick={() => {
                    handleDelete(c._id);
                    setCampaign(
                      campaigns.filter((campaign) => campaign._id !== c._id),
                    );
                  }}
                  className="btn-danger w-full"
                >
                  Delete Campaign
                </button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Completed;
