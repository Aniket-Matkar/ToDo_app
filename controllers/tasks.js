import { task } from "../models/tasks.js";

export const creatTask = async (req, res) => {
  const { title, description } = req.body;
  await task.create({ title, description, user: req.User });
  return res.status(201).json({
    success: true,
    message: "Task created",
  });
};

export const allTask = async (req, res) => {
  const MatchingUserID = req.User;
  let Task = await task.find({ user: MatchingUserID });

  return res.status(200).json({
    success: true,
    Task,
  });
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const Task = await task.findById(id);
  if (!Task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }
  await Task.deleteOne();
  return res.status(200).json({
    success: true,
    message: "Task deleted",
  });
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const Task = await task.findById(id);

    if (!Task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    Task.isCompleted = !Task.isCompleted;
    await Task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

