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
- **Tools & Testing:** Postman, MongoDB Compass

---

## 📁 Project Structure

```text
├── controllers/
│   ├── auth.controller.js
│   ├── booking.controller.js
│   └── event.controller.js
├── models/
│   ├── booking.model.js
│   ├── event.model.js
│   └── user.model.js
├── routes/
│   ├── booking.routes.js
│   ├── event.routes.js
│   └── user.routes.js
├── services/
│   ├── booking.service.js
│   ├── event.service.js
│   └── user.service.js
├── middlewares/
│   ├── auth.middleware.js
│   └── error.middleware.js
├── utils/
│   └── appError.js
├── validators/
│   ├── booking.validator.js
│   ├── event.validator.js
│   └── user.validator.js
├── .env.example
├── app.js
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
   Create a `.env` file in the root directory:
   like ` .env.example`  in the root directory


4. **Run the application:**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

---

## 📌 API Endpoints

### 🔑 Authentication (`/api/users`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user | Public |
| `POST` | `/login` | User login & receive JWT token | Public |
| `GET` | `/profile` | Get current logged-in user profile | Authenticated |

### 📅 Events (`/api/events`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Get all events | Public |
| `GET` | `/:id` | Get single event details | Public |
| `POST` | `/` | Create a new event | Organizer / Admin |
| `PATCH` | `/:id` | Update event details | Organizer / Admin |
| `DELETE` | `/:id` | Delete an event | Organizer / Admin |

### 🎟️ Bookings (`/api/bookings`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Create a booking | User |
| `GET` | `/my-bookings` | Get logged-in user's bookings | User |
| `GET` | `/:id` | Get booking by ID | Owner / Admin |
| `GET` | `/` | Get all bookings in system | Admin |
| `PATCH` | `/:id` | Update seats for a booking | Owner / Admin |
| `PATCH` | `/:id/cancel` | Cancel a booking | Owner / Admin |
| `DELETE` | `/:id` | Delete a booking record | Admin |

---

## 🧪 Testing with Postman

1. **Register User:** Send `POST /api/users/register` (Role defaults strictly to `User`).
2. **Set Roles for Testing:** Modify user roles manually in **MongoDB Compass** (`User` $\rightarrow$ `Organizer` or `Admin`).
3. **Obtain Token:** Send `POST /api/users/login` and add the returned token to Postman under `Authorization -> Bearer Token`.
4. **Create Event:** Use an `Organizer` token to `POST /api/events`.
5. **Book Event:** Use a `User` token to `POST /api/bookings` with the generated `eventId`.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).