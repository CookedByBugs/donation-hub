import { useAuthContext } from "@/contexts/Auth/AuthContext";
import React, { useEffect, useState } from "react";
import Analysis from "./Analysis";
import axios from "axios";
import Recent from "./Recent";

const Dashboard = () => {
  const { user } = useAuthContext();

  return (
    <div className="md:max-w-[80%] max-w-[95%] mx-auto">
      <Analysis />
      <hr className="text-primary w-[80%] mx-auto mb-10" />
      <Recent />
    </div>
  );
};

export default Dashboard;
