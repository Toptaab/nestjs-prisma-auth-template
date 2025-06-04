import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { AppExceptionFilter } from './common/filters/app-exception.filter';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load env file based on NODE_ENV
dotenv.config({
  path: path.resolve(
    process.cwd(),
    `.env.${process.env.NODE_ENV || 'development'}`,
  ),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const globalPrefix = 'api/v1';
  // ตั้งค่า prefix เช่น '/api/v1'
  app.setGlobalPrefix(globalPrefix);

  app.enableCors({
    origin: `http://localhost:${port}`, // 👈 your Swagger UI origin
    credentials: true, // 👈 this allows cookies
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unknown props
      forbidNonWhitelisted: true, // throws error on unknown props
      transform: true,
    }),
  );
  app.useGlobalFilters(new AppExceptionFilter());
  app.use(cookieParser());

  setupSwagger(app); // Swagger setup

  await app.listen(port);

  console.log('\n=====================================');
  console.log(`🚀 App is running at: http://localhost:${port}`);
  console.log(`📘 Swagger Docs:     http://localhost:${port}/docs`);
  console.log(`📡 API Prefix:       /${globalPrefix}`);
  console.log(`🌐 Environment:      ${process.env.NODE_ENV || 'development'}`);
  console.log('🚀 =====================================');
}
bootstrap();
