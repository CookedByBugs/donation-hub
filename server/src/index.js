const app = require("./app/app");
const PORT = process.env.PORT || 8000;
const connectDB = require("./db/db");
const routes = require("./routes/index");
const { createServer } = require("node:http");
const httpServer = createServer(app);
const { Server } = require("socket.io");

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
app.set("io", io);
connectDB();

routes(app);

app.get("/", (req, res) => {
  res.send("Server is Online!");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
