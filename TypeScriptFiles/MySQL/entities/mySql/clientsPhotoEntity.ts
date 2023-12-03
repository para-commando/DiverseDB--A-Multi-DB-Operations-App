import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from "typeorm";
import { Clients } from "./clientsEntity";

@Entity()
export class ClientPhotos {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    url!: string;

    @Column()
    clientID!: number

    @ManyToOne((type) => Clients, (clients) => clients.photos)
    @JoinColumn({ name: 'clientID' }) // Specify your custom foreign key column name
    client!: Clients;
    
    @DeleteDateColumn()
    deletedAt?: Date
}
