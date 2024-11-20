const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  task_name: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
});

// Update timestamp middleware
taskSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = mongoose.model("Task", taskSchema);
