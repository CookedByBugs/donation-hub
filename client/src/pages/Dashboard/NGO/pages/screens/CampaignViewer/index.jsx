import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import { Col, Row } from "antd";
import Info from "./Info";
import Description from "./Description";
import socket from "@/components/socket";

const CampaignViewer = () => {
  const [campaign, setCampaign] = useState({});
  const [images, setImages] = useState([]);
  const { id } = useParams();

  const fetchCampaign = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/campaign/get/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      setCampaign(res.data.campaign);
      setImages(res.data.campaign.image);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCampaign();
    document.title = "Campaign Stats | Donation Hub";
  }, [id]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected", socket.id);
    });

    socket.on("donation_received", (data) => {
      console.log("Donation received", data);
      fetchCampaign();
    });
    socket.on("campaign_completed", (data) => {
      if (data === campaign._id) {
        fetchCampaign();
      }
    });

    return () => {
      socket.off("connect");
      socket.off("donation_received");
      socket.off("campaign_completed");
    };
  }, [fetchCampaign]);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 pt-28">
      <div className="my-10">
        <h1 className="text-center text-gray-800 font-extrabold text-4xl md:text-5xl mb-5 tracking-tight px-4">
          {campaign.title}
        </h1>
        <div className="text-center">
          <span className="inline-block text-primary bg-primary/10 border border-primary/20 px-6 py-2 rounded-full font-bold uppercase tracking-wider text-sm shadow-sm backdrop-blur-sm">
            {campaign.category}
          </span>
        </div>
      </div>
      <div className="max-w-[95%] md:max-w-[85%] mx-auto">
        <Row gutter={[24, 24]}>
          <Col xl={14} lg={14} md={24} sm={24} xs={24} className="flex flex-col gap-6">
            <div className="rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 bg-white">
              <Carousel images={images} />
            </div>
            <Description campaign={campaign} />
          </Col>
          <Col xl={10} lg={10} md={24} sm={24} xs={24}>
            <div className="sticky top-28">
              <Info campaign={campaign} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CampaignViewer;
