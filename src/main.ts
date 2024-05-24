import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { MikroORM } from "@mikro-orm/core";
import { HttpErrorInterceptor } from "./core/interceptors/http/http-error.interceptor";
import * as express from "express";
import * as process from "node:process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new HttpErrorInterceptor());

  app.enableCors();
  app.setGlobalPrefix("api");
  app.use(express.json({ limit: '50mb' }));

  const orm = app.get(MikroORM);

  // Sincroniza el esquema de la base de datos con las entidades
  const generator = orm.getSchemaGenerator();
  await generator.updateSchema(); // O `await generator.createSchema();` para crear el esquema desde cero


  await app.listen(process.env.PORT || 3002);
}

bootstrap();
