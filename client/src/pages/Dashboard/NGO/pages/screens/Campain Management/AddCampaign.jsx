import { Button, Col, Form, message, Row, Select, Upload } from "antd";
import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Loading3QuartersOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const initalState = {
  title: "",
  goalAmount: "",
  category: "",
  endDate: "",
  images: [],
  description: "",
};

const AddCampaign = () => {
  const [state, setState] = useState(initalState);
  const [fileList, setFileList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const getPlainText = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { title, goalAmount, category, endDate, description } = state;

    if (!title.trim()) return message.error("Title is required");
    if (!goalAmount.trim()) return message.error("Goal Amount is required");
    if (!category.trim()) return message.error("Category is required");
    if (!endDate.trim()) return message.error("End Date is required");
    if (!description.trim()) return message.error("Description is required");
    if (fileList.length > 5)
      return message.error("Maximum 5 images are allowed");
    if (getPlainText(description).length > 1200) {
      return message.error("Description is too long");
    }
    title = title.trim();
    goalAmount = goalAmount.trim();
    category = category.trim();
    endDate = endDate.trim();
    description = description.trim();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("goalAmount", goalAmount);
    formData.append("category", category);
    formData.append("endDate", endDate);
    formData.append("description", description);
    fileList.forEach((f) => {
      if (f.originFileObj) {
        formData.append("images", f.originFileObj);
      }
    });
    try {
      console.log("IMG DATA", fileList);
      setIsProcessing(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/campaign/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      console.log(res.data);
      message.success("Campaign Created Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="mx-auto p-3 md:max-w-[80%] w-full">
      <div className="my-20">
        <h2 className="text-4xl text-center text-primary font-bold">
          Add Campaign
        </h2>
      </div>
      <div className="my-10 shadow-lg border border-gray-200 rounded-xl lg:max-w-[80%] max-w-[100%] mx-auto w-full p-10">
        <Form layout="vertical">
          <Row gutter={[16, 16]}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item label="Title">
                <input
                  placeholder="Title"
                  name="title"
                  value={state.title}
                  className="input-field"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item label="Goal Amount in USD">
                <input
                  placeholder="Goal Amount"
                  name="goalAmount"
                  value={state.goalAmount}
                  type="number"
                  className="input-field"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item label="Category">
                <Select
                  placeholder="Select Category"
                  className="m-3"
                  value={state.category}
                  onChange={(val) => setState((s) => ({ ...s, category: val }))}
                >
                  <Select.Option value="education">Education</Select.Option>
                  <Select.Option value="health">Health</Select.Option>
                  <Select.Option value="disaster">Disaster</Select.Option>
                  <Select.Option value="others">Others</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item label="End Date">
                <input
                  type="datetime-local"
                  className="border border-gray-300 py-1 px-3 outline-none w-full rounded-lg"
                  value={state.endDate}
                  name="endDate"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Image">
                <Upload
                  accept=".png, .jpg, .jpeg,.webp"
                  beforeUpload={() => false}
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList)}
                  multiple
                  listType="picture-card"
                >
                  <PlusOutlined />
                </Upload>
              </Form.Item>
            </Col>
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label={
                  <p className="flex items-center gap-2">
                    Description{" "}
                    <span
                      className={` ${getPlainText(state.description).length > 1200 ? "text-red-500" : "text-green-500"}`}
                    >
                      {getPlainText(state.description).length}/1200
                    </span>
                  </p>
                }
                className="editor-box"
              >
                <ReactQuill
                  onChange={(val) =>
                    setState((s) => ({ ...s, description: val }))
                  }
                  value={state.description}
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [{ align: [] }],
                    ],
                  }}
                  formats={[
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "align",
                  ]}
                  theme="snow"
                />
              </Form.Item>
            </Col>
            <Col lg={24} md={24} sm={24} xs={24}>
              <div className="text-center flex gap-5 items-center justify-center">
                <button
                  onClick={() => {
                    setState(initalState);
                    setFileList([]);
                  }}
                  className="btn-secondary !px-10 transition-150"
                >
                  Clear
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing ? true : false}
                  className="btn-primary !px-10 transition-150"
                >
                  {isProcessing ? (
                    <p className="!animate-spin">
                      <Loading3QuartersOutlined />
                    </p>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default AddCampaign;
