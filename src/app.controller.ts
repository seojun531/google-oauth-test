import { Controller, Get,
  Body,Post,Param,Put,Delete
 } from '@nestjs/common';
import { AppService } from './app.service';
import { Render } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/home/:email')
    @Render('home')
    createSuccess(@Param('email') email:string){
        return {title:'로그인성공',email}
    }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
