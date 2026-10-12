import { NestFactory } from '@nestjs/core';
import {  ValidationPipe } from '@nestjs/common';
import  cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import  session from 'express-session'
import * as passport from 'passport'




async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    app.use(session({
      secret:'very-important-secret',
      resave:false,
      saveUninitialized:false,
      cookie:{maxAge:1000*60*60},
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
