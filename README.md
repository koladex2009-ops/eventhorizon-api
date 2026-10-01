# EventHorizon Backend

Backend API for EventHorizon, a platform for managing local tech meetups. Built with Node.js, Express, and MongoDB, providing secure user authentication with email verification.

## Features

- User registration with input validation (`joi`)
- Password hashing (`bcrypt`)
- JWT-based login authentication
- Token-based email verification (no OTP) — unique, time-sensitive, hashed before storage
- Protected routes requiring a valid JWT
- Unverified users are blocked from logging in or accessing protected routes

## Tech Stack

- Node.js / Express
- MongoDB (Mongoose) — MongoDB Atlas
- joi — request validation
- bcrypt — password hashing
- jsonwebtoken — JWT auth
- nodemailer — sending verification emails
- crypto (built-in) — generating verification tokens

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/eventhorizon-backend.git
cd eventhorizon-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your own values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string, including database name |
| `PORT` | Port the server runs on (default: 4000) |
| `JWT_SECRET` | Any long random string used to sign JWTs |
| `EMAIL_USER` | Gmail address used to send verification emails |
| `EMAIL_PASSWORD` | Gmail App Password (not your regular Gmail password — requires 2-Step Verification enabled, then generate one under Google Account → Security → App Passwords) |
| `EMAIL_HOST` | SMTP host (`smtp.gmail.com` for Gmail) |
| `EMAIL_PORT` | SMTP port (`587`) |
| `FRONTEND_URL` | Base URL used to build the verification link sent in emails |

### 4. Run the server

```bash
npm start
```

or, for development with auto-restart:

```bash
npm run dev
```

The server will run at `http://localhost:4000` (or whatever `PORT` you set).

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user and send a verification email | No |
| POST | `/api/auth/login` | Log in and receive a JWT (requires verified email) | No |
| GET | `/api/auth/verify-email?token=` | Verify a user's email using the token from the email link | No |
| GET | `/api/user/profile` | Get the logged-in user's profile | Yes (Bearer token) |

### Example: Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Obaniyi Kolade",
  "email": "koladex@example.com",
  "password": "test12345"
}
```

### Example: Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "koladex@example.com",
  "password": "test1234"
}
```

### Example: Protected route

```http
GET /api/user/profile
Authorization: Bearer <jwt_token>
```

## Testing

A Postman collection is included (`postman_collection.json`) with pre-configured requests for all endpoints above.

## Security Notes

- Passwords are hashed with bcrypt before storage.
- Email verification tokens are hashed (SHA-256) before being stored in the database — only the raw token sent via email can be used to verify.
- Verification tokens expire after 1 hour.
- Unverified users cannot log in or access protected routes.


## Live Deployment

The API is deployed on Render:

[https://eventhorizon-api.onrender.com](https://eventhorizon-api.onrender.com)

You can test the deployed API using this base URL:

```text
https://eventhorizon-api.onrender.com