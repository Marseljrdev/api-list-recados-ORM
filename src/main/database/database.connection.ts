import config from "../config/database.config";
import { DataSource } from "typeorm";

export class DataBase {
  private static _connection: DataSource;

  public static get connection() {
    return this._connection;
  }

  public static async connect() {
    this._connection = await config.initialize();
    console.log("Database is connected!");
  }
}
