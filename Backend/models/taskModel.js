import { pool } from "../config/db.js";

export const createTask = async (userId, title, dueDate) => {
  const query = `
    INSERT INTO tasks (user_id, title, due_date)
    VALUES ($1, $2, $3)
    RETURNING id, title, due_date, status, created_at
  `;

  const values = [userId, title, dueDate || null];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getTasksByUserId = async (userId) => {
  const query = `
    SELECT id, title, due_date, status, created_at
    FROM tasks
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;

  const result = await pool.query(query, [userId]);
  return result.rows;
};

export const updateTaskStatus = async (taskId, userId, status) => {
  const query = `
    UPDATE tasks
    SET status = $1
    WHERE id = $2 AND user_id = $3
    RETURNING id, title, due_date, status
  `;

  const result = await pool.query(query, [status, taskId, userId]);
  return result.rows[0];
};

export const deleteTaskById = async (taskId, userId) => {
  const query = `
    DELETE FROM tasks
    WHERE id = $1 AND user_id = $2
    RETURNING id
  `;

  const result = await pool.query(query, [taskId, userId]);
  return result.rows.length > 0;
};
