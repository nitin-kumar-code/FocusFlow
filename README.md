# 📚 FocusFlow — Student Productivity & Learning Tracker

FocusFlow is a full-stack productivity web application built to help students manage **tasks, notes, and daily progress** in one place.  
It includes secure authentication, user-specific data, and a clean dashboard overview.

This project was built as a structured learning project to gain hands-on experience with full-stack development.

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected backend routes

### 📋 Tasks
- Create, view, update, and delete tasks
- Mark tasks as pending or completed
- Optional due dates
- Tasks are user-specific and secure

### 📝 Notes
- Create and delete notes
- Store ideas, reminders, and thoughts
- Notes are private to each user
- Dashboard preview of recent notes

### 📊 Dashboard
- Overview of total tasks
- Pending vs completed task count
- Completion percentage
- Notes summary

### 🎨 UI & UX
- Clean, minimal UI using Tailwind CSS
- Responsive layout
- Reusable React components
- Clear loading and empty states

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router DOM

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt

---

## 📂 Project Structure

frontend/
├─ src/
│ ├─ components/
│ ├─ pages/
│ ├─ App.jsx
│ └─ main.jsx

backend/
├─ controllers/
├─ models/
├─ routes/
├─ middlewares/
├─ server.js
└─ .env

---

## Testing & Debugging

- Manual API testing using Postman
- JWT verification testing
- Error handling for invalid tokens
- UI testing for loading and empty states

---

## Learning Outcomes

Through this project, I learned:
- Full-stack architecture (models, controllers, routes)
- Secure authentication flows
- PostgreSQL schema design
- React state management and side effects
- Debugging real-world issues
- Building production-style features step by step

---

## Acknowledgement

Inspired by student productivity tools and Notion-style workflows.