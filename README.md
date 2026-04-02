# Triumph Bike Dealership Management System

A premium full-stack MERN web application for managing a modern Triumph bike dealership. Featuring beautifully designed dynamic interfaces, role-based authentication, and a complete system for test ride bookings and spare parts inventory.

## Features

*   **Premium UI/UX:** Responsive dark theme inspired by the modern aesthetic of Triumph motorcycles.
*   **Authentication System:** Secure JWT-based registration and login with Customer and Admin roles.
*   **Motorcycles Showcase:** Browse a rich lineup of bikes with search functionality.
*   **Test Ride Booking:** Seamlessly book an experience with automated user info pre-filling.
*   **Accessories & Parts:** Full inventory visibility for customers.
*   **Admin Dashboard:** Dedicated dashboard to monitor bookings globally, live view of total metrics, and manage catalog data.

## Technologies Used

*   **Frontend:** React 19, Vite, Tailwind CSS v4, React Router DOM, Axios, Lucide React, React Hot Toast.
*   **Backend:** Node.js, Express, MongoDB (Mongoose), JSON Web Tokens (JWT), BcryptJS.

## Setup Instructions

### Pre-requisites
- Ensure you have **Node.js** installed on your system.
- Make sure **MongoDB** is running locally on port 27017, or obtain a cloud MongoDB URI.

### 1. Database Configuration
1. Open terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Inspect the `.env.example` file and create your `.env` file (if not automatically created):
   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/triumph_dealership
   JWT_SECRET=supersecretjwtkey12345
   ```

### 2. Seeding Sample Data
You can populate the database with 5 featured Triumph bikes, 3 sample parts, and an Admin account.
1. Run the data import script from the `backend` directory:
   ```bash
   npm run data:import
   ```

*The default admin account credentials are:*
**Email:** admin@triumph.com
**Password:** password123

### 3. Running the Backend Server
From the `backend` directory, install dependencies and start the server:
```bash
npm install
npm run dev
```
*The API will run on http://localhost:5000*

### 4. Running the Frontend Application
Open a new terminal window and navigate to the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
*Vite will start the client on http://localhost:5173. Navigation to the backend `/api` endpoints has been pre-configured via proxy.*

## Using the Application
- Browse the Home page to see the Hero showcase.
- Navigate to "Motorcycles" to explore models and test out the live Search feature.
- Select "Details" on an individual bike and click "Book Test Ride" to simulate a real CRM flow.
- Login using the seeded Admin credentials to view the secure Admin Dashboard and view the bookings.
