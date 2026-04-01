import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import { Col, Row } from "antd";
import Payment from "./Payment";
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
    <div className="md:pt-30 pt-20">
      <div className="my-10">
        <h1 className="text-center text-primary font-bold text-4xl mb-5">
          {campaign.title}
        </h1>
        <div className="text-center">
          <button className="text-center text-white bg-green-500 px-5 py-1 rounded-full font-semibold capitalize text-xl">
            {campaign.category}
          </button>
        </div>
      </div>
      <div className="md:px-10 px-5">
        <Row gutter={[16, 16]}>
          <Col xl={12} lg={12} md={24} sm={24} xs={24} className="!h-full">
            <div className="mb-6 rounded-2xl overflow-hidden shadow-lg">
              <Carousel images={images} />
            </div>
          </Col>
          <Col xl={12} lg={12} md={24} sm={24} xs={24} className="!h-full ">
            <Description campaign={campaign} />
          </Col>
          <Col span={24}>
            <hr className="text-primary my-3 max-w-[80%] mx-auto" />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Info campaign={campaign} />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Payment campaign={campaign} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CampaignViewer;
