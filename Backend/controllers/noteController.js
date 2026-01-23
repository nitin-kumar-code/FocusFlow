import {
  createNote,
  getNotesByUserId,
  getNoteById,
  updateNoteById,
  deleteNoteById,
} from "../models/noteModel.js";

export const listNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await getNotesByUserId(userId);
    res.status(200).json(notes);
  } catch (err) {
    console.error("listNotes error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createNewNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, content } = req.body;

    if (!title && !content) {
      return res.status(400).json({ message: "Title or content required" });
    }

    const note = await createNote(userId, title || null, content || null);
    res.status(201).json(note);
  } catch (err) {
    console.error("createNewNote error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;
    const note = await getNoteById(noteId, userId);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    console.error("getNote error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;
    const { title, content } = req.body;

    if (title === undefined && content === undefined) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const updated = await updateNoteById(noteId, userId, { title, content });
    if (!updated) return res.status(404).json({ message: "Note not found" });
    res.json(updated);
  } catch (err) {
    console.error("updateNote error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;

    const deleted = await deleteNoteById(noteId, userId);
    if (!deleted) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error("deleteNote error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
