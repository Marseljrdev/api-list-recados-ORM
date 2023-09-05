import { response } from "express";
import { User } from "../../../models/user";
import { Result } from "../../../shared/contracts/result.contracts";
import { UseCase } from "../../../shared/contracts/usecase.contracts";
import { Response } from "../../../shared/utils/response.adapter";
import { UserRepository } from "../repositories/user.repository";

interface CreateParams {
    name: string,
    email: string,
    password: string
}

export class CreateUserUseCase implements UseCase {
    public async execute(params: CreateParams): Promise<Result>{
        const repository = new UserRepository();

        const validEmail = await repository.checkEmail(params.email);
  
        if (validEmail) {
          return Response.invalid("E-mail ou password");
        }
  
        const user = new User(params.name, params.email, params.password);
        const result = await repository.create(user);

        return Response.success("User was created successfully", result);
    }
}