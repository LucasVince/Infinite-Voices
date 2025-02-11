<h1 align="center">🎆 Infinite Voices 🎆</h1>

<br>

![Image](https://github.com/user-attachments/assets/4bdba1b7-2906-467a-94c9-d9a6705afb71)
---

## 🎉 What is **Infinite Voices**?  

**Infinite Voices** is an **interactive** and **highly scalable** forum designed to provide an exceptional user experience. 🚀  

- Built using **TypeScript** — the language taking the development world by storm! 🏆  
- **TypeScript** provides the **safety** and **efficiency** you need with static typing, enabling rapid development and bug-free code. ✨  
- This project demonstrates our expertise with **TypeScript** and cutting-edge technologies. With **TypeScript**, we’ve created a highly scalable and maintainable forum, proving that it can power robust and modern systems. 💡  <br><br>

---

## 📂 Directory Structure  

The project is organized as follows:

```plaintext
Infinite Voices/
├── dist/
│ ├── client/
│ │ ├── pages/
│ │ │ ├── Configs/ # Configuration pages or settings
│ │ │ ├── Credits/ # Credits page for developers or contributors
│ │ │ ├── Home/ # Homepage for the forum
│ │ │ ├── Login/ # Login page for user authentication
│ │ │ ├── Perfil/ # User profile page
│ │ │ │ ├── Perfil.html # HTML structure for the profile page
│ │ │ │ └── script.js # JavaScript for interactivity in the profile page
│ │ │ ├── Post/ # Page for creating and viewing posts
│ │ │ ├── Register/ # Registration page for new users
│ │ │ ├── Topics/ # Topics overview page
│ │ │ │ └── script.js # JavaScript for handling topic interactions
│ │ │ └── style.css # Global CSS styles for all pages
├──src/
│ ├── server/
│ │ ├── DB/
│ │ │ └── models/
│ │ │ ├── post.model.ts # Defines the MongoDB schema for posts
│ │ │ ├── user.model.ts # Defines the MongoDB schema for users
│ │ │ └── connect.ts # Handles MongoDB connection logic
│ │ ├── modules/
│ │ │ ├── serverExpress.ts # Express.js server setup and configurations
│ │ │ └── index.ts # Entry point for the server modules
├── .env.example # Example file for environment variables
├── main.js # Main file for running the application
├── package.json # Contains project metadata and dependencies
├── package-lock.json # Lockfile for exact dependency versions
├── README.md # Project documentation (this file)
└── tsconfig.json # TypeScript configuration file
```


---

## 🚀 Features  

- **Live Chat** 💬:  
  - Created with **Socket.io** and **Node.js** for flawless real-time communication.  
  - Offers instant messaging and smooth interactions among users.  
- **Interactive Forum** 🌐:  
  - Powered by **Node.js** and **TypeScript**, providing the best user interaction experience.  
  - Includes features like posts, comments, and reactions to engage users.  
- **Scalability** 🔝:  
  - Built with **TypeScript** and robust tools, the forum is designed to scale and support an infinite number of users and posts. 🚀  
  - Scalable architecture ensures smooth performance under high traffic.  
- **Cutting-Edge Technology** 💡:  
  - **TypeScript** ensures clean, maintainable, and efficient code.  
  - Implements the latest industry standards for performance and reliability. 🐞  

---

## 🛠️ Skills & Technologies Used  

### **Languages & Frameworks**  
- **TypeScript** 💻:  
  - Combines the flexibility of JavaScript with the safety of strong typing.  
  - Enables faster development, reduces bugs, and ensures scalability.  
- **Node.js** 🚀:  
  - Backend powerhouse for building scalable, high-performance applications.  
  - Efficiently handles real-time data and multiple user interactions.  
- **Express.js** 🌐:  
  - Minimal and flexible Node.js framework for building RESTful APIs.  
  - Used to power communication between the front-end and back-end.  

### **Database**  
- **MongoDB** 💾:  
  - Non-relational database for flexible and scalable data storage.  
  - Optimized for handling large volumes of interactive data like posts and messages.  

### **Desktop Application**  
- **Electron** 🔲:  
  - Converts the web forum into a cross-platform desktop app.  
  - Offers a consistent user experience across Windows, Mac, and Linux.  

### **Real-Time Communication**  
- **Socket.io** 💬:  
  - Enables seamless and fast real-time communication for chat features.  
  - Highly reliable under different network conditions.  

---

## 🔒 Security & Performance  

### **Security**  
- Follows best practices to secure sensitive user data.  
- Implements authentication and authorization mechanisms.  
- Protects against common threats like SQL Injection, XSS, and CSRF.  

### **Performance**  
- Uses caching and compression for faster data delivery.  
- Optimized server responses to minimize latency.  
- Monitors resource usage to ensure smooth scaling.  

---

## 🔄 Development Workflow  
```bash
1. Planning 
- Define objectives, target audience, and requirements.  
- Select technologies such as **TypeScript**, **Node.js**, **MongoDB**, **Electron**, and **Socket.io**.  
```
```bash
2. Architecture
- Design the system's front-end (Electron), back-end (Node.js + Express.js), and database (MongoDB).  
- Ensure scalability by planning for future growth.  
```
```bash
3. Development  
- Set up the server and RESTful APIs using Node.js and Express.js.  
- Implement real-time chat with Socket.io.  
- Model database collections for users, posts, and chats.  
```
```bash
4. Testing
- Perform unit, integration, and security tests.  
- Optimize the system based on test results.  
```
```bash
5. Launch and Monitor 
- Deploy the platform and monitor performance.  
- Use analytics and user feedback to improve features.  
```
---

## 📈 Current Status  

The project is under **continuous development** 🚧, constantly improving with new features and adjustments.  

### Recent Updates:  
- Improved chat interface for smoother conversations.  
- Added notifications for real-time updates.  
- Enhanced database indexing for faster searches.  

### Future Plans:  
- Mobile app integration for iOS and Android.  
- Advanced user roles and permissions.  
- Support for multimedia posts like images and videos.  

---

# 🌐 API Routes - Infinite Voices

## 🏠 Root
### `GET /`
- **Description:** Main route of the application.
- **Response:**
```json
{
  "status": 200,
  "message": "Welcome"
}
```

---

## 👤 User Authentication

### `POST /register`
- **Description:** Registers a new user.
- **Request:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
- **Response:**
  - `200 OK`: Returns the token and user data.
```json
{
  "token": "string",
  "user": {
    "_id": "string",
    "username": "string",
    "email": "string"
  }
}
```
  - `400 Bad Request`: Missing information or user already exists.
```json
{
  "message": "Missing information or this email/username is already taken!"
}
```
  - `500 Internal Server Error`: Server error.

---

### `POST /login`
- **Description:** Logs in an existing user.
- **Request:**
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response:**
  - `200 OK`: Returns the token and user data.
```json
{
  "token": "string",
  "user": {
    "_id": "string",
    "username": "string",
    "email": "string"
  }
}
```
  - `404 Not Found`: User or password is incorrect.
```json
{
  "message": "User not found or incorrect password"
}
```
  - `500 Internal Server Error`: Server error.

---

### `POST /logout`
- **Description:** Logs out a user and invalidates their token.
- **Request:**
```json
{
  "token": "string"
}
```
- **Response:**
  - `200 OK`: Logout successful.
```json
{
  "message": "Logged out successfully"
}
```
  - `400 Bad Request`: Token is required.
```json
{
  "message": "Token is required"
}
```
  - `500 Internal Server Error`: Server error.

---

## 📝 Post Management

### `GET /posts`
- **Description:** Retrieves all registered posts.
- **Response:**
  - `200 OK`: List of posts.
```json
{
  "posts": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": {
        "_id": "string",
        "username": "string"
      },
      "tags": ["string"]
    }
  ]
}
```
  - `500 Internal Server Error`: Server error.

---

### `POST /posts`
- **Description:** Creates a new post.
- **Request:**
```json
{
  "title": "string",
  "message": "string",
  "user": {
    "_id": "string"
  },
  "tags": ["string"]
}
```
- **Response:**
  - `200 OK`: Post created successfully.
```json
{
  "post": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": "string",
    "tags": ["string"]
  }
}
```
  - `404 Not Found`: User not found.
```json
{
  "message": "User not found"
}
```
  - `500 Internal Server Error`: Server error.

---

## 🔐 Security Middleware

### Token Blacklist
- **Description:** Middleware to check if the token is blacklisted.
- **Error:**
  - `401 Unauthorized`: Token is blacklisted.
```json
{
  "message": "Token is blacklisted"
}
```

---

## 🚀 Startup
### Server
- **Port:** `8080`
- **Message:** `app running on port 8080`

---


## 📜 License  

This project is licensed under the **MIT License**. 📝  

---

## 🎯 Vision  

With **Infinite Voices**, we aim to:  
- Create a platform that fosters real-time communication ⚡.  
- Deliver unmatched scalability 🌱 to support millions of users.  
- Provide an engaging and intuitive user experience 🤝.  

```json
**Join us in building the future of interactive forums! 🚀**  
```

<br>

## 📃 Credits

### Contributors:

<div style="display: flex; justify-content: space-around;">
  <img src="https://github.com/GabrielNat1.png" alt="Colaborador 1" width="40" height="40">
  <img src="https://github.com/LucasVince.png" alt="Colaborador 2" width="40" height="40">
</div>

<br><br>

![Image](https://github.com/user-attachments/assets/171da039-5822-4054-b2fd-8c3017f6e100)
