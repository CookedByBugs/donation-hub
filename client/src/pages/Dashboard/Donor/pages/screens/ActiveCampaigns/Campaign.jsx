import React from "react";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
const Campaign = ({ campaigns }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Row gutter={[16, 16]}>
        {campaigns.map((campaign) => {
          let raised = campaign.raisedAmount;
          let goal = campaign.goalAmount;
          let percentage = (raised / goal) * 100;
          percentage = Math.floor(percentage);
          return (
            <Col key={campaign._id} xl={6} lg={8} md={12} sm={24} xs={24}>
              <div
                onClick={() =>
                  navigate(`/dashboard/active-campaigns/${campaign._id}`)
                }
                className="border cursor-pointer border-gray-400 rounded-2xl hover:shadow-lg transition-300 hover:shadow-gray-400 h-full"
              >
                <div className="">
                  <img
                    src={campaign.image[0]}
                    className="w-full mx-auto rounded-t-2xl object-cover h-[250px]"
                    alt=""
                  />
                </div>
                <div className="p-3">
                  <h2 className="text-xl font-semibold">{campaign.title}</h2>
                  <p
                    className="line-clamp-2 "
                    dangerouslySetInnerHTML={{ __html: campaign.description }}
                  />
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-full">
                    <div className="p-3 pb-0">
                      <p className="text-sm">Target: {campaign.goalAmount}$</p>
                    </div>
                    <div className="text-sm  p-3 pt-0">
                      Progress: {percentage}%
                      <div className="bg-gray-300 h-2 rounded-full">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3">
                    <button className="btn-primary">View</button>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Campaign;
