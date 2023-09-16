import { UserRepository } from "../../user/repositories/user.repository";
import { ErrandController } from "../controller/errands.controller";
import { ErrandRepository } from "../repositories/errand.repository";
import { CreateRecadosUseCase } from "../usecases/create-recados.usecase";


export function errandRefactory() {
    const userSingleton = new UserRepository();
    const errandSingleton = new ErrandRepository();


    const usecase = new CreateRecadosUseCase(userSingleton, errandSingleton)

    return new ErrandController(usecase);
}