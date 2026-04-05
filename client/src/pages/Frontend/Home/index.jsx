import React, { useEffect } from "react";
import Hero from "./Hero";
import ParagraphSection from "./Section";
import WhyDonationHub from "./WhyDonationHub";
import ReadStory from "./ReadStory";
const Home = () => {
  useEffect(() => {
    document.title = "Home | Donation Hub";
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Hero />
      <ParagraphSection />
      <WhyDonationHub />
      <ReadStory />
    </div>
  );
};

export default Home;
