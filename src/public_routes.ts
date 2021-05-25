
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

export default router;
