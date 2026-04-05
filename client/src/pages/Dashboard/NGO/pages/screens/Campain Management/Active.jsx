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
      <div className="">
        <Row gutter={[16, 16]}>
          {campaigns.map((c, i) => {
            return (
              <Col
                key={c._id}
                lg={8}
                md={12}
                xs={24}
                sm={24}
                className="relative"
              >
                <div
                  onClick={() => {
                    propogation &&
                      navigate(`/dashboard/campaign-viewer/${c._id}`);
                  }}
                  className="cursor-pointer h-full flex flex-col group rounded-2xl overflow-hidden border border-gray-300 bg-white shadow-sm hover:shadow-lg transition-all duration-200 ease-out hover:-translate-y-0.5"
                >
                  <ul
                    onMouseEnter={() => setPropogation(false)}
                    onMouseLeave={() => setPropogation(true)}
                    className={`absolute overflow-hidden max-h-[100px] z-10 top-10 right-15 bg-white rounded-lg transition-all duration-300 ${isOpen === c._id ? "h-[40px]" : "h-0"}`}
                  >
                    <li
                      onClick={(e) => {
                        e.stopPropagation();

                        navigate(`/dashboard/campaign-management/${c._id}`);
                      }}
                      className="p-2  cursor-pointer hover:bg-gray-200"
                    >
                      Edit Campaign
                    </li>
                  </ul>

                  <div className="relative">
                    <img
                      className="w-full h-60 object-cover"
                      src={c.image[0]}
                      alt={c.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80"></div>
                    <div className="absolute top-3 left-3 right-3">
                      <div className="flex justify-between ">
                        <div className="inline-flex border border-gray-400 items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 shadow-sm">
                          Goal: ${c.goalAmount}
                        </div>
                        <div
                          onMouseEnter={() => setPropogation(false)}
                          onMouseLeave={() => setPropogation(true)}
                          className="inline-flex border border-gray-400 cursor-pointer items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 shadow-sm"
                          onClick={() => {
                            isOpen == c._id ? menuOpen(false) : menuOpen(c._id);
                          }}
                        >
                          {isOpen == c._id ? (
                            <CloseOutlined className="text-xl " />
                          ) : (
                            <MoreOutlined className="text-xl rotate-90 " />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h2 className="capitalize text-white text-lg font-semibold drop-shadow-sm line-clamp-2">
                        {c.category}
                      </h2>
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div className="capitalize  text-sm text-gray-500 overflow-hidden line-clamp-1">
                        {c.title}
                      </div>
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="px-4 py-3 border-t mt-auto border-gray-100 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <button
                      onMouseEnter={() => setPropogation(false)}
                      onMouseLeave={() => setPropogation(true)}
                      className="btn-danger hover:opacity-90 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCampaigns(
                          campaigns.filter(
                            (campaign) => campaign._id !== c._id,
                          ),
                        );
                        handleDelete(c._id);
                      }}
                    >
                      Delete Campaign
                    </button>
                    <button
                      onMouseEnter={() => setPropogation(false)}
                      onMouseLeave={() => setPropogation(true)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleComplete(c._id);
                        setCampaigns(
                          campaigns.filter(
                            (campaign) => campaign._id !== c._id,
                          ),
                        );
                      }}
                      className="btn-primary hover:opacity-90 transition-opacity"
                    >
                      Mark as Completed
                    </button>
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
