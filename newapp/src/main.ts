import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS for frontend (React)
  app.enableCors({
    origin: 'http://localhost:3001', // React (Vite default port)
    credentials: true, // allow cookies / tokens
  });

  // ✅ Global validation pipe (for DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // block extra props
      transform: true,
    }),
  );

  await app.listen(3000);
  console.log('🚀 Server is running ');
}
bootstrap();
