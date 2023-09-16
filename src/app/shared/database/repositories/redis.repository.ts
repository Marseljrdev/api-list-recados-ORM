import { RedisCacheDataBase } from "../../../../main/database/redis.connection";

export class RedisRepository {
  private repository = RedisCacheDataBase.connection;

  public async get(key: string) {
    const result = await this.repository.get(key);

    if (!result) {
      return null;
    }

    return JSON.parse(result);
  }

  public async set(key: string, value: string) {
    await this.repository.set(key, JSON.stringify(value));
  }

  //TTL = Timer to live
  public async setEx(key: string, seconds: number, value: string) {
    await this.repository.setex(key, seconds, JSON.stringify(value));
  }

  public async delete(key: string) {
    await this.repository.del(key);
  }
}
