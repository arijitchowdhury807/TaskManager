const Task = require('../models/Task');


// LIST ALL TASKS

const listTasks = async (req, res, next) => {
  try {
    const filter = req.user.role === "admin" 
      ? {} 
      : { owner: req.user._id };

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.json({ tasks });
  } catch (err) {
    next(err);
  }
};


// GET SINGLE TASK

const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task)
      return res.status(404).json({ message: "Task not found" });

    
    if (req.user.role !== "admin" && task.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Forbidden" });

    res.json({ task });
  } catch (err) {
    next(err);
  }
};


// CREATE TASK

const createTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    const task = await Task.create({
      title,
      description,
      completed: completed || false,
      owner: req.user._id
    });

    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    next(err);
  }
};


// UPDATE TASK

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task)
      return res.status(404).json({ message: "Task not found" });


    if (req.user.role !== "admin" && task.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Forbidden" });

    const allowedUpdates = ["title", "description", "completed"];
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) task[field] = req.body[field];
    });

    await task.save();

    res.json({ message: "Task updated", task });
  } catch (err) {
    next(err);
  }
};


// DELETE TASK

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task)
      return res.status(404).json({ message: "Task not found" });

 
    if (req.user.role !== "admin" && task.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Forbidden" });

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};
