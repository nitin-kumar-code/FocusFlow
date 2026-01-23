import express from "express";
import {
  listNotes,
  createNewNote,
  getNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

const router = express.Router();

router.get("/", listNotes);       
router.post("/", createNewNote);   
router.get("/:id", getNote);       
router.patch("/:id", updateNote);  
router.delete("/:id", deleteNote); 

export default router;
