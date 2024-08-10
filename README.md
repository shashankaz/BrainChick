# Online Quiz Application

This project is a MERN stack-based online quiz application that allows users to take quizzes and view their results. The application features a dynamic and interactive user interface powered by React and a backend built with Node.js, Express, and MongoDB. The application also integrates Firebase authentication for user registration and login, with the option to sign up using Google.

## Table of Contents

- [Online Quiz Application](#online-quiz-application)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Clone the Repository](#clone-the-repository)
    - [Install Dependencies](#install-dependencies)
    - [Set Up Environment Variables](#set-up-environment-variables)
    - [Run the Application](#run-the-application)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [Quiz](#quiz)
    - [Results](#results)

## Features

- **Quiz Functionality**: Users can take quizzes after log in.
- **Results Page**: Users can view their quiz results immediately after completing a quiz.
- **User Authentication**: Users can sign up and log in using Firebase authentication. Google sign-up is also available.
- **Responsive Design**: The application is fully responsive and works on various screen sizes.
- **Persistent Data**: Quiz results are saved to MongoDB and can be retrieved by their unique result ID.

## Tech Stack

- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: Firebase Authentication
- **Deployment**: Vercel

## Installation

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- Firebase Project (for authentication)

### Clone the Repository

```bash
git clone https://github.com/shashankaz/BrainChick.git
cd BrainChick
```

### Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Set Up Environment Variables

Create a `.env` file in the `server` directory with the following content:

```bash
PORT=3000
MONGO_URI=your_mongo_connection_string
```

Create a `.env` file in the `client` directory with the following content:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_id
VITE_BACKEND_URL=your_backend_url
```

### Run the Application

```bash
# Run the backend server
cd backend
npm start

# Run the frontend development server
cd ../frontend
npm run dev
```

The application should now be running on `http://localhost:5173` and the backend API on `http://localhost:3000`.

## Usage

- **Sign Up**: Create an account using email and password or sign up with Google.
- **Take a Quiz**: Navigate to the quiz and start a quiz.
- **View Results**: After completing a quiz, view your results on the results page.
- **Explore Without Signing In**: You can explore the quizzes without creating an account.

## API Endpoints

### Quiz

- `GET /api/quizzes`: Get a list of available quizzes
- `GET /api/quizzes/:id`: Get a quiz by ID
- `POST /api/quizzes`: Create a new quiz (Admin only)

### Results

- `POST /api/results`: Submit quiz results
- `GET /api/results/:id`: Get quiz results by ID
