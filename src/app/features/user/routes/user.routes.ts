import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { UserMiddleware } from "../validators/user.middleware";

export const UserRoutes = () => {
    const app = Router({
        mergeParams: true
    })
    app.post("/api/v1/user", new UserController().create);
    app.post("/api/v1/user/authenticate", new UserController().login);
    app.get("/api/v1/users", new UserController().listAllUsers);
    app.get("/api/v1/user/:id", new UserController().getUserById);


    return app
}