import { Col, Row } from "antd";
import React from "react";

const Info = ({ campaign }) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col lg={12} md={24} sm={24} xs={24}>
          <div className="shadow-xl bg-white rounded-2xl overflow-hidden md:p-10 p-5">
            <h3 className="text-2xl font-semibold">Fundraising Progress</h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="p-3 bg-orange-500/20 rounded-xl ">
                <p className="font-semibold text-xl mb-3">Raised</p>
                <p className="font-semibold text-orange-600 text-xl">
                  ${campaign.raisedAmount || 0}
                </p>
              </div>
              <div className=" p-3 bg-sky-500/20 rounded-xl ">
                <p className="font-semibold text-xl mb-3">Goal</p>
                <p className="font-bold text-sky-600 text-xl">
                  ${campaign.goalAmount || 0}
                </p>
              </div>
            </div>
            <div className="my-5">
              <h3 className="font-semibold text-2xl my-2">
                Progress{" "}
                {Math.floor(
                  ((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) *
                    100,
                )}
                %
              </h3>
              <div className="bg-gray-300 rounded-full h-4">
                <div
                  className="bg-sky-600 h-4 rounded-full max-w-full"
                  style={{
                    width: `${((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="">
              <div className="bg-orange-500/20 border-orange-500 border p-5 rounded-xl">
                <p className="text-orange-600">
                  <span className="font-semibold">
                    $
                    {Math.max(
                      (campaign.goalAmount || 0) - (campaign.raisedAmount || 0),
                      0,
                    )}
                  </span>{" "}
                  is still needed to reach the goal
                </p>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <div className="my-5">
            <div className="bg-white rounded-2xl shadow-xl p-10">
              <h3 className="text-2xl font-semibold ">Campaign Timeline</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="bg-orange-500/20 p-5 rounded-xl">
                  <h5 className="font-semibold text-xl mb-2">
                    Campaign Started
                  </h5>
                  <p className="text-sm">
                    {campaign.createdAt
                      ? new Date(campaign.createdAt).toLocaleDateString("en-GB")
                      : "N/A"}
                  </p>
                </div>
                <div className="bg-sky-500/20 p-5 rounded-xl">
                  <h5 className="font-semibold text-xl mb-2">Campaign End</h5>
                  <p className="text-sm">
                    {campaign.endDate
                      ? new Date(campaign.endDate).toLocaleDateString("en-GB")
                      : "N/A"}
                  </p>
                </div>
                {campaign.status === "inactive" ? (
                  <div className="col-span-2 bg-red-500/20 p-5 rounded-xl border border-red-500">
                    <p className=" text-red-500 font-semibold">
                      Expired since{" "}
                      <span className="font-bold text-red-600">
                        {campaign.updatedAt
                          ? new Date(campaign.updatedAt).toDateString()
                          : "N/A"}
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="col-span-2 bg-green-500/20 p-5 rounded-xl border border-green-500">
                    <p className=" text-green-500 font-semibold">
                      <span className="font-bold text-green-600">
                        {" "}
                        {campaign.endDate
                          ? Math.max(
                              Math.floor(
                                (new Date(campaign.endDate) - new Date()) /
                                  (1000 * 60 * 60 * 24),
                              ),
                              0,
                            )
                          : 0}
                      </span>{" "}
                      days remaining
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Info;
