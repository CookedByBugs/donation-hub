import React from "react";
import { Col, Row } from "antd";
import {
  DollarCircleOutlined,
  HeartFilled,
  StarFilled,
} from "@ant-design/icons";

const WhyDonationHub = () => {
  const cards = [
    {
      icon: HeartFilled,
      title: "No Middle Man",
      description:
        "Donate with confidence knowing your money made it to the organisation without middlemen like marketers or sales teams taking a cut.",
    },
    {
      icon: StarFilled,
      title: "Ultimate Convenience",
      description:
        "Donate to multiple organizations and manage them all in one place. Customise donations by amount, frequency, and manage preferences effortlessly.",
    },
    {
      icon: DollarCircleOutlined,
      title: "Incredibly Low Fees",
      description:
        "We help organisations raise more money and reduce costs with super-low fees. We also provide a bunch of handy fundraising tools totally free of charge!",
    },
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-[95%] md:max-w-[80%] mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
            Why Choose <span className="text-primary">Donation Hub?</span>
          </h2>
          <p className="text-xl text-gray-500 mt-4 max-w-2xl mx-auto">
            We are revolutionizing the way you give, ensuring maximum
            transparency and impact for every single contribution.
          </p>
        </div>

        <Row
          gutter={[
            { xs: 16, sm: 24, md: 32, lg: 48 },
            { xs: 16, sm: 24, md: 32, lg: 48 },
          ]}
        >
          {cards.map((card, i) => (
            <Col lg={8} md={12} sm={24} xs={24} key={i}>
              <div
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="group h-full bg-nav border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>

                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 group-hover:bg-primary transition-colors duration-300">
                  <card.icon className="text-3xl text-primary group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg pb-4">
                  {card.description}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default WhyDonationHub;
