import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm"
import { UserEntity } from "./user.entity";


@Entity("errand")

export class ErrandEntity{
    
   @PrimaryColumn("uuid")
   id!:string;
   
   @Column()
   title!: string;

   @Column()
   description!:string;

   @Column()
   type!: string

   @Column({
      name: "id_user"
   })
   idUser!: string;

   @ManyToOne(() => UserEntity)
   @JoinColumn({
      name: "id_user"

   })
   user!: UserEntity
  
}
