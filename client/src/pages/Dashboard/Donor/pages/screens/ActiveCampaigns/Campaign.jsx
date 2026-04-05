import React from "react";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

const Campaign = ({ campaigns }) => {
  const navigate = useNavigate();
  return (
    <div className="mt-4">
      <Row gutter={[24, 24]}>
        {campaigns.map((campaign) => {
          let raised = campaign.raisedAmount || 0;
          let goal = campaign.goalAmount || 1;
          let percentage = (raised / goal) * 100;
          percentage = Math.floor(percentage);

          return (
            <Col key={campaign._id} xl={8} lg={12} md={12} sm={24} xs={24}>
              <div
                onClick={() =>
                  navigate(`/dashboard/active-campaigns/${campaign._id}`)
                }
                className="cursor-pointer h-full flex flex-col group rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={campaign.image[0]}
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={campaign.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-4 py-1.5 rounded-full shadow-sm capitalize">
                      {campaign.category || "General"}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-gray-800 line-clamp-1 mb-2 group-hover:text-primary transition-colors">{campaign.title}</h2>
                  <p
                    className="text-gray-500 text-sm line-clamp-2 mb-6"
                    dangerouslySetInnerHTML={{ __html: campaign.description }}
                  />
                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <p className="text-xs text-gray-400 font-medium tracking-wide uppercase mb-1">Raised</p>
                        <p className="text-lg font-bold text-gray-800">${raised.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 font-medium tracking-wide uppercase mb-1">Goal</p>
                        <p className="text-sm font-semibold text-gray-600">${goal.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 h-2.5 rounded-full overflow-hidden mb-3">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-1000 ease-out relative"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      >
                        <div className="absolute top-0 right-0 bottom-0 w-full bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-primary">{percentage}% Funded</span>
                      {percentage >= 100 ? (
                        <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-md">Goal Reached</span>
                      ) : (
                        <span className="text-xs font-semibold text-gray-500 hover:text-primary transition-colors flex items-center gap-1 group-hover:text-primary">
                          Donate Now →
                        </span>
                      )}
                    </div>
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
