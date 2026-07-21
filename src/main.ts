import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //valiudation global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove properties that do not have DTOS
      forbidNonWhitelisted: true, // throw an error if there are properties that do not have DTOS
      transform: true, // transform the payload to the DTO class
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
