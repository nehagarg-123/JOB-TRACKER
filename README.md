# Job Manager

Job Manager is a full-stack web application for managing job applications. It allows users to register, log in, and track their job applications, including company, position, and status. The project is split into a React frontend and a Node.js/Express backend, with MongoDB as the database.

## Features

- **User Authentication:** Register and log in securely with JWT-based authentication.
- **Job Management:** Create, view, update, and delete job applications.
- **Status Tracking:** Track job status as "pending", "interview", or "declined".
- **Protected Routes:** Only authenticated users can access and manage their jobs.
- **Responsive UI:** Built with React, React Router, and Bootstrap for a modern user experience.

## Tech Stack

- **Frontend:** React, React Router, Bootstrap, Axios, Vite
- **Backend:** Node.js, Express, Mongoose, MongoDB, JWT, bcryptjs
- **Other:** dotenv, CORS, express-async-errors

## Project Structure

```
job-manager/
│
├── frontend/   # React app (Vite)
│   └── src/
│       ├── pages/         # Main pages (Login, Signup, Dashboard, etc.)
│       ├── components/    # Reusable UI components
│       └── router.jsx     # App routes
│
└── backend/    # Node.js/Express API
    ├── controllers/   # Route logic for jobs and auth
    ├── models/        # Mongoose models (User, Job)
    ├── routes/        # API endpoints
    ├── middlewares/   # Error handling, authentication
    └── db/            # Database connection
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)

### Setup

#### 1. Clone the repository

```bash
git clone <repo-url>
cd job-manager
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:

```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:3000`.

#### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` (default Vite port).

## API Endpoints

- `POST /api/v1/auth/register` – Register a new user
- `POST /api/v1/auth/login` – Log in and receive a JWT
- `GET /api/v1/jobs` – Get all jobs for the authenticated user
- `POST /api/v1/jobs` – Create a new job
- `GET /api/v1/jobs/:id` – Get a specific job
- `PATCH /api/v1/jobs/:id` – Update a job
- `DELETE /api/v1/jobs/:id` – Delete a job

## License

This project is licensed under the ISC License.
