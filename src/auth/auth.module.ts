import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports:[UserModule,PassportModule.register({session:true}),ConfigModule.forRoot()],
  providers: [AuthService,LocalStrategy,SessionSerializer,GoogleStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
