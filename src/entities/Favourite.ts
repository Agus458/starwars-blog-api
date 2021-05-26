import { BaseEntity, PrimaryGeneratedColumn, ManyToOne, Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Resource } from "./Resource";
import { Planet } from "./Planet";
import { Character } from "./Character";

@Entity('favourites')
export class Favourite extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.favourites)
    user: User;

    @Column()
    type: string;

    @ManyToOne(() => Planet, planet => planet.favourites)
    planet: Planet;

    @ManyToOne(() => Character, character => character.favourites)
    character: Character;
}