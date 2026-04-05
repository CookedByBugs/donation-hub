import { Col, Row } from "antd";
import React from "react";

const Dashboard = () => {
  document.title = "Dashboard | Donation Hub";
  return (
    <div className="md:max-w-[80%] max-w-[95%] mx-auto">
      <Row gutter={[16, 16]}>
        <Col lg={10} md={12} xs={24} sm={24}></Col>
        <Col lg={14} md={12} xs={24} sm={24}></Col>
      </Row>
    </div>
  );
};

export default Dashboard;
