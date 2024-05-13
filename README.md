# bearer-auth

**Author**: Amanda Mendoza
**Version**: 1.0.0 

## Overview
The authentication server now supports basic user account creation and authentication. It allows users to create new accounts and securely log in with their username and password. After a successful login, the server validates the credentials and authenticates the user. Following authentication, the server issues a JSON Web Token (JWT) as a signed token, which it sends back to the application. This token serves as evidence of authentication and is used for subsequent requests to securely access the application's protected resources.

## Getting Started
The server is initialized in src/server.js, which sets up middleware, routes, and starts the Express application.

![UML](./Screenshot%202024-05-12%20at%205.49.26 PM.png)