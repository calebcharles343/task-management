const Task = require('../models/taskModel');

// Get all tasks for a project
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ project_id: req.params.project_id });
        res.json({ tasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new task
const createTask = async (req, res) => {
    try {
        const { title, description, due_date, priority, status } = req.body;
        const project_id = req.params.project_id;

        const task = await Task.create({
            project_id,
            title,
            description,
            due_date,
            priority,
            status
        });

        res.status(201).json({
            task_id: task._id,
            project_id: task.project_id,
            task_details: task
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update task
const updateTask = async (req, res) => {
    try {
        const { task_id, project_id } = req.params;
        
        const task = await Task.findOneAndUpdate(
            { _id: task_id, project_id },
            req.body,
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ updated_task_details: task });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete task
const deleteTask = async (req, res) => {
    try {
        const { task_id, project_id } = req.params;

        const task = await Task.findOneAndDelete({
            _id: task_id,
            project_id
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};