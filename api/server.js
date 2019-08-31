const express = require("express");

const projectsRouter = require("../projects/project-router.js");

const server = express();

server.use(express.json());

server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send("<h3>Dode DB Sprint</h3>");
});

module.exports = server;