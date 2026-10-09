import { Controller,Post,Body,Get } from '@nestjs/common';
import { CreateUserDto } from '../user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService ){}

    @Post('register')
    async register(@Body() userDto:CreateUserDto){
        return await this.authService.register(userDto)
    }
}
