
import pkg from "pg";
const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL || null;

let pool;
if (connectionString) {
  pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  pool = new Pool({
    user: process.env.PGUSER || "postgres",
    host: process.env.PGHOST || "localhost",
    database: process.env.PGDATABASE || "focusflow_db",
    password: process.env.PGPASSWORD || "your_local_db_password",
    port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  });
}

export { pool };
