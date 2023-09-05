import { Errand, StatusErrand } from "../../../models/errand";
import { Request, Response } from "express";
import { HttpResponse } from "../../../shared/utils/http-response.adapter";
// Constants enumerating the HTTP status codes.
import { StatusCodes } from "http-status-codes";
import { UserRepository } from "../../user/repositories/user.repository";
import { ErrandRepository } from "../repositories/errand.repository";

export class ErrandController {
  public async criarRecado(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, description, type } = req.body;

      const user = await new UserRepository().getById(userId);

      if (!user) {
        return res.status(400).send({
          success: false,
          message: "Erro ao criar recado"
        })
      }
      const repository = new ErrandRepository()
      const newErrand = new Errand(title, description, type, user);
      const recado = await repository.criarRecado(newErrand);

      if(!recado){
        return HttpResponse.notFound(res, "Erro a criar Recado")
      }

      return HttpResponse.success(
        res,
        "Errand was sucessfully created",
        newErrand.toJson()
      );
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public async listar(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { type } = req.body;

      let errands = await new ErrandRepository().listErrands({
        userId: userId,
        type: type as StatusErrand,
      });

      return HttpResponse.success(res, "Errands successfully listed", {
        errands: errands.map((errand) => errand.toJson()),
      });
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { userId, idErrand } = req.params;
      const { title, description, type } = req.body;

      const user = await new UserRepository().getById(userId);

      if (!user) {
        return HttpResponse.notFound(res, "User");
      }

      const errandRepository = new ErrandRepository();
      // tem que ser do tipo errand | undefined
      const errand = await errandRepository.getByIdErrand(idErrand);
      console.log(errand);

      if (!errand) {
        return HttpResponse.notFound(res, "Errand");
      }

    
      errand.title = title;
      errand.description = description;
      errand.type = type;

      const result = await errandRepository.update(errand);

      const errands = await errandRepository.listErrands({
        userId: userId,
        type: type as StatusErrand,

      });

      return HttpResponse.success(
        res,
        "Errand was successfully updated",
        errands.map((errand) => errand.toJson())
      );
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public async deletar(req: Request, res: Response) {
    try {
      const { userId, idErrand } = req.params;

      const user = await new UserRepository().getById(userId);

      if (!user) {
        return HttpResponse.notFound(res, "User");
      }

      const errandRepository = new ErrandRepository();
      const delitedErrands = await errandRepository.delete(idErrand);

      if (delitedErrands === 0) {
        return HttpResponse.notFound(res, "Errand");
      }

      const errands = await errandRepository.listErrands({
        userId,
      });

      return HttpResponse.success(
        res,
        "Errand successfully deleted",
        errands.map((errand) => errand.toJson())
      );
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
