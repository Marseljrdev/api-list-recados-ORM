import { Result } from "../../../shared/contracts/result.contracts";
import { UseCase } from "../../../shared/contracts/usecase.contracts";
import { Response } from "../../../shared/utils/response.adapter";
import { UserRepository } from "../repositories/user.repository";


export class GetUserUseCase implements UseCase {
    public async execute(id: string): Promise<Result>{
        const repository = new UserRepository();
        const result = await repository.getById(id);
  
        if (!result) {
          return Response.notFound("User");
        }

        return Response.success("User was listed successfully", result);
    }
}