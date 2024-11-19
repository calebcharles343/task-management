const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
      },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true
    },
    status: {
        type: String,
        enum: ['todo', 'in_progress', 'completed'],
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});



// Update timestamp middleware
taskSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
  });
  

  const Task = mongoose.model("Task", taskSchema);
  
  module.exports = mongoose.model('Task', taskSchema);