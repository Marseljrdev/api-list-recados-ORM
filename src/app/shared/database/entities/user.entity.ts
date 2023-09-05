import {Entity, PrimaryColumn, Column, OneToMany} from "typeorm"
import { ErrandEntity } from "./errand.entity";
@Entity("user")

export class UserEntity{
    
    @PrimaryColumn("uuid")
    id!:string;

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    password!:string

    @OneToMany(() => ErrandEntity, (errand) => errand.user )
    errand!: ErrandEntity[]
}