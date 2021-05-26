import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Resource } from "./Resource";
import { Character } from "./Character";
import { Favourite } from "./Favourite";

@Entity('planets')
export class Planet extends Resource {

    @Column()
    diameter: number;

    @Column()
    rotation_period: number;

    @Column()
    orbital_period: number;

    @Column()
    gravity: string;

    @Column()
    population: number;

    @Column()
    climate: string;

    @Column()
    terrain: string;

    @Column()
    surface_water: number;

    @OneToMany(() => Character, character => character.home_planet)
    characters: Character[];

    @OneToMany(() => Favourite, favourite => favourite.planet)
    favourites: Favourite[];
}