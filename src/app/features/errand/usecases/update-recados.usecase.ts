import { StatusErrand } from "../../../models/errand";
import { Result } from "../../../shared/contracts/result.contracts";
import { Response } from "../../../shared/utils/response.adapter";
import { UserRepository } from "../../user/repositories/user.repository";
import { ErrandRepository } from "../repositories/errand.repository";

interface UpdateParams {
    userId: string,
    idErrand: string,
    title: string,
    description: string,
    type: any
}

export class UpdateRecadosUseCase {
    public async execute(params: UpdateParams): Promise<Result> {
        const user = await new UserRepository().getById(params.userId);

        if (!user) {
          return Response.notFound("User");
        }
  
        const errandRepository = new ErrandRepository();
        // tem que ser do tipo errand | undefined
        const errand = await errandRepository.getByIdErrand(params.idErrand);
        console.log(errand);
  
        if (!errand) {
          return Response.notFound("Errand");
        }
  
        errand.title = params.title;
        errand.description = params.description;
        errand.type = params.type;
  
        const result = await errandRepository.update(errand);
  
        const errands = await errandRepository.listErrands({
          userId: params.userId,
          type: params.type as StatusErrand,
        });

        return Response.success("Recados was updated successfully", errands);
    }
}