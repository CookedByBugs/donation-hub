import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, message, Row } from "antd";
import { CloseOutlined, MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCampaignContext } from "@/contexts/Campaigns/CampaignContext";

const Active = ({ campaigns, setCampaigns }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [propogation, setPropogation] = useState(true);
  const { handleDelete, handleComplete } = useCampaignContext();

  const menuOpen = (id) => {
    setIsOpen(id);
  };
  return (
    <div className="">
      <div className="pt-2">
        <Row gutter={[24, 24]}>
          {campaigns.map((c, i) => {
            let raised = c.raisedAmount || 0;
            let goal = c.goalAmount || 1;
            let percentage = (raised / goal) * 100;
            percentage = Math.floor(percentage);

            return (
              <Col
                key={c._id}
                xl={8}
                lg={12}
                md={12}
                sm={24}
                xs={24}
              >
                <div
                  onClick={() => {
                    propogation &&
                      navigate(`/dashboard/campaign-viewer/${c._id}`);
                  }}
                  className="cursor-pointer h-full flex flex-col group rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <img
                      className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
                      src={Array.isArray(c.image) ? c.image[0] : c.image}
                      alt={c.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent"></div>
                    
                    {/* Category Tag */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-4 py-1.5 rounded-full shadow-sm capitalize">
                        {c.category || "General"}
                      </span>
                    </div>

                    {/* Options Menu Toggle */}
                    <div className="absolute top-4 left-4">
                      <div
                        onMouseEnter={() => setPropogation(false)}
                        onMouseLeave={() => setPropogation(true)}
                        className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 w-8 h-8 flex items-center justify-center rounded-full shadow-sm transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          isOpen == c._id ? menuOpen(false) : menuOpen(c._id);
                        }}
                      >
                        {isOpen == c._id ? (
                          <CloseOutlined className="text-sm font-bold" />
                        ) : (
                          <MoreOutlined className="text-lg rotate-90" />
                        )}
                      </div>
                    </div>

                    {/* Dropdown Menu */}
                    <ul
                      onMouseEnter={() => setPropogation(false)}
                      onMouseLeave={() => setPropogation(true)}
                      className={`absolute overflow-hidden z-20 top-14 left-4 bg-white/95 backdrop-blur-md border border-gray-100 rounded-xl shadow-lg transition-all duration-300 origin-top-left ${
                        isOpen === c._id ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                      }`}
                    >
                      <li
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/dashboard/campaign-management/${c._id}`);
                        }}
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors whitespace-nowrap"
                      >
                        Edit Campaign
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors" title={c.title}>
                        {c.title}
                      </h2>
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] animate-pulse flex-shrink-0 ml-2" title="Active"></div>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <p className="text-xs text-gray-400 font-medium tracking-wide uppercase mb-1">Raised</p>
                          <p className="text-lg font-bold text-gray-800">${raised.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400 font-medium tracking-wide uppercase mb-1">Goal</p>
                          <p className="text-sm font-semibold text-gray-600">${goal.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-100 h-2.5 rounded-full overflow-hidden mb-5">
                        <div
                          className="bg-primary h-full rounded-full transition-all duration-1000 ease-out relative"
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        >
                          <div className="absolute top-0 right-0 bottom-0 w-full bg-white/20 animate-pulse"></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 items-end">
                        <button
                          onMouseEnter={() => setPropogation(false)}
                          onMouseLeave={() => setPropogation(true)}
                          className="w-full text-center py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold text-rose-500 bg-rose-50 hover:bg-rose-500 hover:text-white transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCampaigns(
                              campaigns.filter((campaign) => campaign._id !== c._id)
                            );
                            handleDelete(c._id);
                          }}
                        >
                          Delete
                        </button>
                        <button
                          onMouseEnter={() => setPropogation(false)}
                          onMouseLeave={() => setPropogation(true)}
                          className="w-full text-center py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleComplete(c._id);
                            setCampaigns(
                              campaigns.filter((campaign) => campaign._id !== c._id)
                            );
                          }}
                        >
                          Complete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default Active;
