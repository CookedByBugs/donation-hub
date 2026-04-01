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
    <div className="md:pt-40 pt-30 md:max-w-[80%] max-w-[95%] w-full mx-auto">
      <div className="mb-10">
        <h2 className="md:text-5xl text-2xl">
          Welcome,{" "}
          <span className="text-primary font-bold">
            {user?.firstName + " " + user?.lastName}
          </span>
        </h2>
      </div>
      <div className="flex md:justify-between flex-wrap items-center p-5 border border-gray-400 shadow-lg bg-white gap-5 rounded-2xl">
        <div className="flex gap-5 items-center">
          <Image className="rounded-full w-34!" src={user?.profileImage} />
          <div className="text-gray-700">
            <div className="">
              <p className="md:text-4xl font-bold">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p>Email: {user?.email}</p>
            </div>
          </div>
        </div>
        <Modal
          open={isModalOpen}
          onOk={handleImageUpdate}
          onCancel={() => setIsModalOpen(false)}
          className=""
        >
          <div className="p-5">
            <div className="">
              <p className="text-2xl font-bold mb-5">Change Profile Picture</p>
            </div>
            <div className="flex justify-between items-center">
              <img
                src={user?.profileImage}
                alt="Profile image"
                className="w-34 object-cover h-34 rounded-full"
              />
              <SwapRightOutlined className="text-6xl" />
              <div>
                {!preview && (
                  <Upload showUploadList={false} beforeUpload={beforeUpload}>
                    <PlusOutlined className="text-3xl border p-3 rounded-xl cursor-pointer" />
                  </Upload>
                )}
                {/* Preview */}
                {preview && (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-34 object-cover h-34 rounded-full"
                    />
                    <div className="absolute top-0 right-0">
                      <PlusOutlined
                        className="rotate-45! bg-white rounded-full p-2 border border-gray-300"
                        onClick={() => setPreview(null)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
        <div className="text-center md:w-auto w-full">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary md:px-5 px-10!"
          >
            Change Profile picture
          </button>
        </div>
      </div>
      <div>
        <ProfileForm />
      </div>
    </div>
  );
};

export default Profile;
