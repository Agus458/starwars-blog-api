/**
 * Pivate Routes are those API urls that require the user to be
 * logged in before they can be called from the front end.
 * 
 * Basically all HTTP requests to these endpoints must have an
 * Authorization header with the value "Bearer <token>"
 * being "<token>" a JWT token generated for the user using 
 * the POST /token endpoint
 * 
 * Please include in this file all your private URL endpoints.
 * 
 */

import { Router, Request, Response, NextFunction } from 'express';
import { safe } from './utils';
import * as actions from './actions';
import jwt from 'jsonwebtoken';

// declare a new router to include all the endpoints
const router = Router();

// Middleware to verify if yhe user is loged
const verifyLogin= (request: Request, response:Response, next:NextFunction) =>{
    //get token from header
    let token = request.header('Authorization');
    if(!token) return response.status(400).json({message: "Access Denied..."});

    let decoded;
    try {
        decoded = jwt.verify(token as string, process.env.JWT_KEY as string);
    } catch (error) {
    }
     
    if(!decoded) return response.status(400).json({message: "Invalid session token..."});

    Object.assign(request.body, decoded);

    next()
}

// Get logged user favourites
router.get('/favourites', verifyLogin, safe(actions.getFavourites));

// Add favourite planet
router.post('/favourite/planet/:id', verifyLogin, safe(actions.addFavouritePlanet));

// Add favourite character
router.post('/favourite/character/:id', verifyLogin, safe(actions.addFavouriteCharacter));

export default router;
