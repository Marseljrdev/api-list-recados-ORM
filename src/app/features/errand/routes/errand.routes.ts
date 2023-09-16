import { Router } from "express";
import { ErrandController } from "../controller/errands.controller";
import { errandRefactory } from "../util/errand.refactory";

export const ErrandRoutes = () => {
  const app = Router({
    mergeParams: true,
  });

  const controller = errandRefactory();

  app.post("/api/v1/user/:userId/recado/novo", controller.criarRecado);
  app.get("/api/v1/user/:userId/recados", controller.listar);
  app.put("/api/v1/user/:userId/recado/:idErrand/editar", controller.update);
  app.delete(
    "/api/v1/user/:userId/recado/:idErrand/remover",
    controller.deletar
  );

  return app;
};
