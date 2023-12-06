# Capstone-backend

# README for Connect_workhub

## Introduction

Welcome to Connect_workhub, a backend project designed to revolutionize the way customers and workers connect for household and small-scale tasks. Utilizing a robust stack of Node.js, Express, PostgreSQL, and Sequelize, this project serves as the backbone for a mobile app platform that efficiently bridges the gap between those needing services and those offering them.

## Features

- **User Profiles**: Separate registration and login facilities for customers and workers.
- **Job Posting and Browsing**: Customers can post tasks, and workers can browse through them based on categories, location, or other filters.
- **Booking System**: An intuitive interface for customers to book workers and for workers to accept or decline job offers.
- **Ratings and Reviews**: Both parties can rate and review each other post-completion of a task.
- **Notifications**: Real-time updates for job postings, acceptances, and reminders.
- **Dashboard**: Comprehensive dashboard for users to manage their profiles, posts, and financial transactions.

## Technologies Used

- **Node.js**: For building a fast and scalable server-side network application.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Sequelize**: A promise-based Node.js ORM for PostgreSQL, MySQL, MariaDB, SQLite, and Microsoft SQL Server.

## Getting Started

1. **Prerequisites**
   - Install Node.js and npm.
   - Setup PostgreSQL database.

2. **Installation**
   - Clone the repo: `git clone`
   - Install NPM packages: `npm install`
   - Create a `.env` file and configure your database settings and other environment variables.

3. **Running the Application**
   - Run `npm start` to start the server.
   - The application should now be running on `localhost:3000`.

## API Endpoints

   - http://localhost:3000/auth/signup/step1
   - http://localhost:3000/auth/signin
   - http://localhost:3000/auth/signup/step2
   - http://localhost:3000/auth/signup/step3
   - http://localhost:3000/auth/signup/step4
   - http://localhost:3000/dashboard/customer
   - http://localhost:3000/dashboard/worker
   - http://localhost:3000/post
   - http://localhost:3000/post/search/cleaning
   - http://localhost:3000/auth/update-profile
   - http://localhost:3000/auth/update-profile
   - http://localhost:3000/dashboard/search-workers/carpenter
   - http://localhost:3000/requests/create
   - http://localhost:3000/requests/list/user
   - http://localhost:3000/auth/profile


## Deployment

   - https://connect-hub-backend.onrender.com

## Contributing

   - Contribute to this project, if applicable.

## License

   - MIT

---

This README provides a comprehensive overview of Connect_workhub, focusing on its purpose, features, and how to get started. Happy Coding!
