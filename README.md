# ChatVerse

ChatVerse is a full-stack chat application developed using Spring Boot and React. It supports user authentication, group messaging, private messaging, and stores all chat history in a MySQL database.

The main objective of this project was to understand how client-server communication works and how a real-time chat application can be built using Java Socket Programming along with a modern web frontend.

## Features

- User registration and login
- JWT based authentication
- Password encryption using BCrypt
- Group chat
- Private one-to-one chat
- Online users list
- Messages stored in MySQL
- Clean and responsive React UI

## Tech Stack

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT
- MySQL
- Java TCP Sockets

### Frontend

- React
- Vite
- Axios
- Tailwind CSS

## Project Structure

```
ChatVerse
│
├── backend
├── chatverse-frontend
├── README.md
└── .gitignore
```

## How to Run

### Backend

Configure your MySQL database in `application.properties`.

Run the Spring Boot application.

The backend will start on:

```
http://localhost:8080
```

The TCP chat server runs on:

```
localhost:5000
```

### Frontend

```bash
cd chatverse-frontend
npm install
npm run dev
```

The frontend runs on:

```
http://localhost:5173
```

## Database

The application uses two tables:

- Users
- Messages

All chat messages are stored in MySQL so conversations remain available even after restarting the application.

<img width="1287" height="621" alt="image" src="https://github.com/user-attachments/assets/9d213de4-34d7-406a-953f-12e215b3a1c5" />


### Login

_Add screenshot_

### Group Chat

_Add screenshot_

### Private Chat

_Add screenshot_

## What I Learned

While building this project, I learned about:

- Spring Boot REST APIs
- JWT Authentication
- Spring Security
- Database integration using JPA
- Java Socket Programming
- Building a React frontend
- Connecting frontend with backend APIs
- Managing user authentication and chat history

## Future Improvements

Some features that can be added in the future:

- File sharing
- Emoji support
- Typing indicator
- Read receipts
- User profile pictures
- WebSocket based real-time communication

## Author

**Mayank Bhaiya**
