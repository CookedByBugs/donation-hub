import { useAuthContext } from "@/contexts/Auth/AuthContext";
import { Image, message, Modal, Upload } from "antd";
import React, { useEffect, useState } from "react";
import ProfileForm from "./Form";
import { PlusOutlined, SwapRightOutlined } from "@ant-design/icons";
import axios from "axios";
const Profile = () => {
  const { user, fetchProfile } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const beforeUpload = (file) => {
    setFile(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    return false; // stop auto upload
  };
  const formData = new FormData();
  const handleImageUpdate = async () => {
    message.info("Image updating");
    try {
      formData.append("profileImage", file);
      console.log(formData);
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/update-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      message.success("Image updated successfully");
      fetchProfile();
    } catch (error) {
      console.log(error);
      message.error("Image update failed");
    } finally {
      setIsModalOpen(false);
      setPreview(null);
      setFile(null);
    }
  };

  console.log(user);
  return (
    <div className="bg-nav">
      <div className="md:pt-32 pt-24 pb-12 md:max-w-[80%] max-w-[95%] w-full mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h2 className="md:text-5xl text-4xl font-extrabold tracking-tight text-gray-800">
            Welcome,{" "}
            <span className="text-primary font-black">
              {user?.firstName} {user?.lastName}
            </span>
          </h2>
          <p className="text-gray-500 text-lg font-medium mt-3">
            Manage your account profile and display picture.
          </p>
        </div>

        <div className="flex md:flex-row flex-col justify-between items-center p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white gap-8 rounded-3xl mb-8">
          <div className="flex sm:flex-row flex-col gap-6 items-center text-center sm:text-left">
            <div className="relative">
              <Image
                className="rounded-full !w-32 !h-32 object-cover border-4 border-gray-50 shadow-md"
                src={user?.profileImage}
              />
            </div>
            <div className="text-gray-700">
              <p className="md:text-3xl text-2xl font-bold text-gray-800 mb-1">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-gray-500 text-lg font-medium">{user?.email}</p>
            </div>
          </div>

          <Modal
            open={isModalOpen}
            onOk={handleImageUpdate}
            onCancel={() => setIsModalOpen(false)}
            centered
            okText="Save Picture"
            cancelText="Cancel"
            okButtonProps={{
              className:
                "bg-primary hover:bg-primary-dark border-none font-medium h-10 px-6 rounded-lg shadow-sm",
            }}
            cancelButtonProps={{
              className: "font-medium h-10 px-6 rounded-lg",
            }}
          >
            <div className="p-4">
              <p className="text-2xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
                Change Profile Picture
              </p>
              <div className="flex justify-center items-center gap-6 sm:gap-10">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wider">
                    Current
                  </span>
                  <img
                    src={user?.profileImage}
                    alt="Profile image"
                    className="w-28 h-28 object-cover rounded-full border-4 border-gray-50 shadow-sm"
                  />
                </div>

                <SwapRightOutlined className="text-4xl text-gray-300" />

                <div className="flex flex-col items-center">
                  <span className="text-xs text-primary mb-3 font-semibold uppercase tracking-wider">
                    New
                  </span>
                  {!preview && (
                    <Upload showUploadList={false} beforeUpload={beforeUpload}>
                      <div className="w-28 h-28 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50 transition-colors">
                        <PlusOutlined className="text-3xl text-gray-400" />
                      </div>
                    </Upload>
                  )}
                  {/* Preview */}
                  {preview && (
                    <div className="relative">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-md"
                      />
                      <div
                        className="absolute -top-1 -right-1 bg-white rounded-full p-1.5 border border-gray-200 shadow hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center z-10"
                        onClick={() => setPreview(null)}
                      >
                        <PlusOutlined
                          style={{ transform: "rotate(45deg)" }}
                          className="text-gray-600 block text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Modal>

          <div className="md:w-auto w-full">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary w-full sm:w-auto py-3 px-8 rounded-xl font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              Change Picture
            </button>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export default Profile;
