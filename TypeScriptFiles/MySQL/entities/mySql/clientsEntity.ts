import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from "typeorm"
import { ClientPhotos } from "./clientsPhotoEntity"

@Entity({name: "clients"})
export class Clients {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @OneToMany((type) => ClientPhotos, (clientPhotos) => clientPhotos.client)
    photos!: ClientPhotos[]

    @DeleteDateColumn()
    deletedAt?: Date
}