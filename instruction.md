Generate a new NestJS project configured to use PostgreSQL with TypeORM.

The project should include the following modules and features:

1.  **Database Configuration:**
    *   Set up TypeORM to connect to a PostgreSQL database. Include basic configuration in `app.module.ts` using `TypeOrmModule.forRootAsync` or `TypeOrmModule.forRoot`. Assume standard environment variables for connection details (e.g., `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`).

2.  **Order Module (`orders`):**
    *   Create an `Order` entity with fields: `id` (auto-increment, primary key), `name` (string), `phone` (string), `notes` (text, nullable), `productId` (integer, nullable, can be a simple ID for now), `createdAt` (timestamp with default value).
    *   Create a `CreateOrderDto` for request body validation (using `class-validator`) with fields: `name`, `phone`, `notes` (optional), `productId` (optional).
    *   Create an `OrdersController` with a POST endpoint `/orders` that accepts `CreateOrderDto` and uses the `OrdersService` to save the order.
    *   Create an `OrdersService` with a `create` method to save the order entity using the TypeORM repository.
    *   Register the module, controller, service, and entity.

3.  **Subscription Module (`subscriptions`):**
    *   Create a `Subscription` entity with fields: `id` (auto-increment, primary key), `email` (string, unique), `createdAt` (timestamp with default value).
    *   Create a `CreateSubscriptionDto` for request body validation with an `email` field (validate as a valid email address).
    *   Create a `SubscriptionsController` with a POST endpoint `/subscriptions` that accepts `CreateSubscriptionDto` and uses the `SubscriptionsService` to save the subscription. Handle potential unique constraint errors gracefully (e.g., return a conflict status).
    *   Create a `SubscriptionsService` with a `create` method.
    *   Register the module, controller, service, and entity.

4.  **Product Module (`products`):**
    *   Create a `Product` entity with fields: `id` (auto-increment, primary key), `name` (string), `description` (text), `price` (numeric/decimal), `imageUrl` (string, nullable), `category` (string), `createdAt` (timestamp), `updatedAt` (timestamp).
    *   Create `CreateProductDto` and `UpdateProductDto` for validation.
    *   Create a `ProductsController` with standard RESTful CRUD endpoints (POST `/products`, GET `/products`, GET `/products/:id`, PATCH `/products/:id`, DELETE `/products/:id`).
    *   Create a `ProductsService` with corresponding CRUD methods (`create`, `findAll`, `findOne`, `update`, `remove`).
    *   Register the module, controller, service, and entity.

5.  **Blog Module (`blog-posts`):**
    *   Create a `BlogPost` entity with fields: `id` (auto-increment, primary key), `title` (string), `content` (text), `author` (string), `slug` (string, unique), `category` (string), `imageUrl` (string, nullable), `createdAt` (timestamp), `updatedAt` (timestamp).
    *   Create `CreateBlogPostDto` and `UpdateBlogPostDto` for validation (ensure `slug` is generated or validated for uniqueness).
    *   Create a `BlogPostsController` with standard RESTful CRUD endpoints (POST `/blog-posts`, GET `/blog-posts`, GET `/blog-posts/:id`, PATCH `/blog-posts/:id`, DELETE `/blog-posts/:id`). Allow filtering GET `/blog-posts` by category via query parameter.
    *   Create a `BlogPostsService` with corresponding CRUD methods.
    *   Register the module, controller, service, and entity.

Ensure all necessary dependencies (`@nestjs/typeorm`, `typeorm`, `pg`, `class-validator`, `class-transformer`, `@nestjs/config`) are included in `package.json`. Provide the basic structure and imports for each generated file (`*.module.ts`, `*.controller.ts`, `*.service.ts`, `*.entity.ts`, `*.dto.ts`). Enable global validation pipe in `main.ts`.