import { useAuthContext } from "@/contexts/Auth/AuthContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const ParagraphSection = () => {
  const { isAuth } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="bg-nav py-20 md:py-32">
      <div className="max-w-[95%] md:max-w-[80%] mx-auto">
        <Row
          gutter={[
            { xs: 16, sm: 24, md: 32, lg: 48 },
            { xs: 16, sm: 24, md: 32, lg: 48 },
          ]}
          align="middle"
        >
          {/* LEFT — LOTTIE */}
          <Col lg={12} md={24} sm={24} xs={24}>
            <div data-aos="fade-right" className="flex justify-center relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl transform scale-75"></div>
              <DotLottieReact
                src="https://lottie.host/1d18f986-958e-4429-9515-152dd33c4bb6/qFCqU9hwBb.lottie"
                className="w-full max-w-[480px] relative z-10"
                autoplay="once"
              />
            </div>
          </Col>

          {/* RIGHT — TEXT */}
          <Col lg={12} md={24} sm={24} xs={24}>
            <div
              data-aos="fade-left"
              className="flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6 text-gray-800">
                The easiest way to support{" "}
                <span className="text-primary block sm:inline">
                  your favourite causes.
                </span>
              </h2>

              <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed max-w-2xl">
                <span className="font-semibold text-gray-700 block mb-2 text-lg md:text-xl">
                  One app. Endless impact.
                </span>
                DonationHub allows you to make one-off or recurring donations
                across multiple charities, all managed from a single, beautiful
                dashboard. No more bouncing between different websites or
                support lines.
              </p>

              <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
                Donate with complete confidence knowing your contribution
                directly reaches the organisation—without greedy third-party
                marketers taking a cut.
              </p>

              <button
                onClick={() =>
                  navigate(isAuth ? "/dashboard" : "/auth/register")
                }
                className="btn-primary !py-3 !px-8 md:!py-4 md:!px-12 font-bold text-base md:text-lg rounded-full w-max shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
              >
                {isAuth ? "Go to Dashboard" : "Create Free Account"}
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ParagraphSection;
