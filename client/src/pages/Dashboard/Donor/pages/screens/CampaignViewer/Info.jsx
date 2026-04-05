import React, { useState } from "react";
import { CloseOutlined, MoreOutlined } from "@ant-design/icons";
const Info = ({ campaign }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Fundraising Progress</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 transition-transform hover:-translate-y-1">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-1">Raised</p>
            <p className="font-bold text-gray-800 text-2xl lg:text-3xl">
              ${campaign.raisedAmount?.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-transform hover:-translate-y-1">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Goal</p>
            <p className="font-bold text-gray-800 text-2xl lg:text-3xl">
              ${campaign.goalAmount?.toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-gray-800">
               {Math.floor((campaign.raisedAmount / campaign.goalAmount) * 100)}% Funded
            </span>
            <span className="text-sm font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
              Target: ${campaign.goalAmount?.toLocaleString()}
            </span>
          </div>
          <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-primary h-full rounded-full relative"
              style={{
                width: `${Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100)}%`,
              }}
            >
               <div className="absolute top-0 right-0 bottom-0 w-full bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-sky-50 border border-sky-100 rounded-2xl flex items-center justify-center">
            <p className="text-sky-700 font-medium text-center">
              <span className="font-bold text-sky-800 text-lg mr-1">
                ${Math.max(campaign.goalAmount - campaign.raisedAmount, 0).toLocaleString()}
              </span>
              still needed to reach the goal
            </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Campaign Info</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Started</p>
              <p className="font-semibold text-gray-800">
                {new Date(campaign.createdAt).toLocaleDateString("en-GB", {day: 'numeric', month: 'long', year: 'numeric'})}
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">📅</div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Ends</p>
              <p className="font-semibold text-gray-800">
                {new Date(campaign.endDate).toLocaleDateString("en-GB", {day: 'numeric', month: 'long', year: 'numeric'})}
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">⏳</div>
          </div>
          
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
            <p className="text-emerald-700 font-medium">
              <span className="font-bold text-emerald-800 text-xl mr-2">
                {Math.max(Math.floor((new Date(campaign.endDate) - new Date()) / (1000 * 60 * 60 * 24)), 0)}
              </span>
              days remaining
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8 relative">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Organizer</h3>
        <div className="flex items-center gap-4">
          <img
            src={campaign?.createdBy?.profileImage}
            alt=""
            className="w-16 h-16 rounded-full object-cover border-2 border-primary/20 shadow-sm"
          />
          <div>
            <p className="font-bold text-lg text-gray-800">{campaign?.createdBy?.NGO}</p>
            <p className="text-sm text-gray-500 font-medium">
              Posted by: <span className="text-gray-700">{`${campaign?.createdBy?.firstName} ${campaign?.createdBy?.lastName}`}</span>
            </p>
          </div>
        </div>
        
        <div className="absolute top-8 right-8">
          <div className="relative">
            {showMore ? (
              <CloseOutlined
                className="text-lg text-gray-500 cursor-pointer hover:text-gray-800 transition-colors"
                onClick={() => setShowMore(false)}
              />
            ) : (
              <MoreOutlined
                className="text-2xl text-gray-500 cursor-pointer hover:text-gray-800 transition-colors"
                onClick={() => setShowMore(true)}
              />
            )}
            <div
              className={`absolute w-[200px] top-6 right-0 bg-white shadow-xl border border-gray-100 rounded-xl overflow-hidden transition-all duration-300 origin-top-right ${showMore ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
            >
              <div className="p-2 space-y-1">
                <p className="hover:bg-primary/5 hover:text-primary p-2 flex items-center rounded-lg cursor-pointer text-sm font-medium transition-colors">
                  Contact Organizer
                </p>
                <p className="hover:bg-primary/5 hover:text-primary p-2 flex items-center rounded-lg cursor-pointer text-sm font-medium transition-colors">
                  Share Campaign
                </p>
                <hr className="my-1 border-gray-100" />
                <p className="hover:bg-red-50 text-red-500 p-2 flex items-center rounded-lg cursor-pointer text-sm font-medium transition-colors">
                  Report Campaign
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
