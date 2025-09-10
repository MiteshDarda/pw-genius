import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable CORS for all origins
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://pw-genius.vercel.app', // Add your Vercel domain
      /\.vercel\.app$/, // Allow all Vercel subdomains
      '*', // Allow all origins as fallback
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders:
      'Content-Type, Accept, Authorization, ngrok-skip-browser-warning, X-Requested-With',
    exposedHeaders: 'ngrok-skip-browser-warning',
  });

  // Set global prefix
  app.setGlobalPrefix('api');

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get<number>('port');
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
