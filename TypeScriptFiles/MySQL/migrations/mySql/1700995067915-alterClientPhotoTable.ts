import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterClientPhotoTable1700995067915 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE client_photos ADD COLUMN clientId INT DEFAULT -1;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `ALTER TABLE client_photos DROP COLUMN clientId;`
      );
  }
}
