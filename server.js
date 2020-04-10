const express = require("express");
const helmet = require("helmet");

const actionRouter = require("./api/actionRouter");
const projectRouter = require("./api/projectRouter");
const cors = require("cors");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.status(200).json(req.query);
});

server.use("/api/project", projectRouter);
server.use("/api/action", actionRouter);

module.exports = server;
