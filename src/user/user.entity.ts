import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id?:number
    @Column({unique:true})
    email:string
    @Column({nullable:true})
    password:string
    @Column()
    username:string
    @Column({type:'datetime',default:()=>'CURRENT_TIMESTAMP'})
    createdDt:Date=new Date()
    @Column({type:'datetime',nullable:true})
    updatedDt?:Date
    @Column({nullable:true})
    providerId:string


}
