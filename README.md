# 🚌 Anthil Networks - Bus Booking Backend API

This is the backend API for the **Anthil Networks Bus Booking System**, built using **Node.js**, **Express**, and **SQLite3**.  
It supports features like **admin route & bus management**, **user bookings**, and **role-based authentication** using JWT.

---

# 🚀 Live Deployments

✅ **Render Deployment URL**  
🔗 [https://anthil-networks-bus-booking-backend.onrender.com](https://anthil-networks-bus-booking-backend.onrender.com)

✅ **AWS EC2 Deployment URL**  
🔗 [http://ec2-51-20-37-192.eu-north-1.compute.amazonaws.com:5000](http://ec2-51-20-37-192.eu-north-1.compute.amazonaws.com:5000)

---

# 📁 Project Structure


anthil-networks-backend/
├── controllers/           # Business logic for admin, auth, user
├── middlewares/           # Auth, validation
├── models/                # SQLite DB models
├── routes/                # Route definitions
├── utils/                 # JWT helpers
├── API_Documentation/     # 📄 API_Documentation.md (detailed)
├── postman/               # 📦 BusBookingCollection.json
├── Dockerfile             # Docker configuration
├── .env                   # Environment variables
├── .env.example           # Env template (no secrets)
├── package.json           
├── server.js              # Entry point
├── README.md              # Project readme



# 🔧 Setup Instructions (Local)
#### Clone the repository
git clone https://github.com/Puneetharajkr/anthil-networks-bus-booking-backend.git   
cd anthil-networks-backend

## Install dependencies
npm install

## Create .env file
cp .env.example .env
   Then fill in required values inside .env.

## Start the server
npm start or node server.js or nodemon server.js
    Server runs on: http://localhost:5000

# 🧪 API Testing
#### 📂 The following resources are available for testing the API:
🔹 API_Documentation/API_Documentation.md – Full list of all API endpoints with request body, success & error responses.
🔹 postman/BusBookingCollection.json – Import this collection into Postman to test all endpoints directly.

# 🐳 Docker Setup (Local)
Make sure you have Docker Desktop installed.

## Build Docker Image
docker build -t bus-booking-api .

## Run Docker Container
docker run -d -p 5000:5000 --name bus-booking bus-booking-api

Access the app at:
👉 http://localhost:5000


# ☁️ AWS EC2 Deployment
#### Steps followed:
Launched an Ubuntu 24.04 EC2 instance
Installed Docker & configured it
Uploaded project files to EC2 (via scp)
Built & ran Docker container on EC2

🔗 Final deployed EC2 URL:
http://ec2-51-20-37-192.eu-north-1.compute.amazonaws.com:5000

#### Note: Make sure port 5000 is open in the EC2 security group.

# 🧠 Admin & User Roles
## 🛠 Admin (Predefined credentials)
Can add/view/delete buses and routes

## 👤 User
Can register/login, view buses, and book/cancel tickets

## 🔐 Authentication
JWT tokens are generated on login

Use the token in Authorization: Bearer <token> header for protected routes

# ✅ Example Test Credentials
#### Admin
email: admin@example.com
password: admin123

#### User
email: user@example.com
password: user123

# 📦 Tech Stack
Node.js + Express
SQLite3 (local database)
JWT for auth
Docker (containerized deployment)
AWS EC2 (cloud hosting)
Postman (API testing)


# -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



# 🤝 Author
Built by Puneetharaj K R
puneetharajkr123@gmail.com
