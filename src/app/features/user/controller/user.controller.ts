import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { HttpResponse } from "../../../shared/utils/http-response.adapter";
import { User } from "../../../models/user";
import { LoginUserUseCase } from "../usecases/login-user.usecase";
import { GetUserUseCase } from "../usecases/get-user.usecase";
import { ListUserUseCase } from "../usecases/list-user.usecase";
import { CreateUserUseCase } from "../usecases/create-user.usecase";

export class UserController {
  public async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const usecase = new CreateUserUseCase();
      const result = await usecase.execute({ name, email, password });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public async listAllUsers(req: Request, res: Response) {
    try {

      const token = req.headers.authorization;
      
      const usecase = new ListUserUseCase();
      const result = await usecase.execute();

      return res.status(result.code).send(result);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const usecase = new GetUserUseCase();
      const result = await usecase.execute(id);

      return res.status(result.code).send(result);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return HttpResponse.fieldNotProvided(res, "E-mail");
      }
      if (!password) {
        return HttpResponse.fieldNotProvided(res, "Password");
      }

      const usecase = new LoginUserUseCase();
      const result = await usecase.execute({
        email,
        password,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
