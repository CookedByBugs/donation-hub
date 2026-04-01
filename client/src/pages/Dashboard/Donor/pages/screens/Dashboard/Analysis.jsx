import { useAuthContext } from "@/contexts/Auth/AuthContext";
import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Analysis = () => {
  const { user } = useAuthContext();
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [campaignSupported, setCampaignSupported] = useState(0);
  const fetchDonations = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/campaign/total-donation/${user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      setTotalAmount(res?.data?.totalAmount[0]?.totalAmount);
      setTotalDonations(res?.data?.totalDonations[0]?.count);
      setCampaignSupported(res?.data?.campaignSupported[0]?.count);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDonations();
  }, []);

  const formatAmount = (num) => {
    if (!num) return "0";

    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";

    return num.toString();
  };

  return (
    <div className="pt-32 pb-12">
      <div className="mb-10">
        <h1 className="text-primary md:text-5xl text-4xl font-extrabold tracking-tight mb-3">
          Welcome back, {user?.firstName} {user?.lastName}! 👋
        </h1>
        <p className="text-gray-500 text-lg font-medium">
          Here is an overview of your recent donation activities.
        </p>
      </div>
      <Row gutter={[24, 24]}>
        <Col lg={8} md={12} sm={24} xs={24}>
          <div className="p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default">
            <p className="text-gray-400 font-semibold text-sm uppercase tracking-wider mb-2">
              Total Amount Donated
            </p>
            <p className="text-4xl font-extrabold text-gray-800">
              ${formatAmount(totalAmount || 0)}
            </p>
          </div>
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <div className="p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default">
            <p className="text-gray-400 font-semibold text-sm uppercase tracking-wider mb-2">
              Campaigns Supported
            </p>
            <p className="text-4xl font-extrabold text-gray-800">
              {formatAmount(campaignSupported || 0)}
            </p>
          </div>
        </Col>
        <Col lg={8} md={24} sm={24} xs={24}>
          <div className="p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default">
            <p className="text-gray-400 font-semibold text-sm uppercase tracking-wider mb-2">
              Total Transactions
            </p>
            <p className="text-4xl font-extrabold text-gray-800">
              {formatAmount(totalDonations || 0)}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Analysis;
