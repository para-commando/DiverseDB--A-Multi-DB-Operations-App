import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { ClientPhotos } from "./clientsPhotoEntity"

@Entity()
export class Clients {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @OneToMany((type) => ClientPhotos, (clientPhotos) => clientPhotos.client)
    photos!: ClientPhotos[]
}