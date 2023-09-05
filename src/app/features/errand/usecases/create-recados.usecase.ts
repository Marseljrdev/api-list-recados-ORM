import { Errand } from "../../../models/errand";
import { Result } from "../../../shared/contracts/result.contracts";
import { UseCase } from "../../../shared/contracts/usecase.contracts";
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
    public async execute(params: CreateParams): Promise<Result>{
        const user = await new UserRepository().getById(params.userId);

        if (!user) {
          return Response.notFound("User");
        }
        const repository = new ErrandRepository()
        const newErrand = new Errand(params.title, params.description, params.type, user);
        const recado = await repository.criarRecado(newErrand);
  
        if(!recado){
          return Response.notFound("Recado")
        }

        return Response.success("Recado was created successfully", recado);
    }
}