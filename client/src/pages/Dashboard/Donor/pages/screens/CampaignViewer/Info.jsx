import React, { useState } from "react";
import { CloseOutlined, MoreOutlined } from "@ant-design/icons";
const Info = ({ campaign }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div>
      <div className="shadow-xl rounded-2xl overflow-hidden md:p-10 p-5">
        <h3 className="text-2xl font-semibold">Fundraising Progress</h3>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="p-3 bg-orange-500/20 rounded-xl ">
            <p className="font-semibold text-xl mb-3">Raised</p>
            <p className="font-semibold text-orange-600 text-xl">
              ${campaign.raisedAmount}
            </p>
          </div>
          <div className=" p-3 bg-sky-500/20 rounded-xl ">
            <p className="font-semibold text-xl mb-3">Goal</p>
            <p className="font-bold text-sky-600 text-xl">
              ${campaign.goalAmount}
            </p>
          </div>
        </div>
        <div className="my-5">
          <h3 className="font-semibold text-2xl my-2">
            Progress{" "}
            {Math.floor((campaign.raisedAmount / campaign.goalAmount) * 100)}%
          </h3>
          <div className="bg-gray-300 rounded-full h-4">
            <div
              className="bg-sky-600 h-4 rounded-full"
              style={{
                width: `${(campaign.raisedAmount / campaign.goalAmount) * 100}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="">
          <div className="bg-orange-500/20 border-orange-500 border p-5 rounded-xl">
            <p className="text-orange-600">
              <span className="font-semibold">
                ${campaign.goalAmount - campaign.raisedAmount}
              </span>{" "}
              is still needed to reach the goal
            </p>
          </div>
        </div>
      </div>
      <div className="my-5">
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <h3 className="text-2xl font-semibold ">Campaign Timeline</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-orange-500/20 p-5 rounded-xl">
              <h5 className="font-semibold text-xl mb-2">Campaign Started</h5>
              <p className="text-sm">
                {new Date(campaign.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
            <div className="bg-sky-500/20 p-5 rounded-xl">
              <h5 className="font-semibold text-xl mb-2">Campaign End</h5>
              <p className="text-sm">
                {new Date(campaign.endDate).toLocaleDateString("en-GB")}
              </p>
            </div>
            <div className="col-span-2 bg-green-500/20 p-5 rounded-xl border border-green-500">
              <p className=" text-green-500 font-semibold">
                <span className="font-bold text-green-600">
                  {" "}
                  {Math.floor(
                    (new Date(campaign.endDate) - new Date()) /
                      (1000 * 60 * 60 * 24),
                  )}
                </span>{" "}
                days remaining
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 rounded-2xl bg-white shadow-xl border">
        <h3 className="text-2xl font-semibold">Campaign Organizer</h3>
        <div className="p-3 relative">
          <div className="flex items-center gap-2">
            <img
              src={campaign?.createdBy?.profileImage}
              alt=""
              className="w-18 rounded-full"
            />
            <div>
              <p className="font-semibold">{campaign?.createdBy?.NGO}</p>
              <p className="text-sm text-gray-500">
                Posted by:{" "}
                {`${campaign?.createdBy?.firstName} ${campaign?.createdBy?.lastName}`}
              </p>
              <p className="text-gray-500">
                Date posted:{" "}
                {new Date(campaign.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
          <div className="absolute top-5 right-5">
            <div className="relative">
              {showMore ? (
                <CloseOutlined
                  className="text-2xl rotate-90"
                  onClick={() => setShowMore(false)}
                />
              ) : (
                <MoreOutlined
                  className="text-2xl rotate-90"
                  onClick={() => setShowMore(true)}
                />
              )}
              <div
                className={`absolute w-[200px] top-5 right-0 bg-white shadow-xl rounded-xl overflow-hidden transition-150 ${showMore ? "max-h-44" : "max-h-0"}`}
              >
                <div className="p-5">
                  <p className="hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                    Contact Organizer
                  </p>
                  <p className="hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                    Share Campaign
                  </p>
                  <hr />
                  <p className="hover:bg-gray-100 text-danger p-2 rounded-lg cursor-pointer">
                    Report Campaign
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
