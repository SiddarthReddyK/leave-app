Technology Stack (Minimized MERN Stack)
Overview

The EduLeave system is developed using a minimal MERN-based technology stack. The selected technologies are sufficient to satisfy all functional and non-functional requirements defined in the Product Requirements Document (PRD) and Design Document, while keeping the system simple, maintainable, and easy to implement.

This stack avoids unnecessary tools and focuses on core technologies required for a secure, role-based leave management system.

1. Frontend Technology Stack
   Framework

React.js

Used for building reusable user interface components

Supports dynamic dashboards and form-based interactions

Programming Language

JavaScript (ES6+)

Provides a unified language across the entire application

Reduces development complexity

Styling

Tailwind CSS

Utility-first CSS framework

Enables rapid development of clean and responsive UI layouts

Suitable for modern dashboard-style designs

Routing

React Router DOM

Manages navigation between application pages

Enables role-based and protected routing

API Communication

Fetch API

Native browser-based API for HTTP requests

Eliminates the need for external request libraries

2. Backend Technology Stack
   Runtime Environment

Node.js

JavaScript runtime for executing server-side code

Supports asynchronous and non-blocking operations

Framework

Express.js

Lightweight web framework for building RESTful APIs

Provides routing and middleware support

Authentication and Authorization

JSON Web Tokens (JWT)

Stateless authentication mechanism

Supports role-based access control for students, teachers, and administrators

Password Security

bcrypt

Secure password hashing and verification

3. Database Technology Stack
   Database

MongoDB

NoSQL document-oriented database

Stores user data, leave applications, and system records

Object Data Modeling

Mongoose

Schema definition and validation

Simplifies database operations

4. System Architecture

The system follows a three-tier architecture:

Presentation Layer

React.js with Tailwind CSS

Handles user interaction and UI rendering

Application Layer

Node.js with Express.js

Contains business logic, authentication, and authorization

Data Layer

MongoDB

Manages persistent storage of application data

5. Justification for Technology Selection

Single-language development using JavaScript

Minimal configuration and setup

Easy to implement and maintain

Suitable for academic evaluation and real-world usage

Supports scalability and future enhancements

6. Excluded Technologies

The following technologies were intentionally excluded to minimize complexity:

Redux (not required for limited state management)

Axios (Fetch API is sufficient)

Redis (no caching requirement)

GraphQL (REST APIs are sufficient)

Microservices architecture (monolithic design is adequate)

Conclusion

The minimized MERN technology stack provides a balanced approach, delivering all required functionalities while maintaining simplicity, clarity, and scalability. This makes it ideal for an engineering college leave management system such as EduLeave.
