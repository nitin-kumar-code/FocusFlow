import { pool } from "../config/db.js";

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
};

export const createUser = async (name, email, passwordHash) => {
  await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)`,
    [name, email, passwordHash]
  );
};
