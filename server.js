const userRoutes = require("./endpoints/userRouter.js");
const toolRoutes = require("./endpoints/toolRouter.js");
const authRoutes = require("./endpoints/authRouter.js");
const borrowRoutes = require("./endpoints/borrowRouter.js");
const express = require("express");
const helmet = require("helmet");

const server = express();

server.get("/", (req, res) => {
  res.send(`<h2>Use /api/tools, /api/users, /api/auth or /api/borrow </h2></br><a href="https://github.com/quansenB/My-Tools-backend-">Documentation</a>`);
});

server.use(helmet());

server.use("/api/users", userRoutes);
server.use("/api/tools", toolRoutes);
server.use("/api/auth", authRoutes);
server.use("/api/borrow", borrowRoutes);

module.exports = server;
