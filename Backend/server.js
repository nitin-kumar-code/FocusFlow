import "dotenv/config";
console.log("JWT SECRET:", process.env.JWT_SECRET);
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);
app.use("/api/notes", authMiddleware, noteRoutes);

app.get("/api/user/me", authMiddleware, (req, res) => {
  return res.json({ userId: req.user.id });
});

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server running on port ${process.env.PORT || 5001}`);
});