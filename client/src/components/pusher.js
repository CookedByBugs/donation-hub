import pusher from "./pusherClient";

const channel = pusher.subscribe("donations");

channel.bind("new-donation", (data) => {
  console.log("New donation:", data);
});
