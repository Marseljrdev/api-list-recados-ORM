import "reflect-metadata";
import { DataBase } from "./main/database/database.connection";
import { Server } from "./main/config/express.config";





// inicializar o banco de dados, antes do listen
DataBase.connect().then(() => {
  console.log("Database is connected!");
  const app = Server.create();
  Server.listen(app);
});
