import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: 'User' })
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    firstName!: string

    @Column()
    lastName!: string

    @Column()
    isActive!: boolean
}