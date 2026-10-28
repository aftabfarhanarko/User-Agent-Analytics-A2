# 🚀 User-Agent Analytics & API Monitoring Service

A modular RESTful API built with **Node.js** and **Express.js** featuring request analytics, intelligent User-Agent detection, automated client blocking for scraping/CLI tools, and protected user & event management routes.

---

## 📌 Table of Contents

- [Features](#-features)
- [Architecture & Folder Structure](#-architecture--folder-structure)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
  - [1. User-Agent Analytics](#1-user-agent-analytics)
  - [2. User Management (Token Protected)](#2-user-management-token-protected)
  - [3. Event Management](#3-event-management)
- [Security & Middlewares](#-security--middlewares)
- [Analytics Log Format](#-analytics-log-format)
- [License](#-license)

---

## ✨ Features

- **📊 Real-time Request Analytics**: Tracks every incoming HTTP request and parses client information dynamically using `ua-parser-js`.
- **🛡️ Bot & CLI Tool Blocking**: Automatically blocks unauthorized or command-line clients (e.g., `curl`, `wget`, `httpie`, `python-requests`) with `403 Forbidden`.
- **🏷️ Blocked Client Analytics**: Logs blocked attempts under a dedicated `"Blocked Client"` counter while preserving historical details.
- **🔐 Token Authentication**: Middleware-based token validation (`?token=123`) for sensitive endpoints.
- **🔄 Auto-Reload with Nodemon**: Configured to watch code changes seamlessly while ignoring log file modifications to avoid restart loops.
- **📂 Clean MVC Design**: Structured codebase with controllers, routes, middlewares, and utility helpers.

---

## 🏗️ Architecture & Folder Structure

```bash
Agent-Analytics/
├── controllers/              # Request handlers / business logic
│   ├── analyticsController.js
│   ├── eventController.js
│   └── userController.js
├── middleware/               # Custom Express middlewares
│   ├── blockMiddleware.js   # Blocks unwanted clients (curl, wget, etc.)
│   └── usermiddleware.js    # Token & user agent verification
├── router/                   # API route definitions
│   ├── analytics.js
│   ├── event.js
│   └── user.js
├── utils/                    # Helper utilities
│   └── logger.js             # User-Agent parser & file logger
├── views/                    # Frontend HTML views
│   └── analytics.html        # Bar Chart analytics dashboard
├── logs/                     # Persistent storage for analytics
│   └── user-agents.json
├── app.js                    # Application entry point
├── nodemon.json              # Nodemon configuration
├── package.json              # Project dependencies & scripts
└── README.md
```

---

## 🛠️ Tech Stack

- **Runtime Environment:** [Node.js](https://nodejs.org/) (v18+)
- **Framework:** [Express.js](https://expressjs.com/) (v5)
- **User-Agent Parser:** [ua-parser-js](https://www.npmjs.com/package/ua-parser-js)
- **Development Server:** [nodemon](https://www.npmjs.com/package/nodemon)

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed on your system.

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/Agent-Analytics.git
cd Agent-Analytics
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Server

**Development Mode (Auto-restart on code change):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`.

---

## 📖 API Documentation

### 1. User-Agent Analytics

#### Visual Bar Chart Dashboard
Renders an interactive HTML dashboard with a Bar Chart showing request counts per client.

- **Endpoint:** `GET /analytics`
- **Response:** HTML Page (`views/analytics.html`) with Chart.js visualization.

#### Get Aggregated Analytics (JSON API)
Returns real-time analytics including total request counts, client breakdowns, and detailed request logs.

- **Endpoint:** `GET /api/analytics`
- **Access:** Public (Browsers / API testing tools)
- **Response `200 OK`:**
```json
{
  "totalRequests": 25,
  "clients": {
    "Chrome": 12,
    "Thunder Client": 8,
    "Postman": 3,
    "Blocked Client": 2
  },
  "requests": [
    {
      "timestamp": "2026-10-28T06:45:16.453Z",
      "method": "GET",
      "url": "/api/user?token=123",
      "client": "Chrome",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
      "status": "Allowed"
    }
  ]
}
```

---

### 2. User Management (Token Protected)

> **Note:** All `/api/user` routes require a valid query token: `?token=123`.

#### Read All Users
- **Endpoint:** `GET /api/user?token=123`
- **Response `200 OK`:**
```json
[
  { "id": 1, "name": "Aftab Farhan" },
  { "id": 2, "name": "Rahim Ahmed" }
]
```

#### Read Single User
- **Endpoint:** `GET /api/user/:id?token=123`
- **Response `200 OK`:**
```json
{
  "id": 1,
  "name": "Aftab Farhan"
}
```

#### Create New User
- **Endpoint:** `POST /api/user?token=123`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "id": 6,
  "name": "John Doe"
}
```
- **Response `201 Created`:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": 6,
    "name": "John Doe"
  }
}
```

#### Update User
- **Endpoint:** `PUT /api/user/:id?token=123`
- **Request Body:**
```json
{
  "name": "Updated Name"
}
```
- **Response `200 OK`:**
```json
{
  "message": "User updated successfully",
  "user": {
    "id": 1,
    "name": "Updated Name"
  }
}
```

#### Delete User
- **Endpoint:** `DELETE /api/user/:id?token=123`
- **Response `200 OK`:**
```json
{
  "message": "User deleted successfully",
  "user": {
    "id": 1,
    "name": "Aftab Farhan"
  }
}
```

---

### 3. Event Management

#### Get All Events
- **Endpoint:** `GET /api/event`
- **Response `200 OK`:**
```json
[
  {
    "id": 1,
    "name": "Tech Conference",
    "date": "2026-11-15",
    "location": "Dhaka"
  }
]
```

#### Get Single Event
- **Endpoint:** `GET /api/event/:id`
- **Response `200 OK`:**
```json
{
  "id": 1,
  "name": "Tech Conference",
  "date": "2026-11-15",
  "location": "Dhaka"
}
```

---

## 🛡️ Security & Middlewares

### 1. Client Blocking Middleware (`blockClient`)
Protects endpoints from automated scrapers and CLI tools.
- **Blocked Clients:** `curl`, `wget`, `httpie`, `python`
- **Response when blocked (`403 Forbidden`):**
```json
{
  "message": "Access Denied: Requests from curl are blocked",
  "client": "Blocked Client"
}
```

### 2. Token Validation Middleware (`isValid`)
Ensures requests to `/api/user` supply the required query parameter.
- **Unauthorized Response (`401 Unauthorized`):**
```json
{
  "message": "Unauthorized: Invalid token"
}
```

---

## 📄 Analytics Log Format

The persistent JSON log at `logs/user-agents.json` maintains the following structure:

```json
{
  "totalRequests": 100,
  "clients": {
    "Chrome": 50,
    "Thunder Client": 30,
    "Blocked Client": 20
  },
  "requests": [
    {
      "timestamp": "2026-10-28T06:45:16.453Z",
      "method": "GET",
      "url": "/api/user",
      "client": "Blocked Client",
      "userAgent": "curl/8.5.0",
      "status": "Blocked"
    }
  ]
}
```

---

## 👨‍💻 Author

**Aftab Farhan Arko**
- GitHub: [@aftab-farhan](https://github.com/aftab-farhan)
