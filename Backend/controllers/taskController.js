import {
  createTask,
  getTasksByUserId,
  updateTaskStatus,
  deleteTaskById,
} from "../models/taskModel.js";

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id; 

    const tasks = await getTasksByUserId(userId);

    res.status(200).json(tasks);
  } catch (error) {
    console.error("getTasks error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const newTask = await createTask(userId, title, dueDate);

    res.status(201).json(newTask);
  } catch (error) {
    console.error("addTask error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedTask = await updateTaskStatus(
      taskId,
      userId,
      status
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("updateTask error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;

    const deleted = await deleteTaskById(taskId, userId);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("deleteTask error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
