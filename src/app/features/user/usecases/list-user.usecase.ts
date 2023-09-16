import { Result } from "../../../shared/contracts/result.contracts";
import { UseCase } from "../../../shared/contracts/usecase.contracts";
import { RedisRepository } from "../../../shared/database/repositories/redis.repository";
import { Response } from "../../../shared/utils/response.adapter";
import { UserRepository } from "../repositories/user.repository";

export class ListUserUseCase implements UseCase {
  public async execute(): Promise<Result> {
    const cacheRepository = new RedisRepository();
    const userCached = cacheRepository.get('Users');

    if(userCached){
      return Response.success("List users was successfully", userCached);
    }
    const repository = new UserRepository();
    const result = await repository.listAllUsers();

    if (result.length === 0) {
      return Response.notFound("List user");
    }

    const userStringfy = JSON.stringify(result);
    
    await cacheRepository.set('Users', userStringfy);

    return Response.success("List users was successfully", result);
  }
}
