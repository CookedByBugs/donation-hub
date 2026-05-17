// In your routes, e.g., routes/pusherAuth.js
const pusherRouter = require("express").Router();
const pusher = require("../utils/pusher");

pusherRouter.post("/pusher/auth", (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;

  // 1. Perform your own authorization logic here.
  // e.g., verify a JWT, check if the user is allowed to join this channel.
  const user = getCurrentUser(req); // Your own function

  // 2. Use the correct, non-deprecated method.
  // For a private channel:
  // const authResponse = pusher.authorizeChannel(socketId, channel);

  // For a presence channel, you must pass user data:
  const authResponse = pusher.authorizeChannel(socketId, channel, {
    user_id: user.id,
    user_info: { name: user.name }, // only for presence channels
  });

  res.send(authResponse);
});

module.exports = pusherRouter;
