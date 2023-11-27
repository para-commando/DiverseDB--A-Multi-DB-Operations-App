import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: 'Usera' })
export class Usera {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    firstName!: string

    @Column()
    lastName!: string

    @Column()
    isActive!: boolean
}