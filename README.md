# Express REST API Boilerplate

This boilerplate provides a foundation for building REST APIs using the Express.js framework. It includes essential features and a clean project structure to help you kickstart your API development process. If you intend to use this boilerplate for your project, make sure to follow the setup instructions below.

## Features

- `express` (v4.18.2) for handling routes and requests.
- Middleware setup for handling common tasks.
- Structured project directories based on best practices.
- `dotenv` (v16.3.1) for environment variable configuration.
- Basic authentication and user management routes.
- CORS configuration for handling cross-origin requests.
- OTP Validation using `redis` (v4.6.7) and `nodemailer` (v6.9.4) to send OTP codes to user's email.

### OTP Validation with Redis and Nodemailer

The boilerplate implements OTP validation using Redis as a caching layer and Nodemailer for sending OTP codes to user's email addresses. This feature enhances the security of your application by adding an extra layer of authentication.

### Pagination

All `findAll` requests are equipped with pagination to efficiently manage and present large sets of data. This helps improve the performance and user experience of your API, especially when dealing with a significant amount of

### API Documentation with Swagger

The boilerplate integrates Swagger for automatic API documentation. Swagger generates documentation from JSDoc comments in your code, simplifying the process of understanding and interacting with your API.

To access the Swagger documentation:

1. Run your application.

2. Navigate to the `/api-docs` endpoint (e.g., `http://localhost:5000/api-docs`) in your web browser.

This will open the Swagger UI interface, allowing you to explore your API endpoints, view request parameters, and test API functionality directly from the browser.

Ensure your `swagger.js` files accurately describe your API endpoints and their details.

Please note that this is a basic explanation of using Swagger with `swagger.js` files for API documentation.

## Project Structure

```text
app
  └ config                → Configuration files and settings related to the app
  └ db                    → Database-related files and scripts
    └ migrations          → Database migration scripts to evolve the schema
    └ models              → Database models and schemas
    └ seeders             → Seed data scripts to populate the database
  └ docs                  → Documentation files and resources
    └ swagger             → Swagger documentation for the API
      └ component         → Swagger components like schemas and parameters
      └ path              → API path definitions and operations
  └ src                   → Source code of the application
    └ controllers         → Route handlers and endpoint logic
    └ repositories        → Data access and database interaction
    └ routes              → Route definitions and API endpoints
    └ serializers         → Data serialization and transformation
    └ pkg                 → Application-wide packages and utilities
      └ middlewares       → Custom middleware functions
      └ helpers           → Reusable helper functions
    └ server.js           → Main application entry point
  └ uploads               → Storage for uploaded files and folders
  └ .dockerignore         → List of files and directories to exclude when building a Docker image
  └ .env.example          → Example environment variables configuration file. Duplicate this file to create your own .env file
  └ .gitignore            → List of files and directories to ignore when committing to the Git repository
  └ .sequelizerc          → Configuration file for Sequelize, an ORM for handling databases
  └ Dockerfile            → Configuration for building a Docker image
  └ LICENSE               → License file containing information about the project's licensing terms
  └ package.json          → Configuration file for Node.js project, including dependencies and scripts
  └ package-lock.json     → Auto-generated file that locks down the specific version of each dependency
```

## Tech Stack

The technology stack used in this boilerplate includes:

- `express` (v4.18.2) - A popular web application framework for handling routes and requests.
- `bcrypt` (v5.1.0) - A library for hashing passwords to securely store user data.
- `jsonwebtoken` (v9.0.1) - A package for creating and verifying JSON Web Tokens (JWT) for user authentication.
- `mongoose` (v5.13.5) - An ODM library for MongoDB, providing a convenient way to interact with the database.
- `dotenv` (v16.3.1) - A tool for loading environment variables from a `.env` file.
- `cors` (v2.8.5) - Middleware for handling Cross-Origin Resource Sharing, ensuring secure cross-origin requests.

In addition, this boilerplate uses the following dependencies for various functionalities:

- `http-status` (v1.6.2) - HTTP status codes for more descriptive response handling.
- `joi` (v17.9.2) - A validation library for JavaScript objects and schemas.
- `moment` (v2.29.4) - A library for handling dates and times.
- `morgan` (v1.10.0) - HTTP request logger middleware.
- `multer` (v1.4.5-lts.1) - Middleware for handling multipart/form-data, particularly used for file uploads.
- `nodemailer` (v6.9.4) - A library for sending emails.
- `pg` (v8.11.2) - A PostgreSQL database driver.
- `pg-hstore` (v2.3.4) - A module for serializing and deserializing JSON data to hstore format for PostgreSQL.
- `redis` (v4.6.7) - A library for using Redis as a data store.
- `sequelize` (v6.32.1) - An ORM for SQL databases, including PostgreSQL.
- `sequelize-cli` (v6.6.1) - The Command Line Interface for Sequelize, useful for database migrations and management.
- `swagger-jsdoc` (v6.2.8) - A tool to create Swagger/OpenAPI specifications from JSDoc comments.
- `swagger-ui-express` (v5.0.0) - Middleware to serve Swagger UI to visualize and interact with the API documentation.

Please refer to the `package.json` file for the most up-to-date version information of these dependencies.

## Environment Variables

The required environment variables are defined in the `.env` file. Make sure to duplicate the `.env.example` file, rename it to `.env`, and adjust the values as needed.

## Setup

To run the application, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/express-restapi-boilerplate.git
   ```

2. Navigate to the project directory:

   ```sh
   cd express-restapi-boilerplate
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Configure environment variables:

   - Duplicate .env.example and rename it to .env.
   - Adjust the values in the .env file as needed.

5. Launch the application with the following command:

   ```sh
   npm start
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
