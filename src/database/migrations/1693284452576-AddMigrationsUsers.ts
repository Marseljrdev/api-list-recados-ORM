import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMigrationsUsers1693284452576 implements MigrationInterface {
    name = 'AddMigrationsUsers1693284452576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "BancoTrabalhoFinal"."errand" ("id" uuid NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "type" character varying NOT NULL, "id_user" uuid NOT NULL, CONSTRAINT "PK_9f3c23786d9cb9bed972cf6a36c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "BancoTrabalhoFinal"."errand" ADD CONSTRAINT "FK_29f8c61a7525387f8a05204a4ac" FOREIGN KEY ("id_user") REFERENCES "BancoTrabalhoFinal"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "BancoTrabalhoFinal"."errand" DROP CONSTRAINT "FK_29f8c61a7525387f8a05204a4ac"`);
        await queryRunner.query(`DROP TABLE "BancoTrabalhoFinal"."errand"`);
    }

}
