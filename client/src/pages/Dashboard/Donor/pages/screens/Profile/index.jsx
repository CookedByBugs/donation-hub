import { useAuthContext } from "@/contexts/Auth/AuthContext";
import { Image, message } from "antd";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useAuthContext();
  const handleEdit = () => {
    setIsEdit(!isEdit);
    message.info(isEdit ? "Editing Profile" : "Profile Updated");
  };
  console.log(user);
  return (
    <div className="md:mt-40 mt-30 md:max-w-[80%] max-w-[95%] w-full mx-auto">
      <div className="mb-10">
        <h2 className="md:text-5xl text-2xl">
          Welcome,{" "}
          <span className="text-primary font-bold">
            {user?.firstName + " " + user?.lastName}
          </span>
        </h2>
      </div>
      <div className="flex md:justify-between flex-wrap items-center p-5 border border-gray-400 shadow shadow-lg bg-white gap-5 rounded-2xl">
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
        <div className="md:text-center md:w-auto w-full">
          <button onClick={handleEdit} className="btn-primary md:px-5 px-10!">
            {isEdit ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
