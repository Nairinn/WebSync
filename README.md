WebSync - Real-time Collaborative Code Editor
WebSync is a real-time collaborative code editing application with an integrated chat system. It allows multiple users to simultaneously edit code and communicate through a chat interface.

Features:
Real-time collaborative code editing using Monaco Editor
Live chat functionality
Multiple user support
Syntax highlighting for JavaScript
Real-time code synchronization between users

Prerequisites
Before you begin, ensure you have the following installed:

Java JDK 8 or higher
Node.js 14 or higher
Maven
npm (comes with Node.js)

Project Structure
websync/
├── websync-backend/    # Spring Boot backend
└── websync-frontend/   # React frontend make sure to create front-end folder and add the files into there

Installation and Setup
1. Clone the Repository
cd websync
2. Backend Setup
cd websync-backend

# Install Maven dependencies and start the server
mvn spring-boot:run
The backend server will start on http://localhost:8080
3. Frontend Setup
Open a new terminal and:
cd websync-frontend

# Install dependencies
npm install

# Start the development server
npm start
The frontend application will start on http://localhost:3000

Usage:
Open http://localhost:3000 in your browser
Enter a username to join
Start coding in the editor
Use the chat panel to communicate with other users

Development
Backend (Spring Boot)
The backend is built with:

Spring Boot 2.7.0
WebSocket support
JPA
Lombok

Key components:

WebSocketConfig.java: WebSocket configuration
ChatController.java: Message handling
Message.java: Data model

Frontend (React)
The frontend uses:

React 18
Monaco Editor
SockJS
STOMP.js

Key components:

App.js: Main application component
CodeEditor.js: Monaco editor integration
Chat.js: Chat functionality

Troubleshooting
Common Issues

Port Conflicts

Backend port 8080 already in use:
bashCopy# Change port in application.properties
server.port=8081

Frontend port 3000 in use:
bashCopy# React will automatically suggest an alternative port



WebSocket Connection Failed

Verify backend is running
Check CORS configuration in WebSocketConfig.java
Ensure frontend WebSocket URL matches backend port


Dependencies Issues
bashCopy# Clean and rebuild backend
mvn clean install

# Clean and reinstall frontend dependencies
rm -rf node_modules
npm install


Running in Production
Backend
bashCopy# Create JAR file
mvn clean package

# Run JAR file
java -jar target/websync-backend-1.0-SNAPSHOT.jar
Frontend
bashCopy# Create production build
npm run build

# Serve using a static server
npx serve -s build
