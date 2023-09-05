import { Result } from "../../../shared/contracts/result.contracts";
import { UseCase } from "../../../shared/contracts/usecase.contracts";
import { Response } from "../../../shared/utils/response.adapter";
import { UserRepository } from "../repositories/user.repository";


export class ListUserUseCase implements UseCase {
    public async execute(): Promise<Result>{
        const repository = new UserRepository();
        const result = await repository.listAllUsers();
  
        if(result.length === 0){
          return Response.notFound("List user")
        };

        return Response.success("List users was successfully", result);
    }
}