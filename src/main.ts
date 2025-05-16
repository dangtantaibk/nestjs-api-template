import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: new CustomLoggerService(),
  });

  // Global pipes
  app.useGlobalPipes(new ValidationPipe());

    // Configure payload size limits (prevents "Payload Too Large" errors)
  app.use(json({ limit: '30mb' }));  // Limits JSON payload size
  app.use(urlencoded({ limit: '30mb', extended: true }));  // Limits form data size

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('API Management System')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // CORS
  app.enableCors();

  // Use the PORT from environment variables
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation is available at: http://localhost:${port}/api`);
}
bootstrap();