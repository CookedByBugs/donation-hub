import React from "react";
import {
  MessageOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const ContactInfo = () => {
  const contactDetails = [
    {
      title: "Chat with us",
      description: "Our friendly team is here to help.",
      detail: "hello@donationhub.com",
      icon: <MessageOutlined className="text-primary opacity-80" />,
    },
    {
      title: "Visit us",
      description: "Come say hello at our office HQ.",
      detail: "100 Smith Street, Melbourne VIC 3065",
      icon: <EnvironmentOutlined className="text-primary opacity-80" />,
    },
    {
      title: "Call us",
      description: "Mon-Fri from 8am to 5pm.",
      detail: "+1 (555) 000-0000",
      icon: <PhoneOutlined className="text-primary opacity-80" />,
    },
  ];

  return (
    <div className="h-full flex flex-col justify-center gap-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Contact Information
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Fill out the form and our team will get back to you within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {contactDetails.map((item, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <div className="text-3xl bg-secondary/20 p-4 rounded-xl flex items-center justify-center">
              {item.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
              <p className="text-gray-600 mt-1">{item.description}</p>
              <p className="text-primary font-semibold mt-2">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
