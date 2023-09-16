import { UserEntity } from "../../../shared/database/entities/user.entity";
import { DataBase } from "../../../../main/database/database.connection";
import { User } from "../../../models/user";

export class UserRepository {
  private repository = DataBase.connection.getRepository(UserEntity);

  public async checkEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: { email: email },
    });
    return user ? UserRepository.mapRowToModel(user) : undefined;
  }

  public async create(user: User) {
    const createUser = this.repository.create({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const result = await this.repository.save(createUser);
    return result;
    console.log(result);
  }

  public async listAllUsers() {
    const result = await this.repository.find();
    return result.map((item) => UserRepository.mapRowToModel(item));
  }

  public async getById(id: string) {
    const result = await this.repository.findOne({
      where: { id: id },
    });

    return result ? UserRepository.mapRowToModel(result) : undefined;
  }

  public async login(email: string, password: string) {
    const user = await this.repository.findOne({
      where: {
        email: email,
        password: password,
      },
    });

    return user ? UserRepository.mapRowToModel(user) : undefined;
  }

  public static mapRowToModel(row: UserEntity): User {
    return User.create(row);
  }
}
