import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateClientPhotosTable1700993870479 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE client_photos (
                id INT PRIMARY KEY AUTO_INCREMENT,
                url VARCHAR(255) NOT NULL,
                client_id INT,
                FOREIGN KEY (client_id) REFERENCES clients(id)
            );`
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE client_photos;`
          );
    }

}
