import express, { Express } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { UserRoutes } from "../../app/features/user/routes/user.routes";
import { ErrandRoutes } from "../../app/features/errand/routes/errand.routes";

dotenv.config();

export class Server {
  public static create() {
    const app = express();
    app.use(express.json());
    app.use(cors());

    //Users
    app.use("/", UserRoutes());
    app.use("/", ErrandRoutes());

    return app;
  }

  public static listen(app: Express) {
    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando na porta ` + process.env.PORT);
    });
  }
}
