import React from "react";
import Sider from "./Components/Sider";
import Header from "./Components/Header";
import Routes from "./pages/Routes";
import { useTabContext } from "@/contexts/Tab/TabContext";
const Donor = () => {
  const { setIsOpen } = useTabContext();
  return (
    <div className="bg-nav">
      <Sider />
      <Header />
      <div className="min-h-screen" onClick={() => setIsOpen(false)}>
        <Routes />
      </div>
    </div>
  );
};

export default Donor;
