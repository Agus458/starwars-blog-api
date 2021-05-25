"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 *
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
var express_1 = require("express");
var utils_1 = require("./utils");
var actions = __importStar(require("./actions"));
var router = express_1.Router();
// Signup route, creates a new user in the DB
router.post('/signup', utils_1.safe(actions.signup));
// Get registered users in the database
router.get('/users', utils_1.safe(actions.getUsers));
// Get particular user
router.get('/user/:nick', utils_1.safe(actions.getUser));
// Get planets from DB
router.get('/planets', utils_1.safe(actions.getPlanets));
// Get particular planet
router.get('/planet/:id', utils_1.safe(actions.getPlanet));
// Create new planet
router.post('/planet', utils_1.safe(actions.createPlanet));
// Get character from DB
router.get('/characters', utils_1.safe(actions.getCharacters));
// Get particular character
router.get('/character/:id', utils_1.safe(actions.getCharacter));
// Create new character
router.post('/character', utils_1.safe(actions.createCharacter));
exports["default"] = router;
