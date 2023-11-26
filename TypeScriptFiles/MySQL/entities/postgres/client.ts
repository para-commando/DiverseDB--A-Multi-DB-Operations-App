import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client')
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  firstName!: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255, default: '' })
  lastName!: string;

  @Column({ type: 'varchar', length: 255, default: 'default@default.default' })
  email!: string;

  @Column({ name: 'card_number', type: 'varchar', length: 10, default: 'asdfghjkla' })
  cardNumber!: string;

  @Column({ type: 'double', default: 0 })
  balance!: number;

  @Column({ type: 'tinyint' })
  active!: boolean;

  @Column({ type: 'simple-json', nullable: true })
  additionalInfo!: {
    age: number;
    hair_color: string;
  };

  @Column({ type: 'text', })
  familyMembers!: string;
}
