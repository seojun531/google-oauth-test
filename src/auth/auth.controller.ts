import { Controller,Post,Body,Get,Request,Response ,UseGuards} from '@nestjs/common';
import { CreateUserDto } from '../user/user.dto';
import { AuthService } from './auth.service';
import { LoginGuard,AuthenticatedGuard,LocalAuthGuard } from './auth.guard';
import { Render,Redirect } from '@nestjs/common';
import { title } from 'process';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService ){}
    @Get('/register')
        @Render('createUser')
        getUserInfo(){
            return {title:'회원가입'}
        }

    @Post('register')
    @Redirect('/auth/login3',303)
    async register(@Body() userDto:CreateUserDto){
         await this.authService.register(userDto)
         
         
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
    @Get('login3')
    @Render('login3')
    loginAttemp(){
        return {title:'로그인'}
    }
    @UseGuards(LocalAuthGuard)
    @Post('login3')
   
    login3(@Request() req:any, @Response() res:any){
        req.user
        const email=req.user.email
        res.redirect(303,`/home/${email}`)

    }
    @UseGuards(AuthenticatedGuard)
    @Get('test-guard2')
    testGuardWithSession(@Request() req:any){
        return req.user
    }
}
