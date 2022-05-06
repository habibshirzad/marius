import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  

  const app = await NestFactory.create(AppModule, {logger: new Logger
  })
  app.useGlobalPipes(new ValidationPipe());


  await app.listen(3001);
}
bootstrap();
