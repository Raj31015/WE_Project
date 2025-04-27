# MERN Stack Expense Tracker

A full-stack expense tracking application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Add, edit, and delete expenses
- Categorize expenses
- View expense summaries by category
- Responsive design for desktop and mobile

## Tech Stack

- **MongoDB** - Database
- **Express.js** - Backend framework
- **React** - Frontend library
- **Node.js** - Runtime environment
- **Bootstrap** - UI framework

## Installation

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or Atlas)

### Setup

1. Clone the repository:
```
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

2. Install dependencies for backend:
```
cd server
npm install
```

3. Install dependencies for frontend:
```
cd ../client
npm install
```

4. Create a `.env` file in the server directory and add:
```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## Running the Application

### Start the Backend Server

```
cd server
npm run dev
```

The server will run on http://localhost:5000

### Start the Frontend Development Server

```
cd client
npm start
```

The React app will run on http://localhost:3000

## API Endpoints

- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Add a new expense
- `PUT /api/expenses/:id` - Update an expense
- `DELETE /api/expenses/:id` - Delete an expense

## Usage

1. Navigate to http://localhost:3000 in your browser
2. Use the "Add Expense" button to add new expenses
3. View your expenses on the dashboard
4. Edit or delete expenses as needed

## License

MIT 