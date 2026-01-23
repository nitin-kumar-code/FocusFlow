import { pool } from "../config/db.js"; 

export async function createNote(userId, title, content) {
  const q = `
    INSERT INTO notes (user_id, title, content)
    VALUES ($1, $2, $3)
    RETURNING id, user_id, title, content, created_at, updated_at
  `;
  const { rows } = await pool.query(q, [userId, title, content]);
  return rows[0];
}

export async function getNotesByUserId(userId) {
  const q = `
    SELECT id, user_id, title, content, created_at, updated_at
    FROM notes
    WHERE user_id = $1
    ORDER BY updated_at DESC
  `;
  const { rows } = await pool.query(q, [userId]);
  return rows;
}

export async function getNoteById(noteId, userId) {
  const q = `
    SELECT id, user_id, title, content, created_at, updated_at
    FROM notes
    WHERE id = $1 AND user_id = $2
    LIMIT 1
  `;
  const { rows } = await pool.query(q, [noteId, userId]);
  return rows[0] || null;
}

export async function updateNoteById(noteId, userId, { title, content }) {
  const q = `
    UPDATE notes
    SET title = COALESCE($3, title),
        content = COALESCE($4, content),
        updated_at = now()
    WHERE id = $1 AND user_id = $2
    RETURNING id, user_id, title, content, created_at, updated_at
  `;
  const { rows } = await pool.query(q, [noteId, userId, title, content]);
  return rows[0] || null;
}

export async function deleteNoteById(noteId, userId) {
  const q = `
    DELETE FROM notes
    WHERE id = $1 AND user_id = $2
    RETURNING id
  `;
  const { rows } = await pool.query(q, [noteId, userId]);
  return rows.length > 0;
}
