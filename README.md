# Transport Management System (TMS) – Backend

A backend service built with NestJS for managing transportation operations. This includes user management, vehicle and customer tracking, shipment coordination, and more.

---

## Features
- Authentication using JWT
- Role-based access control (RBAC)
- User & driver management
- Project & customer linking
- Vehicle & shipment item tracking
- Trip planning and coordination
- Import/export via Excel
- API documentation using Swagger

---

## Tech Stack
- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT + Bcrypt
- **Containerization**: Docker, Docker Compose
- **API Docs**: Swagger

---

## Getting Started

### Prerequisites
- Node.js >= 18.x
- Docker & Docker Compose

### Installation
```bash
git clone https://github.com/your-org/tms-backend.git
cd tms-backend
npm install
```
# If you encounter bcrypt issues, rebuild it:
npm rebuild bcrypt --build-from-source

### Environment Configuration
Create a `.env` file based on `.env.example`:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=tms
JWT_SECRET=super-secret
```

### Database Configuration
Example `docker-compose.yml` configuration for PostgreSQL:
```yml
version: '3.8'
services:
  postgres:
    image: postgres:latest
    container_name: tms-postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres      # Should match DATABASE_USER in .env
      POSTGRES_PASSWORD: postgres  # Should match DATABASE_PASSWORD in .env
      POSTGRES_DB: tms            # Should match DATABASE_NAME in .env
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Database Migration
```bash
# Generate a new migration
npm run migration:generate src/database/migrations/init

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

### Run with Docker
```bash
# Start PostgreSQL container
docker-compose up -d

# Stop PostgreSQL container
docker-compose down
```

### Run with Docker
```bash
docker-compose up -d
```

### Run in Dev Mode
```bash
npm run start:dev
```

### API Documentation
Visit [http://localhost:3000/api](http://localhost:3000/api) for Swagger UI.

---

## Project Structure
```
src/
├── auth/              # Authentication & authorization
├── users/             # User management
├── roles/             # Role management
├── customers/         # Customer management
├── vehicles/          # Vehicle management
├── projects/          # Project management
├── trips/             # Trip management
├── dispatch/          # Dispatch operations
├── hubs/              # Hub management
├── ship-to/           # Shipping destinations
├── shipment-items/    # Shipment items handling
├── shipping-orders/   # Shipping orders management
├── import/            # Import functionality
├── export/            # Export functionality
├── common/            # Shared utilities
├── app.module.ts      # Root module
├── main.ts            # Application entry point
```

---

## Scripts
```bash
# Run app
yarn start

# Run in watch mode
yarn start:dev

# Build
yarn build

# Lint
yarn lint

# Test
yarn test
```

---

## License
This project is licensed under the MIT License.

