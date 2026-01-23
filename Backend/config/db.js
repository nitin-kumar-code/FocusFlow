import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "FocusFlow Database",
  password: "qwerty1234",
  port: 5432,
});