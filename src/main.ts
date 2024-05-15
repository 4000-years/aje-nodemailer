import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser'; // You may need to install the body-parser package if not already included

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Increase request payload size
  app.use(bodyParser.json({ limit: '50mb' })); // Increase JSON payload size limit to 50mb
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Increase URL-encoded payload size limit

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(8888);
}

bootstrap();
