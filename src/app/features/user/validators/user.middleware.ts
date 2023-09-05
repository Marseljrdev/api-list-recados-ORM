import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpResponse } from "../../../shared/utils/http-response.adapter";

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
}
