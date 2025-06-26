# 🚀 Node.js Backend Setup Guide

This guide outlines the steps to set up a backend server using **Node.js**, **Express**, and **MongoDB**.

---

## 📁 Create the Project Directory

```bash
mkdir server
cd server


mkdir server
cd server
npm init -y:-✅ Initializes a new Node.js project inside the server folder and generates a default package.json file (with all default answers — that's what -y does).
npm install express mongoose cors dotenv
:::-✅ This installs the main dependencies:

express: for handling routes and server logic

mongoose: to interact with MongoDB

cors: to allow cross-origin requests (important when connecting frontend to backend)

dotenv: to store secret configs like DB URL in a .env file


npm install nodemon --save-dev:-✅ Installs nodemon (a development dependency), which restarts the server automatically when files change.

mkdir config controllers models routes::config/: MongoDB connection settings

controllers/: Logic behind routes (like register, login, etc.)

models/: Mongoose schema definitions (User, Task)

routes/: Express route files (userRoutes, taskRoutes, etc.)

touch index.js::- ✅ Creates the entry point file index.js (this is where Express app starts).
