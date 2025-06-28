🚗 Car Buying App – Second-hand Car Marketplace
This is a web-based application that enables users to browse, request, and book second-hand cars. Admins can manage listings and requests through an admin dashboard.

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
