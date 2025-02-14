import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: true, credentials: true });

  const config = new DocumentBuilder()
    .setTitle('Registration system API documentation')  // Заголовок документації
    .setDescription('The API description')  // Опис документації
    .setVersion('1.0')
    .addTag('Users Events Participant')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const Port = process.env.PORT ? + process.env.PORT : 3000;
  await app.listen(Port);
  console.log(`Open localhost:${Port}/api`)
}
bootstrap();
