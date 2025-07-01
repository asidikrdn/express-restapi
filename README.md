# express-restapi

A boilerplate for developing RESTful APIs using Express.js and Sequelize ORM. This project provides a basic structure and essential features to help you quickly set up and start building your applications with Express.

## Main Features

- Modular and extensible folder structure
- Sequelize ORM for SQL database integration (PostgreSQL, MySQL, etc.)
- Database migrations with Sequelize CLI
- Utilities for environment, data formatting, and backoff
- Middleware for CORS, logging (morgan), JSON parsing, session, CSRF, and JWT authentication
- Example User model, migration, controller, and routes (public & protected)
- Example utility and test (Jest)
- Ready for Docker

## Folder Structure

```text
├── src/
│   ├── config/         # Database & dotenv configuration
│   ├── controllers/    # Express controllers
│   ├── middlewares/    # Express middlewares (auth, csrf, etc)
│   ├── migrations/     # Sequelize migration files
│   ├── models/         # Sequelize models
│   ├── routes/         # Route definitions (public/protected)
│   ├── utils/          # Utility/helper functions
│   └── server.js       # Application entry point
├── test/               # Unit tests (Jest)
├── .env.example        # Example environment file
├── Dockerfile          # Docker support
├── package.json        # npm configuration
└── ...
```

## Installation

1. Clone this repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.development.local` or `.env.production.local` as needed, then adjust the environment and database configuration accordingly.

## Environment Variables

See `.env.example` for all required variables. Important:\

- `JWT_SECRET` for JWT signing
- `SESSION_SECRET` for session security (use a long, random string)

## Database Migration

Run migrations to create tables in your database:

```bash
npm run dev:migrate:up
```

To rollback:

```bash
npm run dev:migrate:down
```

## Running the Application

Development mode (with nodemon):

```bash
npm run local:dev
```

Production mode:

```bash
npm start
```

## Testing

Run unit tests with Jest:

```bash
npm test
```

## Build & Deploy with Docker

Build the image:

```bash
docker build -t express-restapi .
```

Run the container:

```bash
docker run -p 5000:5000 --env-file .env express-restapi
```

## Route Structure

- **Public routes:** `/api/users/register`, `/api/users/login`
- **Protected routes:** `/api/users/me`, `/api/users`, `/api/users/:id` (require JWT in session, CSRF for state-changing requests)

## Security Notes

- Use strong, unique values for `JWT_SECRET` and `SESSION_SECRET` in production.
- Protected routes require authentication and CSRF protection.
- Never commit your real `.env` file to version control.

## License

[ISC License](LICENSE.md)

---

**Author:** Ahmad Sidik Rudini
