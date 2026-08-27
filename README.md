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
|   ├── upload.js
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



5. **Access the API Documentation:**
   ```Open your browser and navigate to [http://localhost:5000/api-docs] to view the Swagger UI documentation.```

---

## 🧪 Testing with Postman

A ready-to-use Postman collection is included in the repo: [`EventBooking_Api.postman_collection.json`](./EventBooking_Api.postman_collection.json).

1. Open Postman and click **Import**, then select `EventBooking_Api.postman_collection.json`.
2. Check the collection's variables (`baseUrl`, `token`, `refreshToken`, `organizerToken`, `adminToken`, `eventId`, `bookingId`) — `baseUrl` defaults to `http://localhost:5000/api`.
3. Run **Users → Register User**, then **Users → Login (User)**. The login request automatically saves `{{token}}` and `{{refreshToken}}` for you.
4. For endpoints restricted to `Organizer`/`Admin`, register a user, promote their `role` directly in MongoDB Compass, then run **Login (Organizer)** / **Login (Admin)** to save `{{organizerToken}}` / `{{adminToken}}`.
5. Creating an event or a booking automatically saves `{{eventId}}` / `{{bookingId}}` so the rest of the requests in that folder work without manual copy-pasting.
6. Since `JWT_EXPIRES_IN` is short (15m by default), use **Users → Refresh Access Token** to get a new `{{token}}` without logging in again.