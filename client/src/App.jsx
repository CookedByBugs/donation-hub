import React, { useEffect } from "react";
import "./App.css";
import Routes from "./pages/Routes";
import Aos from "aos";
import "aos/dist/aos.css";
// import socket from "./components/socket";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ConfigProvider } from "antd";

const App = () => {
  Aos.init({
    duration: 1000,
    once: true,
    delay: 100,
    // easing: "ease-in-sine",
  });
  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("Socket Connected: ", socket.id);
  //   });
  //   socket.on("disconnect", () => {
  //     console.log("Socket Disconnected");
  //   });
  //   return () => {
  //     socket.off("connect");
  //     socket.off("disconnect");
  //   };
  // }, []);
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "25d3c2" } }}>
      <Routes />
    </ConfigProvider>
  );
};

export default App;
