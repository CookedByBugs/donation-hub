import React from "react";
import { Form, message } from "antd";

const ContactForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Thank you for reaching out! We will get back to you soon.");
    form.resetFields();
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a message</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please enter your first name" }]}
          >
            <input placeholder="John" className="input-field" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <input placeholder="Doe" className="input-field" />
          </Form.Item>
        </div>

        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" }
          ]}
        >
          <input placeholder="john@example.com" type="email" className="input-field" />
        </Form.Item>

        <Form.Item
          label="Subject"
          name="subject"
          rules={[{ required: true, message: "Please enter a subject" }]}
        >
          <input placeholder="How can we help?" className="input-field" />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Please enter your message" }]}
        >
          <textarea
            placeholder="Write your message here..."
            className="w-full border border-gray-300 rounded-lg p-4 outline-none focus:border-primary transition-all min-h-[150px] resize-y"
          ></textarea>
        </Form.Item>

        <Form.Item className="mb-0">
          <button type="submit" className="btn-primary w-full md:w-auto md:px-12 py-3 text-lg mt-4">
            Send Message
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactForm;
