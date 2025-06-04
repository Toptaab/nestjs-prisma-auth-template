// src/swagger/swagger.config.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';

export function setupSwagger(app: INestApplication): void {
  // Main API options
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for My App')
    .setVersion('1.0')
    .addCookieAuth('access_token') // 👈 กำหนดชื่อ cookie ที่ใช้ auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
