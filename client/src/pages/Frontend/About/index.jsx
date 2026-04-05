import React, { useEffect } from "react";
import Hero from "./Hero";
import Mission from "./Mission";
import Values from "./Values";
import CTA from "./CTA";

const About = () => {
  useEffect(() => {
    document.title = "About | Donation Hub";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Mission />
      <Values />
      <CTA />
    </div>
  );
};

export default About;
