import React, { useEffect } from "react";
import { Row, Col } from "antd";
import Hero from "./Hero";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact | Donation Hub";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Hero />
      <div className="md:max-w-[80%] max-w-[95%] mx-auto w-full mt-[-40px] md:mt-20 z-10 relative">
        <div className="bg-white rounded-3xl md:shadow-xl md:p-12 p-4">
          <Row gutter={[48, 48]}>
            <Col xs={24} lg={10}>
              <ContactInfo />
            </Col>
            <Col xs={24} lg={14}>
              <ContactForm />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Contact;
