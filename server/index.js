const express = require("express");
const app = express();
const cors = require("cors");
const manageRooms = require("./manageRooms");
app.use(cors());
app.use(express.json());

const server = app.listen(5000, () => {
  console.log("server is running on port 5000");
});
manageRooms(server);
