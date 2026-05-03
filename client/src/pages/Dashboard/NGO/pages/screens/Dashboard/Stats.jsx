import { useAuthContext } from "@/contexts/Auth/AuthContext";
import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Stats = ({ refresh }) => {
  const { user } = useAuthContext();
  const [stats, setStats] = useState({});
  const formatNumber = (num) => {
    if (!num) return 0;

    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1) + "B";
    }

    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + "M";
    }

    if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + "K";
    }

    return num;
  };
  const getStats = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/campaign/stats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      // console.log("Stats data", res.data.data);
      setStats(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getStats();
  }, [refresh]);
  return (
    <div className="pt-32 pb-12">
      <div className="mb-10">
        <h1 className="text-primary md:text-5xl text-3xl font-extrabold tracking-tight mb-3">
          Welcome back,{" "}
          <span className="text-black">
            {user?.firstName} {user?.lastName}!{" "}
          </span>
        </h1>
        <p className="text-gray-500 text-lg font-medium">
          Here is an overview of your organization's activities.
        </p>
      </div>
      <Row gutter={[24, 24]}>
        <Col lg={8} md={12} sm={24} xs={24}>
          <div className="p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default">
            <p className="text-gray-400 font-semibold text-sm uppercase tracking-wider mb-2">
              Total Donations
            </p>
            <p className="text-4xl font-extrabold text-gray-800">
              ${formatNumber(stats?.totalAmount) || 0}
            </p>
          </div>
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <div className="p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default">
            <p className="text-gray-400 font-semibold text-sm uppercase tracking-wider mb-2">
              Running Campaigns
            </p>
            <p className="text-4xl font-extrabold text-gray-800">
              {stats?.runningCampaigns || 0}
            </p>
          </div>
        </Col>
        <Col lg={8} md={24} sm={24} xs={24}>
          <div className="p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default">
            <p className="text-gray-400 font-semibold text-sm uppercase tracking-wider mb-2">
              Successful Campaigns
            </p>
            <p className="text-4xl font-extrabold text-gray-800">
              {stats?.successfulCampaigns || 0}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Stats;
