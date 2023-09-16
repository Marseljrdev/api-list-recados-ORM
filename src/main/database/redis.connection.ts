import { Redis } from "ioredis";
import config from "../config/redis.config";


export class RedisCacheDataBase {
    private static _connection: Redis;

    public static get connection() {
        return this._connection;
    }

    public static async connect() {
        this._connection = new Redis(config);
        console.log('Redis cache is connected!');
    }
}