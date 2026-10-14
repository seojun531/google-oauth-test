import { Controller, Get,
  Body,Post,Param,Put,Delete,
  Render,
  Redirect,
  Response
 } from '@nestjs/common';
 import { UserService } from './user.service';
 import { User } from './user.entity';
 import { CreateUserDto,UpdateUserDto } from './user.dto';


@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    
    @Post('/create')
    @Redirect('/home',303)
    async createUser(@Body() user:CreateUserDto, @Response() res:any){
         await this.userService.createUser(user)
         
    }
    @Get('/userInfo/:email')
    @Render('user_info')
    async getUserInfo(@Param('email') email:string){
        const userInfo=await this.userService.getUser(email)
        
        return {userInfo}
        
    }

    @Get('/getUser/:email')
    async getUser(@Param('email') email:string){
        const user=await this.userService.getUser(email)
        console.log(user)
        return user
    }

    @Put('/update/:email')
    updateUser(@Param('email') email:string, @Body() user:UpdateUserDto){
        console.log(user)
        return this.userService.updateUser(email,user)
    }

    @Delete('delete/:email')
    deleteUser(@Param('email') email:string){
        return this.userService.deleteUser(email)
    }
    
}
