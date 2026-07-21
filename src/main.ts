import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  //swagger
  const config = new DocumentBuilder()
    .setTitle('TODOs API')
    .setDescription('The Todo API description')
    .setVersion('1.0')
    .addTag('todos') // add path prefix for all endpoints in this tag
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
