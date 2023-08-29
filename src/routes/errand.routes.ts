import { Router } from "express";
import { ErrandController } from "../controllers/errands.controller";

export const ErrandRoutes = () => {
    const app = Router({
        mergeParams: true
    })
    app.post("/create-recado/:userId",  new ErrandController().criarRecado);
    app.get("/listar/:userId", new ErrandController().listar)
    app.put("/update/user/:userId/recado/:idErrand", new ErrandController().update)
    app.delete("/deletar/user/:userId/recado/:idErrand", new ErrandController().deletar)



    return app
}