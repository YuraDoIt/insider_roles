import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const Port = process.env.PORT ? + process.env.PORT : 3000;

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: true, credentials: true });

  const config = new DocumentBuilder()
    .setTitle('Api Role system')  
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('roles users')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(Port);
  console.log(`Open localhost:${Port}/api`)
}
bootstrap();
