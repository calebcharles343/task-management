const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.get("/:project_id/tasks/:id", getAllTasks);
router.post("/:project_id/tasks", createTask);
router.put("/:project_id/tasks/:task_id", updateTask);
router.delete("/:project_id/tasks/:task_id", deleteTask);

module.exports = router;
