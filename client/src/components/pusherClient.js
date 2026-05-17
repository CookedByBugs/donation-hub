import Pusher from "pusher-js";

const PusherSocket = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  // The authorization endpoints we built on the server
  // channelAuthorization: {
  //   endpoint: `${import.meta.env.VITE_API_URL}/api/pusher/auth`,
  //   transport: "ajax",
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //   },
  // },
  // userAuthentication: {
  //   endpoint: `${import.meta.env.VITE_API_URL}/api/pusher/user-auth`,
  //   transport: "ajax",
  // },
});

export default PusherSocket;
