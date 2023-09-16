import { Result } from "../../../shared/contracts/result.contracts";
import { UseCase } from "../../../shared/contracts/usecase.contracts";
import { RedisRepository } from "../../../shared/database/repositories/redis.repository";
import { Response } from "../../../shared/utils/response.adapter";
import { UserRepository } from "../../user/repositories/user.repository";
import { ErrandRepository } from "../repositories/errand.repository";

interface GetParams {
  userId: string;
  idErrand: string;
}

export class GetErrandUseCase implements UseCase {
  public async execute(params: GetParams): Promise<Result> {
    const cacheRepository = new RedisRepository();
    const getErrandCached = cacheRepository.get(`Recados - ${params.idErrand}`);

    if(getErrandCached){
        return Response.success("Recados do usuario encontrado - (cache)", getErrandCached)
    }

    const repositoryUser = new UserRepository();
    const user = repositoryUser.getById(params.userId);

    if (!user) {
      return Response.notFound("User");
    }

    const repository = new ErrandRepository();
    const getErrand = await repository.getByIdErrand(params.idErrand);

    if (!getErrand) {
      return Response.notFound("Recado");
    }

    const getErrandStringfy = JSON.stringify(getErrand)
    await cacheRepository.setEx(`Recados - ${params.idErrand}`, 3600, getErrandStringfy);


    return Response.success("Recado do usuario encontrado", getErrand);
  }
}
