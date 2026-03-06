# YouTube Clone - MERN Stack

A full-stack YouTube Clone built using the MERN stack (MongoDB, Express.js, React.js, Node.js).  
This project replicates core functionalities of YouTube such as browsing videos, creating channels, uploading videos, and watching content.

The goal of this project is to demonstrate full-stack web development using modern technologies and best practices including REST API architecture, JWT authentication, and modular project structure.

Project Repository  
https://github.com/sartaza123/Youtube-clone---MERN

## Project Presentation Summary Video

https://drive.google.com/file/d/1bl_CPjA1KTuzlvHfPnpGv2ck1GNED6Wh/view?usp=drivesdk

---

PROJECT DETAILS

This project is a simplified implementation of the YouTube platform.  
Users can browse videos, create their own channels, upload content, and watch videos through a responsive interface.

The frontend is built using React and Tailwind CSS, while the backend is developed with Node.js and Express.js connected to MongoDB.

The application demonstrates complete frontend–backend integration and follows a modular architecture for scalability and maintainability.

---

TECHNOLOGIES USED

Frontend  
React.js  
React Router DOM  
Axios  
Tailwind CSS  
React Icons  
Vite

Backend  
Node.js  
Express.js  
MongoDB  
Mongoose  
JSON Web Token (JWT)  
Multer

Development Tools  
Git  
GitHub  
Nodemon  
Postman

---

FEATURES

Authentication  
User registration and login  
JWT based authentication  
Protected routes

Channel System  
Create channel  
Channel profile page  
Channel avatar and banner

Video System  
Upload videos  
Upload thumbnails  
Watch video page  
Video metadata stored in MongoDB

User Interface  
Responsive layout  
Video cards similar to YouTube  
Channel avatar display  
Filter bar for categories  
Navigation header

Backend API  
RESTful API architecture  
Secure middleware for authentication  
MongoDB models and schema relations  
File upload management

---

FOLDER STRUCTURE

ROOT STRUCTURE

```
Youtube-clone---MERN
│
├── client
│   └── React Frontend Application
│
├── server
│   └── Node.js Express Backend
│
├── README.md
└── package.json
```

CLIENT STRUCTURE (Frontend)

```
client
│
├── public
│
├── src
│
│   ├── components
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── VideoCard.jsx
│   │   └── FilterBar.jsx
│
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── VideoPage.jsx
│   │   ├── Channel.jsx
│   │   ├── CreateChannel.jsx
│   │   └── UploadVideo.jsx
│
│   ├── services
│   │   └── api.js
│
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── vite.config.js
```

SERVER STRUCTURE (Backend)

```
server
│
├── config
│   └── db.js
│
├── controller
│   ├── auth.controller.js
│   ├── video.controller.js
│   ├── channel.controller.js
│   └── comment.controller.js
│
├── models
│   ├── user.model.js
│   ├── video.model.js
│   ├── channel.model.js
│   └── comment.model.js
│
├── routes
│   ├── auth.routes.js
│   ├── video.routes.js
│   ├── channel.routes.js
│   └── comment.routes.js
│
├── middleware
│   └── auth.middleware.js
│
├── server.js
└── package.json
```

---

INSTALLATION AND SETUP

Clone the repository

```bash
git clone https://github.com/sartaza123/Youtube-clone---MERN.git
```

Navigate to the project directory

```bash
cd Youtube-clone---MERN-main
```

---

REQUIREMENTS

Install the following tools before running the project

Node.js  
npm  
MongoDB (Local or MongoDB Atlas)  
Git

Check installed versions

```bash
node -v
npm -v
git --version
```

---

SETUP ENVIRONMENT VARIABLES

Create a `.env` file inside the server directory

```bash
cd server
touch .env
```

Add the following configuration inside `.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

INSTALL DEPENDENCIES

Install backend dependencies

```bash
cd server
npm install express mongoose bcrypt jsonwebtoken multer cors dotenv
```

Install development dependency for server

```bash
npm install -D nodemon
```

Install frontend dependencies

```bash
cd ../client
npm install axios progressbar.js react-router-dom react-icons
```

---

RUN THE APPLICATION

Start Backend Server

```bash
cd server
npx nodemon server.js
```

Backend will run on

```
http://localhost:5000
```

Start Frontend

```bash
cd client
npm run dev
```

Frontend will run on

```
http://localhost:5173
```

---

API ENDPOINTS

Frontend communicates with backend using REST APIs

```
/api/auth
/api/videos
/api/channel
/api/comments
```

---

DEVELOPMENT TOOLS

Recommended tools

VS Code  
MongoDB Compass  
Postman for API testing

---

AUTHOR

Md Sartaz Ansari

GitHub  
https://github.com/sartaza123

---

LICENSE

This project is developed for educational and learning purposes.  
You are free to modify and use this project.

---

FUTURE IMPROVEMENTS

Video recommendation system  
Own Video Player
Subscriptions system  
Improved comments system  
Video streaming optimization  
Notifications system
