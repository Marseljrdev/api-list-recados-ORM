import { Errand, StatusErrand } from "../../../models/errand";
import { Request, Response } from "express";
import { HttpResponse } from "../../../shared/utils/http-response.adapter";
// Constants enumerating the HTTP status codes.
import { StatusCodes } from "http-status-codes";
import { UserRepository } from "../../user/repositories/user.repository";
import { ErrandRepository } from "../repositories/errand.repository";
import { CreateRecadosUseCase } from "../usecases/create-recados.usecase";
import { ListRecadosUseCase } from "../usecases/list-recados.usecase";
import { UpdateRecadosUseCase } from "../usecases/update-recados.usecase";
import { DeleteRecadosUseCase } from "../usecases/delete-recados.usecase";

export class ErrandController {
  public async criarRecado(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, description, type } = req.body;

      const usecase = new CreateRecadosUseCase();
      const result = await usecase.execute({
        userId,
        title,
        description,
        type,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public async listar(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { type } = req.body;

      const usecase = new ListRecadosUseCase();
      const result = await usecase.execute({ userId, type });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { userId, idErrand } = req.params;
      const { title, description, type } = req.body;

      const usecase = new UpdateRecadosUseCase();
      const result = await usecase.execute({
        userId,
        idErrand,
        title,
        description,
        type,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public async deletar(req: Request, res: Response) {
    try {
      const { userId, idErrand } = req.params;

      const usecase = new DeleteRecadosUseCase();
      const result = await usecase.execute({ userId, idErrand });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
