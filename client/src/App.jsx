import React, { useEffect } from "react";
import "./App.css";
import Routes from "./pages/Routes";
import Aos from "aos";
import "aos/dist/aos.css";
import pusher from "./components/pusherClient";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ConfigProvider } from "antd";

const App = () => {
  Aos.init({
    duration: 1000,
    once: true,
    delay: 100,
    // easing: "ease-in-sine",
  });

  useEffect(() => {
    const handleStateChange = (states) => {
      console.log("Pusher state:", states.current);
    };

    pusher.connection.bind("state_change", handleStateChange);

    pusher.connection.bind("connected", () => {
      console.log("Pusher connected");
    });

    pusher.connection.bind("disconnected", () => {
      console.log("Pusher disconnected");
    });

    return () => {
      pusher.connection.unbind("state_change", handleStateChange);
      pusher.connection.unbind("connected");
      pusher.connection.unbind("disconnected");
    };
  }, []);
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "25d3c2" } }}>
      <Routes />
    </ConfigProvider>
  );
};

export default App;
