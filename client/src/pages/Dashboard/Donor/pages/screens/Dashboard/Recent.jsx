import { useAuthContext } from "@/contexts/Auth/AuthContext";
import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Recent = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [recentDonations, setRecentDonations] = useState([]);
  const fetchRecentDonations = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/campaign/donations`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          params: {
            id: user?._id,
            page: 1,
            limit: 3,
          },
        },
      );
      setRecentDonations(res?.data?.donations);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRecentDonations();
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold">Recent Activites</p>
        <Link to="/dashboard/donation-history" className="text-primary">
          View All
        </Link>
      </div>
      <Row gutter={[16, 16]}>
        {recentDonations.map((donation) => {
          return (
            <Col lg={8} md={12} sm={24} xs={24} key={donation._id}>
              <div
                onClick={() => {
                  navigate(
                    `/dashboard/active-campaigns/${donation.campaignId._id}`,
                  );
                }}
                className="rounded-2xl bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="h-1.5 bg-gradient-to-r from-[#25d3c2] to-[#82fdf1]"></div>

                <div className="p-5">
                  <p className="text-base font-semibold text-gray-800 m-0 mb-2">
                    {donation?.campaignId?.title}
                  </p>
                  <p className="text-2xl font-bold m-0 mb-3 bg-gradient-to-br from-[#25d3c2] to-[#1a9e91] bg-clip-text text-transparent">
                    ${donation?.amount}
                  </p>
                  <p className="text-sm text-gray-400 m-0">
                    {new Date(donation?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Recent;
