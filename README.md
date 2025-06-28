# 🚌 Anthil Networks - Bus Booking Backend API App

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


# -----------------------------------------------------------------------------------

# 🚗Anthil Networks Second Hand Car Buying Frontend App
🚗 Car Buying App – Second-hand Car Marketplace
This is a web-based application that enables users to browse, request, and book second-hand cars. Admins can manage listings and requests through an admin dashboard.

# 🚀 Live Deployments

✅ **Netlify Deployment URL**  
🔗 [https://anthil-networks-bus-booking-backend.onrender.com](https://anthill-networks-cars-app.netlify.app/)

🌟 Features
👤 User
Login with Google

Browse available cars with search & filter

View car details

Submit purchase requests

View "My Requests" and booking status

Book the car once the request is approved

🔐 Admin
Login with Google (admin role detected via Firestore)

Access admin dashboard

View all purchase requests

Change request status (Pending → Approved/Rejected/Contacted)

View & manage all bookings (change status to Completed/Cancelled)

🛠 Tech Stack
Frontend: React.js (Hooks, Routing)

Auth: Firebase Authentication (Google Sign-In)

Database: Firebase Firestore

Storage: Firebase Storage (for car images)

Hosting (optional): Firebase Hosting / Vercel

🚀 Working Flow
🔹 1. Authentication
User logs in using Google.

Firebase Auth tracks current user session.

Admin role is fetched from Firestore (roles collection → role: "admin").

🔹 2. Car Listings
Cars are listed from Firestore cars collection.

Users can search by make, model, year, or price.

🔹 3. Purchase Requests
When a user is interested in a car, they click "Request to Purchase".

A record is saved in the purchaseRequests collection with user & car info.

🔹 4. Admin Panel
Admin views all user requests.

Admin can update the status:

Pending → Approved, Rejected, or Contacted

Once request is approved, the user sees "Book Now" button.

🔹 5. Booking Flow
User clicks "Book Now" → creates a record in bookings collection.

Admin can view all bookings and update status:

Booked → Completed or Cancelled

📁 Firebase Collections
markdown
Copy
Edit
- cars
  - {id, make, model, year, price, imageUrls[] }

- purchaseRequests
  - {id, userId, carId, status, message }

- bookings
  - {id, userId, carId, status, createdAt }

- roles
  - {uid: string, role: "admin"}
⚙️ Setup Instructions
bash
Copy
Edit
# 1. Clone the repo
git clone <repo-url>
cd car-buying-app

# 2. Install dependencies
npm install

# 3. Add Firebase Config
# Create a file: src/firebase/config.js
# and paste your Firebase project credentials

# 4. Run the app
npm start
🧪 Sample Admin Setup
To make someone admin:

Go to Firestore

Create document in roles collection:

Document ID = user UID

Field = role: "admin"

📸 Screenshots
(Add screenshots of Home, Car Detail, Admin Dashboard, My Requests, etc.)

📌 Final Note
This project demonstrates full-stack implementation using Firebase and React, covering authentication, CRUD operations, conditional role-based access, and real-time updates.



# 🤝 Author
Built by Puneetharaj K R
puneetharajkr123@gmail.com
