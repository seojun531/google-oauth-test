import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User} from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>
    ){}
    
    createUser(user:CreateUserDto):Promise<User>{
        return this.userRepository.save(user)
    }

    async getUser(email:string){
        const result=await this.userRepository.findOne({where:{email}})
        return result
    }
    
    async updateUser(email:string,_user:UpdateUserDto){
       const user =await this.getUser(email)
       if (!user) {
        console.log('유저를 찾을 수 없습니다.');
        return; // 필요시 throw new Error('User not found');
  }
       console.log(_user)
       user.username=_user.username
       user.password=_user.password
       user.updatedDt=new Date()
       console.log(user)
       this.userRepository.save(user)
    }
    deleteUser(email:any){
        return this.userRepository.delete({email})
    }
}
