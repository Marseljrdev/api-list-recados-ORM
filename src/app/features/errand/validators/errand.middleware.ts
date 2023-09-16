import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../../shared/utils/http-response.adapter";
import { Errand, StatusErrand } from "../../../models/errand";
import { JwtServices } from "../../../shared/services/jwt.services";

export class ErrandMiddleware {
  public static validateFieldsCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { title, description, type } = req.body;

      if (!title) {
        return HttpResponse.fieldNotProvided(res, "Title");
      }

      if (!description) {
        return HttpResponse.fieldNotProvided(res, "Description");
      }

      if (!type) {
        return HttpResponse.fieldNotProvided(res, "Type");
      }

      const allowedTypes = Object.values(StatusErrand);

      if (!allowedTypes.includes(type)) {
        return HttpResponse.invalid(res, "Type");
      }

      next();
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public static checkErrandToken(
    req: Request,
    res: Response,
    next: NextFunction
  ){
    try {
      const token = req.headers.authorization;

      const jwtservices = new JwtServices();
      const result = jwtservices.decodeToken(token as string);

      if(result){
        return HttpResponse.notFound(res, "Recados");
      }

      next();
      
    } catch (error) {
      return HttpResponse.genericError(res, error);
    }
  }
}
