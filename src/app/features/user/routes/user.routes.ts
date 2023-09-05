import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { UserMiddleware } from "../validators/user.middleware";

export const UserRoutes = () => {
    const app = Router({
        mergeParams: true
    })
    app.post("/create",  new UserController().create);
    app.post("/login", new UserController().login);
    app.get("/list", new UserController().listAllUsers);
    app.get("/list/:id",  new UserController().getUserById)


    return app
}