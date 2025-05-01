import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Import ValidationPipe
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Import Swagger

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS (optional, adjust as needed)
  app.enableCors();

  // Apply global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that do not have any decorators
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are provided
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('24h Backend API')
    .setDescription('API documentation for the 24h backend application')
    .setVersion('1.0')
    // Add JWT authentication to Swagger
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name will be used for @ApiBearerAuth() decorator
    )
    // Add tags for each module if desired
    .addTag('auth', 'Authentication endpoints')
    .addTag('orders')
    .addTag('subscriptions')
    .addTag('products')
    .addTag('blog-posts')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Setup Swagger UI at /api endpoint

  const port = process.env.PORT || 3100; // Changed default port to 3100
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/api`); // Log the Swagger UI URL
}
void bootstrap(); // Mark top-level async call as ignored
