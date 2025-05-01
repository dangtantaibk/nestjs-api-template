<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">My NestJS API Template</h1>

<p align="center">
A custom NestJS starter template for building robust and scalable APIs.
</p>

## Description

This repository serves as a personal template for quickly bootstrapping NestJS projects. It includes pre-configured modules, database integration, Docker setup, and common development tools.

## Features Included

This template comes pre-configured with the following features:

*   **Framework:** [NestJS](https://nestjs.com/) v11
*   **Database:** [PostgreSQL](https://www.postgresql.org/) integration using [TypeORM](https://typeorm.io/)
*   **Database Migrations:** TypeORM CLI configured for schema management.
*   **Configuration:** Environment variable management using `@nestjs/config`.
*   **Validation:** Request validation using `class-validator` and `class-transformer`.
*   **API Documentation:** [Swagger (OpenAPI)](https://swagger.io/) integration using `@nestjs/swagger`.
*   **Docker:** `Dockerfile` and `docker-compose.yml` for containerized development and deployment (includes NestJS app, PostgreSQL DB, and pgAdmin).
*   **Linting & Formatting:** ESLint and Prettier configured for code consistency.
*   **Testing:** Unit and E2E testing setup with Jest.
*   **Sample Modules:** Includes basic CRUD examples for `Orders`, `Subscriptions`, `Products`, and `BlogPosts`.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

This project uses [Jest](https://jestjs.io/) for unit and end-to-end (E2E) testing.

Unit tests focus on individual components (like services and controllers) in isolation, using mocks for dependencies.
E2E tests check the interaction between different parts of the application, typically by making actual HTTP requests to the running application.

```bash
# Run all unit tests
$ npm run test

# Run unit tests in watch mode (reruns on file changes)
$ npm run test:watch

# Run all E2E tests
$ npm run test:e2e

# Generate test coverage report
$ npm run test:cov
```

## Running the application with Docker

### Prerequisites

*   [Docker](https://www.docker.com/get-started) installed on your machine.

### Running the Database (PostgreSQL)

This application requires a PostgreSQL database. You can run one using Docker:

```bash
# Replace 'your_strong_password' with a secure password
docker run --name postgres-db -e POSTGRES_PASSWORD=your_strong_password -p 5432:5432 -v postgres_data:/var/lib/postgresql/data -d postgres
```

Make sure your application's database configuration (in `.env` file or `src/app.module.ts`) matches the database credentials (user: `postgres`, password: `your_strong_password`, database: `postgres`, host: `localhost`, port: `5432`).

### Building the Application Image

Navigate to the project root directory (where the `Dockerfile` is located) and run:

```bash
# Replace 'your-app-name' with a desired name for your image
docker build -t your-app-name .
```

### Running the Application Container

Once the image is built, you can run the application container:

```bash
# Replace 'your-app-name' with the name you chose during the build
# Replace 'your_strong_password' with the password used for the database
docker run --name your-app-container -p 3000:3000 \
  -e DB_HOST=host.docker.internal \ # Use host.docker.internal to connect to the host machine from the container (on Docker Desktop for Mac/Windows)
  -e DB_PORT=5432 \
  -e DB_USERNAME=postgres \
  -e DB_PASSWORD=your_strong_password \
  -e DB_DATABASE=postgres \
  -e PORT=3000 \
  -d your-app-name
```

**Notes:**

*   The `-p 3000:3000` maps port 3000 on your host to port 3000 in the container.
*   Environment variables (`-e`) are used to configure the database connection and application port within the container.
*   `host.docker.internal` is a special DNS name that resolves to the internal IP address used by the host (useful when the database is running directly on the host or in another container mapped to the host port). If your database container is on a custom Docker network, you might need to adjust `DB_HOST` to the database container's name or IP address on that network.
*   The application will be available at `http://localhost:3000`.

## Running the application with Docker Compose

This project includes a `docker-compose.yml` file to easily run the application, the PostgreSQL database, and pgAdmin (a database management tool) together.

### Prerequisites

*   [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.

### Configuration

1.  **(Optional but Recommended)** Create a `.env` file in the project root directory (`/Users/taidang/Documents/24h/backend`). Docker Compose will automatically load environment variables from this file.

    ```.env
    # Database Credentials
    DB_USERNAME=postgres
    DB_PASSWORD=your_secure_db_password # Change this!
    DB_DATABASE=db_24h
    # DB_PORT=5432 # Port for host mapping (if needed, but removed for security)

    # Application Port
    PORT=3000

    # pgAdmin Credentials & Port
    PGADMIN_EMAIL=admin@example.com # Change this
    PGADMIN_PASSWORD=your_secure_pgadmin_password # Change this
    PGADMIN_PORT=5050 # Host port to access pgAdmin
    ```

    *   If you don't create a `.env` file, the default values specified in `docker-compose.yml` will be used.
    *   **Important:** Ensure `DB_PASSWORD` and `PGADMIN_PASSWORD` are strong and secure.

### Running the Services

1.  Open your terminal in the project root directory.
2.  Run the following command:

    ```bash
    docker-compose up --build -d
    ```

    *   `up`: Creates and starts the containers defined in `docker-compose.yml`.
    *   `--build`: Builds the application image (`app` service) if it doesn't exist or if the source code/Dockerfile has changed.
    *   `-d`: Runs the containers in detached mode (in the background).

    This will start:
    *   The NestJS application (accessible at `http://localhost:3000` or your specified `PORT`).
    *   The PostgreSQL database (not directly accessible from the host).
    *   pgAdmin (accessible at `http://localhost:5050` or your specified `PGADMIN_PORT`).

### Accessing pgAdmin

1.  Open your web browser and navigate to `http://localhost:5050` (or the `PGADMIN_PORT` you set).
2.  Log in using the email (`PGADMIN_EMAIL`) and password (`PGADMIN_PASSWORD`) defined in your `.env` file (or the defaults).
3.  Add a new server connection inside pgAdmin:
    *   Go to `Object` -> `Register` -> `Server...`
    *   **General Tab:**
        *   Name: Give your connection a name (e.g., `Docker DB 24h`)
    *   **Connection Tab:**
        *   Host name/address: `db` (This is the service name of the database container in `docker-compose.yml`)
        *   Port: `5432`
        *   Maintenance database: `db_24h` (or the value of `DB_DATABASE`)
        *   Username: `postgres` (or the value of `DB_USERNAME`)
        *   Password: The password you set for `DB_PASSWORD`.
    *   Click `Save`.

You can now manage your PostgreSQL database through the pgAdmin web interface.

### Stopping the Services

To stop all the running containers defined in the `docker-compose.yml` file, run:

```bash
docker-compose down
```

This command stops and removes the containers, networks, and optionally volumes (use `docker-compose down -v` to remove volumes as well, **be careful as this deletes database data**).

## Database Migrations (TypeORM)

This project uses TypeORM migrations to manage database schema changes.

### Generating a Migration

After making changes to your entities (e.g., adding a new entity or modifying an existing one), you need to generate a migration file. Run the following command, replacing `YourMigrationName` with a descriptive name for your changes (e.g., `AddUserEmail`):

```bash
npm run migration:generate --name=YourMigrationName
```

This will create a new migration file in the `src/migrations` directory containing the SQL commands to update the database schema.

### Running Migrations

To apply all pending migrations (those that haven't been run yet) to the database, use:

```bash
npm run migration:run
```

This command should typically be run as part of your deployment process or after generating a new migration locally.

### Reverting a Migration

To undo the last applied migration, run:

```bash
npm run migration:revert
```

**Important:** Ensure your database container (if using Docker) is running before executing migration commands.

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## License

This project template is licensed under the MIT License. See the LICENSE file for details. (You might want to add a LICENSE file).
