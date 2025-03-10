# Overview
Contains CineMax-Cinemas backend implementation which is designed to manage film screenings, ticket bookings, cancellations, and administrative reporting for a chain of cinemas. The system enables booking staff, admins, and managers to efficiently manage cinema operations.

## Features
### 1. User Management
Three user roles: Booking Staff, Admins, Managers.
Role-based authentication and authorization.
Secure login and session management using JWT Authorization.
### 2. Film Listings, Screening and Showtime Management
CRUD operations for films, screenings and show times.
Scheduling of films across multiple cinemas and screens.
Pricing system based on time of day and seating type.
### 3. Ticket Booking & Cancellation
Validates booking seats chosen.
### 4. Admin Panel
Add, update, and remove films and showtimes.
### 5. Manager Panel
Manage cinema locations and expand operations.
Oversee new listings and screen assignments.
### 6. Database Migrations
PRISMA ORM to manage migrations and create secure transactions.


## Tech Stack
Backend: Node.js(express)
Database: PostgreSQL
Authentication: JWT-based authentication
