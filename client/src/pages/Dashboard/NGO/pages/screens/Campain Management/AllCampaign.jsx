import { Pagination, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Active from "./Active";
import Completed from "../Completed";
import axios from "axios";

const AllCampaign = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [campaigns, setCampaigns] = useState([]);
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const getCampaigns = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/campaign?status=${activeTab}&page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      setCampaigns(res.data.campaigns);
      setTotalPages(res.data.totalPages);
      setTotal(res.data.total);
      setLimit(res.data.limit);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
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
            key: "pending",
            label: "Pending Approval",
            children: <p>Pending</p>,
          },
        ]}
      />
      <div className="my-10">
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
