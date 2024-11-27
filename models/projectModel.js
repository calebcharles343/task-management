const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required!"],
    },
    description: {
      type: String,
      required: [true, "Project description is required!"],
    },

    created_at: {
      type: Date,
      default: Date.now,
    },

    updated_at: {
      type: Date,
    },
  },
  {
    // Enable virtuals in the schema options
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//virtual field to get tasks
projectSchema.virtual("tasks", {
  ref: "Task", // References the Task model
  localField: "_id", // Uses Project's _id field
  foreignField: "project_id", // Matches with Task's project_id field
});

// Transform JSON output while keeping virtuals
projectSchema.set("toJSON", {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Middleware to update `updated_at` before each update operation
projectSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updated_at: Date.now() });
  next();
});
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
