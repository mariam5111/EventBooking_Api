# 🎟️ Event Booking System API

A robust, secure, and scalable RESTful API built with **Node.js**, **Express.js**, and **MongoDB** for managing events and user ticket bookings. Designed following backend best practices, clean architecture, centralized error handling, and role-based access control (RBAC).

---

## ✨ Features

- **🔐 Authentication & Authorization:**
  - Secure JWT-based authentication.
  - Role-Based Access Control (`User`, `Organizer`, `Admin`).
  - Password hashing with `bcryptjs`.
  
- **📅 Event Management:**
  - Create, update, view, and delete events.
  - Automatic tracking of total and available seats.
  - Access restricted to `Organizer` and `Admin` roles.

- **🎟️ Booking System:**
  - Real-time seat allocation and availability checks.
  - Automatic seat restoration upon booking cancellation.
  - Strict owner verification (users can only view/manage their own bookings).

- **🛡️ Data Validation & Error Handling:**
  - Request body validation using **Joi**.
  - Centralized global error handling middleware via custom `AppError` class.

---

## 🛠️ Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose ORM
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt
- **Validation:** Joi
- **Tools & Testing:** Swagger, MongoDB Compass

---

## 📁 Project Structure

```text
├── config/
|   ├── swagger.js
│   └── db.js
├── controllers/
│   ├── booking.controller.js
│   ├── event.controller.js
│   └── user.controller.js
├── middleware/
│   ├── errorHandler.js
│   ├── protect.js
|   ├── validate.js
│   └── restrictTo.js
├── models/
│   ├── booking.model.js
│   ├── event.model.js
│   └── user.model.js
├── node_modules/
├── routes/
│   ├── booking.routes.js
│   ├── event.routes.js
│   └── user.routes.js
├── services/
│   ├── booking.service.js
│   ├── event.service.js
│   └── user.service.js
├── utils/
│   ├── appError.js
│   └── generateToken.js
├── validators/
│   ├── booking.validator.js
│   ├── event.validator.js
│   └── user.validator.js
|
├── .env.example
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
├── server.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas URI.

### Installation

1. **Clone the repository:**
   ```bash
   git clone (https://github.com/mariam5111/EventBooking_Api.git)
   cd EventBooking_Api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and copy the contents of `.env.example` into it, then fill in your values.


4. **Run the application:**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

---

5. **Access the API Documentation:**
   Open your browser and navigate to [http://localhost:5000/api-docs](http://localhost:5000/api-docs) to view the Swagger UI documentation.