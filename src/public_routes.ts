
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions';

const router = Router();

// Signup route, creates a new user in the DB
router.post('/signup', safe(actions.signup));

// Get registered users in the database
router.get('/users', safe(actions.getUsers));

// Get particular user
router.get('/user/:nick', safe(actions.getUser));

// Get planets from DB
router.get('/planets', safe(actions.getPlanets));

// Get particular planet
router.get('/planet/:id', safe(actions.getPlanet));

// Create new planet
router.post('/planet', safe(actions.createPlanet));

// Get character from DB
router.get('/characters', safe(actions.getCharacters));

// Get particular character
router.get('/character/:id', safe(actions.getCharacter));

// Create new character
router.post('/character', safe(actions.createCharacter));

// Login route
router.get('/login', safe(actions.login));

export default router;
