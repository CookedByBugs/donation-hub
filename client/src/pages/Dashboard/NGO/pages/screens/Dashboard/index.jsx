import React, { useEffect, useState } from "react";
import Stats from "./Stats";
import LatestDonations from "./LatestDonations";
import TopCampaigns from "./TopCampaigns";

import pusher from "@/components/pusherClient";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    document.title = "Dashboard | Donation Hub";

    const channel = pusher.subscribe("campaigns");

    const handleRefresh = () => setRefresh((prev) => prev + 1);

    channel.bind("donation_received", handleRefresh);
    channel.bind("campaign_completed", handleRefresh);

    return () => {
      channel.unbind("donation_received", handleRefresh);
      channel.unbind("campaign_completed", handleRefresh);
      pusher.unsubscribe("campaigns");
    };
  }, []);

  return (
    <div className="md:max-w-[80%] max-w-[95%] md:p-0 p-3 mx-auto">
      <Stats refresh={refresh} />
      <hr className="text-primary w-[80%] mx-auto mb-10" />
      <LatestDonations refresh={refresh} />
      <hr className="text-primary w-[80%] mx-auto mb-10 mt-10" />
      <TopCampaigns refresh={refresh} />
    </div>
  );
};

export default Dashboard;
