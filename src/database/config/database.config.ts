import { DataSource } from "typeorm";
import * as dotenv from "dotenv"
import { ErrandEntity } from "../entities/errand.entity";
import { UserEntity } from "../entities/user.entity";

dotenv.config()

const config = new DataSource({
    type: "postgres",
    port: 5432,
    url: process.env.URL,
    
    ssl: {
        rejectUnauthorized:false
    },
    synchronize: false,

    schema:"BancoTrabalhoFinal",

   
    // entities:[UserEntity,ErrandEntity],
    entities:["src/database/entities/**/*.ts"],
    migrations:["src/database/migrations/**/*.ts"],



})

export default config