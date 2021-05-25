import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Resource } from "./Resource";

@Entity()
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
}