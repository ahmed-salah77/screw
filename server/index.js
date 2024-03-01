const express = require("express");
const app = express();
const cors = require("cors");
const gameLogic = require("./game-logic");

app.use(cors());
app.use(express.json());

const server = app.listen(4000, () => {
  console.log("server is running on port 4000");
});

io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (client) => {
  console.log("new connection", client);
});
