# 📝 Task Manager App  
A full-stack MERN-based Task Manager application with **JWT Authentication**, **Role Management**, and **Task CRUD operations**, along with a clean **React frontend UI**.

---

## 🚀 Features

### 🔐 Authentication  
- User Registration & Login  
- Password hashing (bcrypt)  
- JWT Authentication (access tokens)  
- Protected routes  

### 🗂 Task Management  
- Create Task  
- Update Task (mark completed / edit)  
- Delete Task  
- View all tasks belonging to the logged-in user  
- Responsive UI  
- Popup modal for adding tasks  

### 🌐 API  
- REST API following best practices  
- Status codes & error handling  
- Input validation  
- Connected with MongoDB Atlas  

---

## 🏗 Tech Stack

### Backend  
- Node.js  
- Express.js  
- MongoDB & Mongoose  
- JWT (Authentication)  

### Frontend  
- React.js  
- CSS (fully responsive)  
- Fetch API  

## 🔧 Backend Setup


### 1️⃣ Install dependencies
```bash
cd backend
npm install
node app.js
```

### 2️⃣ Create `.env` file
```
PORT=4000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

## 💻 Frontend Setup

### 1️⃣ Install dependencies
```bash
cd frontend
npm install
```

### 2️⃣ Run frontend
```bash
npm run dev
```

