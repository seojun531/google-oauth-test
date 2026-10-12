import { Controller,Post,Body,Get,Request,Response ,UseGuards} from '@nestjs/common';
import { CreateUserDto } from '../user/user.dto';
import { AuthService } from './auth.service';
import { LoginGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService ){}

    @Post('register')
    async register(@Body() userDto:CreateUserDto){
        return await this.authService.register(userDto)
    }

    @Post('login')
    async login(@Request() req:any,@Response() res:any){
        const userInfo=await this.authService.validateUser(req.body.email,req.body.password)
        if(userInfo){
            res.cookie('login',JSON.stringify(userInfo),{
                httpOnly:false,
                maxAge:1000*60*60*24*7
            })
        }
        return res.send({message:'login success'})
    }
    @UseGuards(LoginGuard)
    @Post('login2')
    async login2(@Request() req:any,@Response() res:any){
        if(!req.cookies['login']&&req.user){
            res.cookie('login',JSON.stringify(req.user),{
                httpOnly:true,
                maxAge:1000*10
            })
        }
        return res.send({message:'login2 success'})
    }
    @Get('test-guard')
    testGuard(){
        return '로그인 시에만 이 글이 보입니다'
    }
}
