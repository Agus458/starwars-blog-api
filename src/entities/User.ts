import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({unique: true})
    nick: string;
}