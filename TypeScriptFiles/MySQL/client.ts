import { Entity, Column, BaseEntity } from 'typeorm';

@Entity('client') // 'users' is the table name
export class client extends BaseEntity {
  @Column({
    nullable: false,
  })
  first_name!: string;

  @Column({ default: '' })
  last_name!: string;

  @Column({
    unique: true,
    default: 'default@default.default',
  })
  email!: string;

  @Column({
    unique: true,
    length: 10,
    default: 'asdfghjkla',
  })
  card_number!: string;

  @Column({
    type: 'double precision',
    default: 0,
  })
  balance!: number;

  @Column({
    type: 'boolean',
    name: 'active'
  })
  is_active!: boolean;

  @Column({
    type: 'simple-json',
    nullable: true,
    default: {
      age: -1,
      hair_color: 'none',
    },
  })
  additional_info!: {
    age: number;
    hair_color: string;
  };

  @Column({
    type: 'simple-array',
    default: [''],
  })
  family_members!: string[];
}
