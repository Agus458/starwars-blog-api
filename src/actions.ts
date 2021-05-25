import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { User } from './entities/User'
import { Planet } from './entities/Planet';

export const signup = async (request: Request, response: Response): Promise<Response> => {
    // Validations
    if(!request.body.first_name) return response.status(400).json({ message: "Missing firtName property in body..." });
    if(!request.body.last_name) return response.status(400).json({ message: "Missing lastName property in body..." });
    if(!request.body.email) return response.status(400).json({ message: "Missing email property in body..." });
    if(!request.body.password) return response.status(400).json({ message: "Missing password property in body..." });
    if(!request.body.nick) return response.status(400).json({ message: "Missing nick property in body..." });

    // Verify email
    let user = await getRepository(User).findOne({
        where: {email: request.body.email}
    });
    if(user) return response.status(400).json({ message: "Email already in use..." });

    // Verify nick
    user = await getRepository(User).findOne({
        where: {nick: request.body.nick}
    });
    if(user) return response.status(400).json({ message: "Nick already in use..." });

    // Register the new user
    let newUser = getRepository(User).create({
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        password: request.body.password,
        nick: request.body.nick
    });
    let result = await getRepository(User).save(newUser);

    return response.status(201).json({message: "User registered successfuly...", user: result});
}

export const getUsers = async (request: Request, response: Response): Promise<Response> => {
    let users = await getRepository(User).find();
    return response.json(users);
}

export const getUser = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.nick) return response.status(400).json({ message: "Missing nick param..." });

    let user = await getRepository(User).findOne({
        where: {nick: request.params.nick}
    });

    if(!user) return response.json({ message: "No users with this nick..." });

    return response.json(user);
}

export const getPlanets = async (request: Request, response: Response): Promise<Response> => {
    let planets = await getRepository(Planet).find();
    return response.json(planets);
} 

export const createPlanet = async (request: Request, response: Response): Promise<Response> => {
    if(!request.body.name) return response.status(400).json({ message: "Missing planet name property in body..." });
    if(!request.body.description) return response.status(400).json({ message: "Missing planet description property in body..." });
    if(!request.body.img) return response.status(400).json({ message: "Missing planet img property in body..." });

    if(!request.body.diameter) return response.status(400).json({ message: "Missing planet diameter property in body..." });
    if(!request.body.rotation_period) return response.status(400).json({ message: "Missing planet rotation_period property in body..." });
    if(!request.body.orbital_period) return response.status(400).json({ message: "Missing planet orbital_period property in body..." });
    if(!request.body.gravity) return response.status(400).json({ message: "Missing planet gravity property in body..." });
    if(!request.body.population) return response.status(400).json({ message: "Missing planet population property in body..." });
    if(!request.body.climate) return response.status(400).json({ message: "Missing planet climate property in body..." });
    if(!request.body.terrain) return response.status(400).json({ message: "Missing planet terrain property in body..." });
    if(!request.body.surface_water) return response.status(400).json({ message: "Missing planet surface_water property in body..." });

    let newPlanet = getRepository(Planet).create({
        name: request.body.name,
        description: request.body.description,
        img: request.body.img,
        diameter: request.body.diameter,
        rotation_period: request.body.rotation_period,
        orbital_period: request.body.orbital_period,
        gravity: request.body.gravity,
        population: request.body.population,
        climate: request.body.climate,
        terrain: request.body.terrain,
        surface_water: request.body.surface_water
    });
    let result = await getRepository(Planet).save(newPlanet);

    return response.status(201).json({message: "Planet saved successfuly...", planet: result});
}

export const getPlanet = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id) return response.status(400).json({ message: "Missing planet id param..." });

    let planet = await getRepository(Planet).findOne({
        where: {id: request.params.id}
    });

    if(!planet) return response.json({ message: "No planets with this id..." });

    return response.json(planet);
}