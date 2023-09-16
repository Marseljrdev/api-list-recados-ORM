import { Errand } from "../../../models/errand";
import { Result } from "../../../shared/contracts/result.contracts";
import { UseCase } from "../../../shared/contracts/usecase.contracts";
import { RedisRepository } from "../../../shared/database/repositories/redis.repository";
import { Response } from "../../../shared/utils/response.adapter";
import { UserRepository } from "../../user/repositories/user.repository";
import { ErrandRepository } from "../repositories/errand.repository";

interface CreateParams {
    userId: string,
    title: string,
    description: string,
    type: any
}

export class CreateRecadosUseCase implements UseCase {
  //Injeção de dependencias
  constructor(private userRepository: UserRepository, private errandRepository: ErrandRepository) {}
  
    public async execute(params: CreateParams): Promise<Result>{
        const user = await this.userRepository.getById(params.userId);

        if (!user) {
          return Response.notFound("User");
        }
        const newErrand = new Errand(params.title, params.description, params.type, user);
        const recado = await this.errandRepository.criarRecado(newErrand);
  
        if(!recado){
          return Response.notFound("Recado")
        }

        const cacheRepository = new RedisRepository();

        const reacdoStringfy = JSON.stringify(recado);
        await cacheRepository.set('recados', reacdoStringfy);

        return Response.success("Recado was created successfully", recado);
    }
}