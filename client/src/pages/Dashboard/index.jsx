import React from "react";
import { useAuthContext } from "../../contexts/Auth/AuthContext";
import Admin from "./Admin";
import NGO from "./NGO";
import Donor from "./Donor";

const Dashboard = () => {
  document.title = "Dashboard | Donation Hub";
  const { user } = useAuthContext();
  switch (user.role) {
    case "admin":
      return <Admin />;
    case "ngo":
      return <NGO />;
    case "donor":
      return <Donor />;
    default:
      return <Donor />;
  }
};

export default Dashboard;
