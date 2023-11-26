import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Clients } from "./clientsEntity";

@Entity()
export class ClientPhotos {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    url!: string;

    @ManyToOne((type) => Clients, (clients) => clients.photos)
    @JoinColumn({ name: 'clientID' }) // Specify your custom foreign key column name
    client!: Clients;
}
