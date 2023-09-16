import { Result } from "../../../shared/contracts/result.contracts";
import { UseCase } from "../../../shared/contracts/usecase.contracts";
import { RedisRepository } from "../../../shared/database/repositories/redis.repository";
import { Response } from "../../../shared/utils/response.adapter";
import { UserRepository } from "../../user/repositories/user.repository";
import { ErrandRepository } from "../repositories/errand.repository";

interface DeleteParams {
    userId: string,
    idErrand: string
}

export class DeleteRecadosUseCase implements UseCase {
    public async execute(params: DeleteParams): Promise<Result>{
        const user = await new UserRepository().getById(params.userId);

        if (!user) {
          return Response.notFound("User");
        }
  
        const errandRepository = new ErrandRepository();
        const delitedErrands = await errandRepository.delete(params.idErrand);
  
        if (delitedErrands === 0) {
          return Response.notFound("Errand");
        }

        await new RedisRepository().delete(`recados - ${params.idErrand}`);
  
        const errands = await errandRepository.listErrands({
          userId: params.userId
        });

        return Response.success("Recados deleted was successfully", errands);
  
    }
}