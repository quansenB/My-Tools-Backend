const userRoutes = require("./data/userRouter.js");
const toolRoutes = require("./data/toolRoutes.js");
const authRoutes = require("./data/authRoutes.js");
const borrowRoutes = require("./data/borrowRoutes.js");
const express = require("express");
const helmet = require("helmet");

const server = express();

server.get("/", (req, res) => {
  res.send(`<h2>Use /api/tools, /api/users, /api/auth or /api/borrow </h2>`);
});

server.use(helmet);

server.use("/api/tools");
server.use("/api/users");
server.use("/api/auth");
server.use("/api/borrow");

module.exports = server;
