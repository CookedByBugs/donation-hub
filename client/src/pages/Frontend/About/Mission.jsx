import React from "react";
import { Row, Col } from "antd";

const Mission = () => {
  return (
    <div className="py-20 bg-white">
      <div className="md:max-w-[80%] max-w-[95%] mx-auto">
        <Row
          gutter={[
            { xs: 16, sm: 24, md: 32, lg: 48 },
            { xs: 16, sm: 24, md: 32, lg: 48 },
          ]}
          align="middle"
        >
          <Col xs={24} md={12}>
            <div className="bg-secondary/20 p-10 rounded-3xl h-full flex items-center justify-center min-h-[300px]">
              <h2 className="text-4xl md:text-5xl font-bold text-primary opacity-50">
                Our Mission
              </h2>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Empowering global change
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Our mission is to democratize giving by providing a transparent,
              secure, and user-friendly platform. We believe that every
              individual has the power to make a difference, regardless of the
              size of their contribution.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              By bringing together non-profits and eager donors, we facilitate
              campaigns that tackle some of the world's most pressing
              challenges—from healthcare to education and disaster relief.
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Mission;
