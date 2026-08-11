# NOVA SMS Backend

Backend REST API for the NOVA SMS application.

The backend provides secure user authentication and mobile device management using Node.js, Express.js, MongoDB, Mongoose, and JWT.

---

## 🚀 Features

### Authentication

- User registration
- User login
- User logout
- Password hashing using bcrypt
- JWT-based authentication
- HTTP-only authentication cookies
- Protected routes
- User-specific resource access

### Mobile Device Management

- Add mobile devices
- View all devices owned by the authenticated user
- View a specific device
- Update device details
- Delete a device
- Device ownership validation
- Device status management

### Backend

- RESTful API architecture
- MongoDB database
- Mongoose ODM
- Global error handling
- Async error handling
- Request validation
- Security headers using Helmet
- CORS configuration
- Environment-based configuration

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | Backend web framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Helmet | Security headers |
| Cookie Parser | HTTP cookie handling |
| CORS | Cross-origin requests |
| Nodemon | Development server |

---

## 📁 Project Structure

```text
nova-sms-backend/
│
├── src/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── mobile.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── notFound.middleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Mobile.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── mobile.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   └── mobile.service.js
│   │
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── asyncHandler.js
│   │   └── jwt.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests/
│
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json