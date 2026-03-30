import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "@ant-design/v5-patch-for-react-19";
import AuthProvider from "./contexts/Auth/AuthContext.jsx";
import TabProvider from "./contexts/Tab/TabContext.jsx";
import CampaignProvider from "./contexts/Campaigns/CampaignContext.jsx";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <TabProvider>
        <CampaignProvider>
          <App />
        </CampaignProvider>
      </TabProvider>
    </AuthProvider>
  </BrowserRouter>,
  // </StrictMode>
);
