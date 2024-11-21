const Project = require("../models/projectModel");
const catchAsync = require("../utils/catchAsync");
const handleResponse = require("../utils/handleResponse");
const AppError = require("../utils/appError");
const Task = require("../models/taskModel");

////////////////////
//Get All Projects
//////////////////
exports.getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find();

  handleResponse(res, 200, "Projects fetched successfully", projects);
});

////////////////////
//Create Project
//////////////////
exports.createProject = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const newProject = await Project.create(req.body);
  handleResponse(res, 200, "Project created successfully", newProject);
});

////////////////////
//Get Project
//////////////////
exports.getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  console.log(project);
  if (!project) {
    console.log(next());
    return next(new AppError("No projects found with that ID", 404)); // jump striaght to error middleware if tour = null
  }

  handleResponse(res, 200, "Project fetched successfully", project);
});

////////////////////
//Update Project
//////////////////

exports.updateProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    return next(new AppError("No project found with that ID", 404));
  }

  handleResponse(res, 200, "Project Updated successfully", project);
});

////////////////////
//Delete A Project
//////////////////

exports.deleteProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return next(new AppError("No project found with that ID", 404));
  }

  await Task.deleteMany({ project_id: req.params.id });

  handleResponse(res, 204, "Project deleted successfully");
});
