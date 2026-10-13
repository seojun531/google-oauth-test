import { NestFactory } from '@nestjs/core';
import {  ValidationPipe } from '@nestjs/common';
import  cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import  session from 'express-session'
import passport from 'passport';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path'



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setViewEngine('hbs')
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
