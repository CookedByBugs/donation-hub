const app = require("./app/app");
const PORT = process.env.PORT || 8000;
const connectDB = require("./db/db");
const routes = require("./routes/index");
const { createServer } = require("node:http");
const httpServer = createServer(app);
// const { Server } = require("socket.io");
require("./utils/node-cron");

// const io = new Server(httpServer, {
//   cors: {
//     origin: "https://donaroid.vercel.app",
//     methods: ["GET", "POST"],
//   },
// });
// app.set("io", io);
connectDB();

routes(app);

app.get("/", (req, res) => {
  res.send("Server is Online!");
});
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Local server on http://localhost:${PORT}`);
  });
}
module.exports = app;
