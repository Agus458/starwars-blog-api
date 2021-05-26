import { Resource } from "./Resource";
import { Column, Entity, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { Planet } from "./Planet";
import { Favourite } from "./Favourite";

@Entity('characters')
export class Character extends Resource {

    @Column()
    heigth: number;

    @Column()
    mass: number;

    @Column()
    hair_color: string;

    @Column()
    skin_color: string;

    @Column()
    eye_color: string;

    @Column()
    gender: string;

    @ManyToOne(() => Planet, planet => planet.characters)
    home_planet: Planet;

    @Column()
    birth_year: string;

    @OneToMany(() => Favourite, favourite => favourite.character)
    favourites: Favourite[];
}