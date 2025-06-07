Practice-Project📚 Book Review Application
A complete server-side online book review application built with Express.js, featuring secure REST API integration with JWT-based session-level authentication.

🎯 Project Overview
This is the final project for IBM Developer Skills Network course, implementing a fully functional book review management system. Users can browse books, register accounts, log in, and manage book reviews.
✨ Key Features
📖 Book Management
📋 Get list of all available books
🔍 Search book details by ISBN
👤 Search books by author name
📑 Search books by title
💬 View book reviews
👥 User System
📝 User registration
🔐 User login (JWT authentication)
🔒 Session management
💭 Review System
➕ Add book reviews
✏️ Modify own reviews
🗑️ Delete own reviews

⚡ Asynchronous Programming
🔄 Promise callback implementation
🚀 Async/Await function support
📡 Axios HTTP client integration

🛠️ Tech Stack
Backend Framework: Express.js
Authentication: JSON Web Token (JWT)
Session Management: express-session
HTTP Client: Axios
Development Tool: Nodemon

🚀 Quick Start
Install Dependencies
bashnpm install
Start Server
bashnpm start
Server will run on http://localhost:5000

📡 API Endpoints
Public APIs (No Authentication Required)
GET  /                          # Get all books
GET  /isbn/:isbn               # Get book by ISBN
GET  /author/:author           # Get books by author
GET  /title
