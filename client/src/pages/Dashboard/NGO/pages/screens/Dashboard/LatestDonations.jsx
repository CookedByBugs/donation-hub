import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const LatestDonations = ({ refresh }) => {
  const [donations, setDonations] = useState([]);
  const fetchDonations = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/campaign/latest-donations`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      // console.log(res.data);
      setDonations(res.data.donations);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDonations();
  }, [refresh]);
  // const columns = [
  //   {
  //     title: "Donor",
  //     dataIndex: "donor",
  //     key: "donor",
  //   },
  //   {
  //     title: "Amount",
  //     dataIndex: "amount",
  //     key: "amount",
  //   },
  //   {
  //     title: "Date",
  //     dataIndex: "date",
  //     key: "date",
  //   },
  //   {
  //     title: "Campaign",
  //     dataIndex: "campaign",
  //     key: "campaign",
  //   },
  // ];
  // const dataSource = donations?.map((d, i) => {
  //   return {
  //     key: d._id,
  //     donor: `${d.donorId.firstName} ${d.donorId.lastName}`,
  //     amount: `$${d.amount}`,
  //     date: new Date(d.createdAt).toLocaleDateString(),
  //     campaign: d.campaignId.title,
  //   };
  // });
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold m-0">Latest Donations</h2>
      </div>
      {donations?.length === 0 ? (
        <p className="text-gray-500">No latest donations to show.</p>
      ) : (
        <Row gutter={[16, 16]}>
          {donations?.slice(0, 3).map((d) => (
            <Col lg={8} md={12} sm={24} xs={24} key={d._id}>
              <div className="rounded-2xl bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-default">
                <div className="h-1.5 bg-gradient-to-r from-[#25d3c2] to-[#82fdf1]"></div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-base font-semibold text-gray-800 m-0 line-clamp-1 flex-1 pr-2">
                      {d.campaignId.title}
                    </p>
                  </div>
                  <p className="text-2xl font-bold m-0 mb-3 bg-gradient-to-br from-[#25d3c2] to-[#1a9e91] bg-clip-text text-transparent">
                    ${d.amount}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <p className="m-0 font-medium truncate pr-4">
                      By {d.donorId.firstName} {d.donorId.lastName}
                    </p>
                    <p className="m-0 whitespace-nowrap">
                      {new Date(d.createdAt).toLocaleDateString()}
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

export default LatestDonations;
