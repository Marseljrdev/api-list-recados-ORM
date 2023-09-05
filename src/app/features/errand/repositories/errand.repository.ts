import { ErrandEntity } from "../../../shared/database/entities/errand.entity";
import { DataBase } from "../../../../main/database/database.connection";
import { Errand, StatusErrand } from "../../../models/errand";
import { User } from "../../../models/user";
import { UserRepository } from "../../user/repositories/user.repository";

interface ErrandType {
    userId: string;
    type?: StatusErrand;
}

export class ErrandRepository {
    private repository = DataBase.connection.getRepository(ErrandEntity)

    public async criarRecado(newErrand: Errand) {
        const createdErrand = this.repository.create({
            id: newErrand.id,
            title: newErrand.title,
            description: newErrand.description,
            type: newErrand.type,
            idUser: newErrand.user.id
        })

        const result = await this.repository.save(createdErrand)
        console.log(result);
        return result
    }

    public async listErrands(params: ErrandType) {
        const result = await this.repository.find({
            where: {
                idUser: params.userId,
                type: params.type
            },
            relations: {
                user: true
            }

        });
        return result.map((item) => ErrandRepository.mapRowToModel(item));
    }

    public async update(errand: ErrandEntity) {
        const result = await this.repository.update(
            {
                id: errand.id,
            },
            {
                title: errand.title,
                description: errand.description,
                type: errand.type
            }
        );

        result.affected ?? 0;
    }

    public async getByIdErrand(idErrand: string) {
        const result = await this.repository.findOne({
            where: { id: idErrand }
        });

        return result
    }

    public async delete(id: string) {
        const result = await this.repository.delete({id});

        return result.affected ?? 0;
    }

    public static mapRowToModel(errand: ErrandEntity): Errand {
        const user = UserRepository.mapRowToModel(errand.user)
        return Errand.create(errand, user);
    }

}