# Todoist Server

This is a RESTful API server built to handle user authentication and manage todos for a Todo application. The server supports user sign-up, login, JWT-based authentication, and CRUD operations for todos.

## Features

- **User Authentication:**
  - User sign-up with encrypted passwords.
  - User login with JWT-based session tokens.
  - Middleware to protect routes.
  
- **Todo Management:**
  - Create, read, update, and delete todos.
  - Associate todos with specific users.
  - Authorization to ensure users can only manage their own todos.

## Prerequisites

Before setting up and running the project, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **MongoDB** (local or hosted on MongoDB Atlas)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/suraj946/todoist-server
   cd todoist-server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root of the project and add the following variables and check .env.sample for env variables:
   
   ```bash
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/todos_db  # Update with your MongoDB connection string
   JWT_SECRET=your_jwt_secret                      # Secret for signing JWT tokens
   ```

4. **Run the server**:
   Start the server locally:
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:4000`.

## API Endpoints

### **Authentication Routes**

| Method | Endpoint         | Description                       | Body                             |
|--------|------------------|-----------------------------------|----------------------------------|
| POST   | `/api/v1/user/register`         | Register a new user               | `{ name, email, password }`      |
| POST   | `/api/v1/user/login`          | Log in an existing user           | `{ email, password }`            |

### **Todo Routes (Protected)**

All routes below require a valid JWT token.

| Method | Endpoint         | Description                       | Body                             |
|--------|------------------|-----------------------------------|----------------------------------|
| GET    | `/api/v1/todo/all`          | Get all todos for the logged-in user | N/A                              |
| POST   | `/api/v1/todo/create`          | Create a new todo                 | `{ title, description }`         |
| PUT    | `/api/v1/todo/single/:id`      | Update a todo                     | `{ title, description, status }` |
| DELETE | `/api/v1/todo/single/:id`      | Delete a todo                     | N/A                              |

### Authentication Example

To authenticate the user, include the token in the `Authorization` header:

```bash
Authorization: Bearer <token>
```

### Sample JWT Token Flow

1. **Signup**:
   - Send a `POST` request to `/register` with user credentials.
   - Receive a JWT token after registration.

2. **Login**:
   - Send a `POST` request to `/login` with user credentials.
   - Receive a JWT token upon successful login.

3. **Access Protected Routes**:
   - Use the JWT token to access protected routes by passing it in the `Authorization` header as shown above.

## Project Structure

```
.
├── src
│   ├── config            # Configuration settings (e.g., MongoDB connection)
│   │   └── db.js         # MongoDB connection setup
│   ├── controllers       # Logic for handling requests and responses
│   ├── middleware        # Authentication middleware (JWT validation)
│   ├── models            # MongoDB models (User, Todo)
│   ├── routes            # API routes definitions
│   ├── utils             # Helper functions (error handling, etc.)
│   ├── app.js            # Express application setup
│   └── index.js          # Server entry point
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation

```

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing user and todo data.
- **Mongoose**: ODM for MongoDB, used for modeling and managing data.
- **JWT (JSON Web Tokens)**: For securing endpoints and user sessions.
- **Bcrypt.js**: For hashing passwords securely.

## Development

- Run the server in development mode:
  ```bash
  npm run dev
  ```
- Run tests (if applicable):
  ```bash
  npm test
  ```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.


This `README.md` provides an overview of your Todo server, describes its functionality, lists available API endpoints, and offers installation instructions. Feel free to modify it to match any specific details of your project.