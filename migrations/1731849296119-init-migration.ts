import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1731849296119 implements MigrationInterface {
  name = 'InitMigration1731849296119';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "Tracks" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "duration" integer NOT NULL,
                "artistId" uuid,
                "albumId" uuid,
                CONSTRAINT "PK_540a00bd092404355e461ece1c3" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Artists" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "grammy" boolean NOT NULL,
                CONSTRAINT "PK_50c85272913bb9a20198e25616e" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Albums" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "year" integer NOT NULL,
                "artistId" uuid,
                CONSTRAINT "PK_402c872b4d95f3710804d162a53" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Favs" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "artistId" uuid,
                "albumId" uuid,
                "trackId" uuid,
                CONSTRAINT "REL_f81f5ad5999cc9a29cafd5aaf4" UNIQUE ("artistId"),
                CONSTRAINT "REL_31f833cf00a541abad25d76b4e" UNIQUE ("albumId"),
                CONSTRAINT "REL_80fe6d117d43cb8bae577a44ae" UNIQUE ("trackId"),
                CONSTRAINT "PK_23a7d86e74ab2220aafa6411801" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "login" character varying NOT NULL,
                "version" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "password" character varying NOT NULL,
                CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "Tracks"
            ADD CONSTRAINT "FK_b65b20cf5f9b423399e380992cf" FOREIGN KEY ("artistId") REFERENCES "Artists"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "Tracks"
            ADD CONSTRAINT "FK_38e6b237172e4f7ba3160545e81" FOREIGN KEY ("albumId") REFERENCES "Albums"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "Albums"
            ADD CONSTRAINT "FK_8db4885faf0a0bebd8f6deb372e" FOREIGN KEY ("artistId") REFERENCES "Artists"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "Favs"
            ADD CONSTRAINT "FK_f81f5ad5999cc9a29cafd5aaf47" FOREIGN KEY ("artistId") REFERENCES "Artists"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "Favs"
            ADD CONSTRAINT "FK_31f833cf00a541abad25d76b4e4" FOREIGN KEY ("albumId") REFERENCES "Albums"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "Favs"
            ADD CONSTRAINT "FK_80fe6d117d43cb8bae577a44aea" FOREIGN KEY ("trackId") REFERENCES "Tracks"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "Favs" DROP CONSTRAINT "FK_80fe6d117d43cb8bae577a44aea"
        `);
    await queryRunner.query(`
            ALTER TABLE "Favs" DROP CONSTRAINT "FK_31f833cf00a541abad25d76b4e4"
        `);
    await queryRunner.query(`
            ALTER TABLE "Favs" DROP CONSTRAINT "FK_f81f5ad5999cc9a29cafd5aaf47"
        `);
    await queryRunner.query(`
            ALTER TABLE "Albums" DROP CONSTRAINT "FK_8db4885faf0a0bebd8f6deb372e"
        `);
    await queryRunner.query(`
            ALTER TABLE "Tracks" DROP CONSTRAINT "FK_38e6b237172e4f7ba3160545e81"
        `);
    await queryRunner.query(`
            ALTER TABLE "Tracks" DROP CONSTRAINT "FK_b65b20cf5f9b423399e380992cf"
        `);
    await queryRunner.query(`
            DROP TABLE "Users"
        `);
    await queryRunner.query(`
            DROP TABLE "Favs"
        `);
    await queryRunner.query(`
            DROP TABLE "Albums"
        `);
    await queryRunner.query(`
            DROP TABLE "Artists"
        `);
    await queryRunner.query(`
            DROP TABLE "Tracks"
        `);
  }
}
