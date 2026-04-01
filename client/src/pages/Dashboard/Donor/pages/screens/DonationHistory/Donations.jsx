import { useAuthContext } from "@/contexts/Auth/AuthContext";
import { Col, Row, Pagination } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const { user } = useAuthContext();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(12);
  const fetchDonations = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/campaign/donations`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          params: { id: user?._id, page, limit },
        },
      );
      console.table(res.data);
      setDonations(res.data.donations);
      setTotalDonations(res.data.totalDonations);
      setTotalPages(res.data.totalPages);
      setLimit(res.data.limit);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user?._id) return;
    fetchDonations();
  }, [user, page]);

  return (
    <div>
      <Row gutter={[16, 16]}>
        {donations.map((donation) => {
          return (
            <Col lg={8} md={12} sm={24} xs={24} key={donation._id}>
              <div className="rounded-2xl bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-[#25d3c2] to-[#82fdf1]"></div>

                <div className="p-5">
                  <p className="text-base font-semibold text-gray-800 m-0 mb-2">
                    {donation?.campaignId?.title}
                  </p>
                  <p className="text-2xl font-bold m-0 mb-3 bg-gradient-to-br from-[#25d3c2] to-[#1a9e91] bg-clip-text text-transparent">
                    ${donation?.amount}
                  </p>
                  <p className="text-sm text-gray-400 m-0">
                    {donation?.createdAt}
                  </p>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <div className="my-5">
        <Pagination
          align="center"
          current={page}
          total={totalDonations}
          pageSize={limit}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default Donations;
