import { Col, Row } from "antd";
import React from "react";

const Info = ({ campaign }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Fundraising Progress</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 transition-transform hover:-translate-y-1">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-1">Raised</p>
            <p className="font-bold text-gray-800 text-2xl lg:text-3xl">
              ${campaign.raisedAmount?.toLocaleString() || 0}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-transform hover:-translate-y-1">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Goal</p>
            <p className="font-bold text-gray-800 text-2xl lg:text-3xl">
              ${campaign.goalAmount?.toLocaleString() || 0}
            </p>
          </div>
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-gray-800">
               {Math.floor(((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100)}% Funded
            </span>
            <span className="text-sm font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
              Target: ${campaign.goalAmount?.toLocaleString() || 0}
            </span>
          </div>
          <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-primary h-full rounded-full relative"
              style={{
                width: `${Math.min(((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100, 100)}%`,
              }}
            >
               <div className="absolute top-0 right-0 bottom-0 w-full bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-sky-50 border border-sky-100 rounded-2xl flex items-center justify-center">
            <p className="text-sky-700 font-medium text-center">
              <span className="font-bold text-sky-800 text-lg mr-1">
                ${Math.max((campaign.goalAmount || 0) - (campaign.raisedAmount || 0), 0).toLocaleString()}
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
                {campaign.createdAt ? new Date(campaign.createdAt).toLocaleDateString("en-GB", {day: 'numeric', month: 'long', year: 'numeric'}) : "N/A"}
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">📅</div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Ends</p>
              <p className="font-semibold text-gray-800">
                {campaign.endDate ? new Date(campaign.endDate).toLocaleDateString("en-GB", {day: 'numeric', month: 'long', year: 'numeric'}) : "N/A"}
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">⏳</div>
          </div>
          
          {campaign.status === "inactive" ? (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-center">
              <p className="font-medium text-red-600">
                Expired on{" "}
                <span className="font-bold text-red-700 ml-1">
                  {campaign.updatedAt ? new Date(campaign.updatedAt).toLocaleDateString("en-GB", {day: 'numeric', month: 'long', year: 'numeric'}) : "N/A"}
                </span>
              </p>
            </div>
          ) : (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
              <p className="text-emerald-700 font-medium">
                <span className="font-bold text-emerald-800 text-xl mr-2">
                  {campaign.endDate ? Math.max(Math.floor((new Date(campaign.endDate) - new Date()) / (1000 * 60 * 60 * 24)), 0) : 0}
                </span>
                days remaining
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
