import "reflect-metadata";
import { DataBase } from "./main/database/database.connection";
import { Server } from "./main/config/express.config";
import { RedisCacheDataBase } from "./main/database/redis.connection";



Promise.all([DataBase.connect(), RedisCacheDataBase.connect()]).then(() => {
  const app = Server.create();
  Server.listen(app);
})
