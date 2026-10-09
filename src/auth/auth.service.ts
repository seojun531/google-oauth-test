import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async register(userDto: CreateUserDto) {
        const existingUser = await this.userService.getUser(userDto.email);
        if (existingUser) {
            throw new HttpException('해당 유저가 이미 있습니다', HttpStatus.BAD_REQUEST);
        }

        const encryptedPassword = bcrypt.hashSync(userDto.password, 10);
        const user = await this.userService.createUser({
            ...userDto,
            password: encryptedPassword,
        });

        const { password: _password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
