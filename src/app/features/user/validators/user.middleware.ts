import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpResponse } from "../../../shared/utils/http-response.adapter";
import { JwtServices } from "../../../shared/services/jwt.services";

export class UserMiddleware {
  public static validateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ ok: false, message: "Id was not found" });
      }
      next();
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public static validateUserEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email } = req.body;

      if (!email) {
        return HttpResponse.fieldNotProvided(res, "E-mail");
      }

      next();
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public static validateUserPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { password } = req.body;

      if (!password) {
        return HttpResponse.fieldNotProvided(res, "Password");
      }

      next();
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public static checkToken(req: Request, res: Response, next: NextFunction){
    try {
      //VERIFICAR SE O TOKEN FOI INFORMADO
      const token = req.headers.authorization;

      if(!token){
        return HttpResponse.invalidCredentials(res);
      }

      const jwtservices = new JwtServices();

      //VERIFICAR SE O TOKEN É VALIDO
      const isValid = jwtservices.verifyToken(token);

      if(!isValid){
        return HttpResponse.invalidCredentials(res);
      }

      next();
      
    } catch (error) {
      return res.status(500).send({
        success: false,
        error: error
      })
    }
  }
}
