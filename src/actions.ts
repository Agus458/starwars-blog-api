import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { User } from './entities/User'

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