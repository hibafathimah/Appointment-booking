# Appointment Booking Plugin

This project is a **Full-Stack Appointment Booking System** built with the **MERN Stack** (MongoDB, Express.js, Node.js, html, CSS) and a **JavaScript embeddable plugin** for booking appointments.

## Features
- Appointment Booking System with Date and Time Slots
- API Backend with MongoDB Integration
- Validation for Double Bookings
- Responsive and User-Friendly Interface
- 
---

## How to Run the Project Locally

### Prerequisites
- Node.js installed
- MongoDB installed (or MongoDB Atlas cloud database)

### Backend Setup
1. Go to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update MongoDB connection string in `index.js`.
4. Start the backend server:
   ```bash
   node index.js
   ```

### Frontend Setup
1. Go to the `frontend` folder.
2. Simply open the `index.html` file in your browser.

---

## How to Embed the Plugin on Any Website
1. Copy this HTML snippet into your website:

```html
<div id="appointment-plugin"></div>
<script src="plugin.js"></script>
<script>
  AppointmentPlugin("http://localhost:5000");
</script>
```

2. Place the `plugin.js` file in the same directory or provide the correct path.
3. Customize API base URL if hosted on a different server.

---

## API Endpoints
| Method | Endpoint            | Description          |
|--------|------------------|------------------|
| GET    | /api/slots        | Fetch available slots for a date |
| POST   | /api/book        | Book an appointment |

---

## Technologies Used
- Node.js
- Express.js
- MongoDB

---

## Video Demonstration
[[Video Link Here]](https://drive.google.com/file/d/1jpy5I0HwisY3BKzKkVxuBJmNd3fn8c6M/view?usp=sharing)

---
