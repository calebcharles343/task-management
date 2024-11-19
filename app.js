const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const projectRouter = require("./routes/projectRouter");
const taskRouter = require("./routes/taskRouter");

const app = express();

app.use(express.json());

app.use("/api/projects", projectRouter);
app.use('/api/projects', taskRouter);

app.use(errorHandler);

module.exports = app;
