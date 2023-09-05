import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { ApiResponse } from "../../../shared/utils/Api.response.adapter";
import { User } from "../../../models/user";


export class UserController {
  public async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const repository = new UserRepository();

      const validEmail = await repository.checkEmail(email);

      if (validEmail) {
        return ApiResponse.invalid(res, "E-mail");
      }

      const user = new User(name, email, password);
      const result = await repository.create(user);

      return ApiResponse.success(
        res,
        "User successufully created",
        result
      );
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }

  //ok
  public async listAllUsers(req: Request, res: Response) {
    try {
      const repository = new UserRepository();
      const result = await repository.listAllUsers();

      if(result.length === 0){
        return ApiResponse.notFound(res, "Lista de usuario vazia")
      };

      return ApiResponse.success(
        res,
        "Users were sucessfully listed",
        result.map((user) => user.toJson())
      );
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }

  // ok
  public async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const repository = new UserRepository();
      const result = await repository.getById(id);

      if (!result) {
        return ApiResponse.notFound(res, "User ");
      }

      return ApiResponse.success(res, "Login was successfuly",{
        data: result.toJson()
       });
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }

  // ok
  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const repository = new UserRepository();

      if (!email) {
        return ApiResponse.fieldNotProvided(res, "E-mail");
      }
      if (!password) {
        return ApiResponse.fieldNotProvided(res, "Password");
      }

      const user = await  repository.login(email,password);

      if (!user) {
        return ApiResponse.invalidCredentials(res);
      }

     

      return ApiResponse.success(res, "Login was successfuly",{
       data: user.toJson()
      });
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }
}
