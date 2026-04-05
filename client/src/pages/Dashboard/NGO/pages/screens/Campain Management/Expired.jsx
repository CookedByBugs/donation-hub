import { Col, Row } from "antd";
import React from "react";

const Expired = ({ campaigns, setCampaigns }) => {
  return (
    <div className="pt-2">
      <Row gutter={[24, 24]}>
        {campaigns.map((c, i) => {
          let raised = c.raisedAmount || 0;
          let goal = c.goalAmount || 1;

          return (
            <Col key={c._id} xl={8} lg={12} md={12} sm={24} xs={24}>
              <div className="h-full flex flex-col group rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out">
                <div className="relative overflow-hidden">
                  <img
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
                    src={Array.isArray(c.image) ? c.image[0] : c.image}
                    alt={c.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-80 grayscale-[20%]"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-500 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm capitalize">
                      {c.status || "Expired"}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-xl font-bold text-gray-800 line-clamp-1">{c.title}</h2>
                    <div className="h-2.5 w-2.5 rounded-full bg-gray-400 flex-shrink-0 ml-2" title="Expired"></div>
                  </div>
                  <div className="text-xs text-gray-400 mb-4 font-medium">
                    Inactive since {new Date(c.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                  
                  <div className="mt-auto pt-2">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-gray-400 font-medium tracking-wide uppercase mb-1">Raised</p>
                        <p className="text-lg font-bold text-gray-800">${raised.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 font-medium tracking-wide uppercase mb-1">Goal</p>
                        <p className="text-sm font-semibold text-gray-600">${goal.toLocaleString()}</p>
                      </div>
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

export default Expired;
