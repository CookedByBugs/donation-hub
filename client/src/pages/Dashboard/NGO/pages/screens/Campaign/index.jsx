import { Col, Form, Image, message, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { Loading3QuartersOutlined } from "@ant-design/icons";
const Campaign = () => {
  document.title = "Update Campaign | Donation Hub";
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [state, setState] = useState({
    title: "",
    goalAmount: "",
    category: "",
    endDate: "",
    description: "",
  });

  const [file, setFile] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const getPlainText = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  const getCampaign = async () => {
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
      setImageList(res.data.campaign.image);
      setPreviews(
        res.data.campaign.image.map((img) => ({
          uid: crypto.randomUUID(),
          preview: img,
        })),
      );
    } catch (error) {
      console.error(error);
      message.error("Failed to load campaign");
    }
  };

  useEffect(() => {
    getCampaign();
  }, []);

  useEffect(() => {
    if (campaign) {
      setState({
        title: campaign.title || "",
        goalAmount: campaign.goalAmount || "",
        category: campaign.category || "",
        endDate: campaign.endDate
          ? new Date(campaign.endDate).toISOString().slice(0, 16)
          : "",
        description: campaign.description || "",
      });
    }
  }, [campaign]);

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, goalAmount, category, endDate, description } = state;

    if (!title) return message.error("Title is required");
    if (!goalAmount) return message.error("Goal Amount is required");
    if (!category) return message.error("Category is required");
    if (!endDate) return message.error("End Date is required");
    if (!description) return message.error("Description is required");
    if (getPlainText(description).length > 1200)
      return message.error("Description is too long");
    if (imageList.length + file.length > 5)
      return message.error("Maximum 5 images are allowed");
    if (imageList.length === 0) {
      if (file.length === 0) {
        return message.error("At least one image is required");
      }
    }

    // file list is the variable where user uploads new images
    // imageList is the variable where existing images are stored
    const formData = new FormData();
    formData.append("title", title);
    formData.append("goalAmount", goalAmount);
    formData.append("category", category);
    formData.append("endDate", endDate);
    formData.append("description", description);
    if (imageList.length > 0) {
      imageList.forEach((img) => {
        formData.append("existingImages", img);
      });
    }
    file.forEach((f) => {
      formData.append("images", f);
    });

    try {
      setIsProcessing(true);
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/campaign/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      message.success("Campaign updated successfully");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to update campaign");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mx-auto p-3 md:max-w-[80%] w-full">
      <div className="my-10">
        <h2 className="text-4xl mt-24 text-center text-primary font-bold">
          Update Campaign
        </h2>
      </div>

      <div className="my-10 shadow-lg border border-gray-200 rounded-xl lg:max-w-[80%] mx-auto w-full p-10">
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
              <Form.Item label="Goal Amount (USD)">
                <input
                  placeholder="Goal Amount"
                  name="goalAmount"
                  type="number"
                  value={state.goalAmount}
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
                  name="endDate"
                  value={state.endDate}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Images">
                <label htmlFor="images" className="">
                  <span className="btn-primary">Upload Images</span>
                  <input
                    id="images"
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const newFiles = Array.from(e.target.files);
                      setFile((prev) => [...prev, ...newFiles]);

                      const generatedPreviews = newFiles.map((f) => ({
                        uid: crypto.randomUUID(),
                        preview: URL.createObjectURL(f),
                      }));
                      setPreviews((prev) => [...prev, ...generatedPreviews]);
                    }}
                    multiple
                  />
                </label>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Campaign Images">
                <div className="">
                  <div className="flex md:gap-5 overflow-x-scroll">
                    {imageList?.map((img, i) => (
                      <div key={i} className="relative p-1 ">
                        <div
                          onClick={() => {
                            setImageList((prev) =>
                              prev.filter((_, index) => index !== i),
                            );
                          }}
                          className="absolute top-2 right-2 bg-white/70 transition-150 hover:bg-white cursor-pointer z-10 rounded-full w-5 h-5 flex items-center justify-center"
                        >
                          <CloseOutlined />
                        </div>
                        <div className="w-full">
                          <Image
                            key={i}
                            src={img}
                            alt={img}
                            className="rounded-lg !min-w-24 !w-24 !min-h-24 !h-24 !object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Preview">
                <div className="flex gap-5 ">
                  {file?.map((f, i) => (
                    <div key={i} className="relative p-1">
                      <div
                        onClick={() => {
                          setFile((prev) =>
                            prev.filter((_, index) => index !== i),
                          );
                        }}
                        className="absolute top-2 right-2 bg-white/70 transition-150 hover:bg-white cursor-pointer z-10 rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        <CloseOutlined />
                      </div>
                      <div className="w-full">
                        <Image
                          key={f?.uid}
                          src={URL.createObjectURL(f)}
                          alt={f?.name}
                          className="rounded-lg !w-24 !h-24 !object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Form.Item>
            </Col>

            <Col span={24}>
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
              >
                <ReactQuill
                  onChange={(val) => {
                    console.log(val);
                    setState((s) => ({ ...s, description: val }));
                  }}
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [{ align: [] }],
                    ],
                  }}
                  value={state.description}
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

            <Col span={24}>
              <div className="text-center flex gap-5 items-center justify-center">
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="btn-primary !px-10 transition-150"
                >
                  {isProcessing ? (
                    <p className="!animate-spin">
                      <Loading3QuartersOutlined />
                    </p>
                  ) : (
                    "Update"
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

export default Campaign;
