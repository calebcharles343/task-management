const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const projectRouter = require("./routes/projectRouter");

const app = express();

app.use(express.json());

app.use("/api/projects", projectRouter);

app.use(errorHandler);

module.exports = app;
