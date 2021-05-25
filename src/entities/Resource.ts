import { BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

export abstract class Resource extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    img: string;
}