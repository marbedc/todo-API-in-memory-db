# 📝 Todo List API Project

## 📚 Overview

This is a simple full-stack Node.js and Express.js application that provides a RESTful API for managing a Todo list. It features a backend that supports all standard CRUD operations, and a static frontend HTML page that interacts with the API via the Fetch API. A database is used to store todos persistently.

---

## 🚀 Features

### ✅ API Endpoints
- **View all todos**
- **View a specific todo by ID**
- **Add a new todo**
- **Delete a todo by ID**

### 🧱 Each todo has the following structure:
{
"id": "unique-id",
"title": "Buy groceries",
"completed": false
}

🖥️ Frontend
The frontend is a static HTML page that:

Displays a list of current todos

Allows users to add a new todo

Allows deletion of existing todos

It interacts with the backend using the Fetch API.

🛠️ Getting Started
Prerequisites
Node.js installed

A terminal or code editor like VS Code

Installation
1. Clone the repo:
git clone https://github.com/marbedc/todo-API-in-memory-db.git
cd todo-API-in-memory-db

2. Install dependencies:
npm install

3. Start the server:
node server.js

4. Visit your browser:
http://localhost:3000

🗃️ Database
The app connects to a database to persist todo items. Todos remain available even after the server is restarted.

🌐 Deployment
You can deploy this project on platforms like Glitch, Render, or Railway.

Be sure to update your database connection info accordingly when deploying.

📎 Useful Links





