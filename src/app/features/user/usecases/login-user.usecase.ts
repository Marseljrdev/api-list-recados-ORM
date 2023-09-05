import { Result } from "../../../shared/contracts/result.contracts";
import { UseCase } from "../../../shared/contracts/usecase.contracts";
import { Response } from "../../../shared/utils/response.adapter";
import { UserRepository } from "../repositories/user.repository";


interface LoginParams {
    email: string,
    password: string
}

export class LoginUserUseCase implements UseCase {
    public async execute(params: LoginParams): Promise<Result>{

        const repository = new UserRepository();

        const user = await  repository.login(params.email, params.password);
  
        if (!user) {
          return Response.invalidCredentials();
        }
  
        return Response.success("User is logged", user);
    }
}