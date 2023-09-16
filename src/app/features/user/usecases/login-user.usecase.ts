import { Result } from "../../../shared/contracts/result.contracts";
import { UseCase } from "../../../shared/contracts/usecase.contracts";
import { JwtServices } from "../../../shared/services/jwt.services";
import { Response } from "../../../shared/utils/response.adapter";
import { UserRepository } from "../repositories/user.repository";

interface LoginParams {
  email: string;
  password: string;
}

export class LoginUserUseCase implements UseCase {
  public async execute(params: LoginParams): Promise<Result> {
    const repository = new UserRepository();

    const user = await repository.login(params.email, params.password);

    if (!user) {
      return Response.notFound("user");
    }

    if(user.password !== params.password) {
        return Response.invalidCredentials();
    }

    const token = new JwtServices().createToken(user.toJson);

    return Response.success("User is logged", { ...user.toJson(), token });
  }
}
