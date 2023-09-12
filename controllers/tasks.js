import { task } from "../models/tasks.js";
import ErrorHandler from "../utils/error.js";

export const creatTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await task.create({ title, description, user: req.User });
    return res.status(201).json({
      success: true,
      message: "Task created",
    });
  } catch (error) {
    next(error);
  }
};

export const allTask = async (req, res, next) => {
  try {
    const MatchingUserID = req.User;
    let Task = await task.find({ user: MatchingUserID });

    return res.status(200).json({
      success: true,
      Task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Task = await task.findById(id);
    if (!Task) {
      return next(new ErrorHandler(404, "task not found"));
    }
    await Task.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Task = await task.findById(id);

    if (!Task) {
      return next(new ErrorHandler(404, "task not found"));
    }

    Task.isCompleted = !Task.isCompleted;
    await Task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated",
    });
  } catch (error) {
    next(error);
  }
};
