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

## 🧱 Scalability Notes  
This project can be scaled by:  
- Converting backend into multiple microservices  
- Adding Redis caching for faster task retrieval  
- Using load balancers + horizontal scaling  
- Adding refresh tokens + rotating JWTs  
- Using Docker for containerization  
- CI/CD deployment pipelines  



## 🎨 Screenshots

<img width="1440" height="617" alt="taskManagerAddition" src="https://github.com/user-attachments/assets/2709809c-2fb2-4d75-9963-fef0879499e4" />

<img width="1185" height="703" alt="taskManagerLogin" src="https://github.com/user-attachments/assets/8b97a5c9-2a98-4e3e-a3c1-1bc3dd17db46" />

<img width="1221" height="724" alt="taskManagerRegister" src="https://github.com/user-attachments/assets/28489cf9-2606-42f8-8b0b-fec0396027e0" />

