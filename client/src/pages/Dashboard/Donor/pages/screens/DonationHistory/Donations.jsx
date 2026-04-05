import { useAuthContext } from "@/contexts/Auth/AuthContext";
import { Col, Row, Pagination } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Donations = () => {
  const navigate = useNavigate();
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
      {donations.length === 0 ? (
        <div className="text-center py-20">
          <div className="flex justify-center mb-6">
            <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No donations yet</h3>
          <p className="text-gray-500 text-lg">When you make a donation to a campaign, your history will appear here.</p>
        </div>
      ) : (
        <>
          <Row gutter={[24, 24]}>
            {donations.map((donation) => {
              return (
                <Col xl={8} lg={12} md={12} sm={24} xs={24} key={donation._id}>
                  <div
                    onClick={() => {
                      navigate(
                        `/dashboard/active-campaigns/${donation?.campaignId?._id}`,
                      );
                    }}
                    className="cursor-pointer group flex flex-col h-full rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
                  >
                    {/* Status indicator line */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-200"></div>

                    <div className="p-6 md:p-8 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100/50 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </div>
                        <span className="bg-gray-50 text-gray-500 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-100">
                          {new Date(donation?.createdAt).toLocaleDateString("en-GB", {day: 'numeric', month: 'short', year: 'numeric'})}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-6 group-hover:text-primary transition-colors">
                        {donation?.campaignId?.title || "Campaign"}
                      </h3>

                      <div className="mt-auto pt-5 border-t border-gray-50 flex items-end justify-between">
                        <div>
                          <p className="text-[11px] text-gray-400 font-bold tracking-widest uppercase mb-1">Donation Amount</p>
                          <p className="text-3xl font-extrabold text-gray-800 tracking-tight">
                            ${donation?.amount?.toLocaleString()}
                          </p>
                        </div>
                        <div className="mb-1 text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
          <div className="mt-12 flex justify-center">
            <Pagination
              current={page}
              total={totalDonations}
              pageSize={limit}
              onChange={(page) => setPage(page)}
              showSizeChanger={false}
              className="custom-pagination"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Donations;
