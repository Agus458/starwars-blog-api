"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var utils_1 = require("./utils");
var actions = __importStar(require("./actions"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// declare a new router to include all the endpoints
var router = express_1.Router();
// Middleware to verify if yhe user is loged
var verifyLogin = function (request, response, next) {
    //get token from header
    var token = request.header('Authorization');
    if (!token)
        return response.status(400).json({ message: "Access Denied..." });
    var decoded;
    try {
        decoded = jsonwebtoken_1["default"].verify(token, process.env.JWT_KEY);
    }
    catch (error) {
    }
    if (!decoded)
        return response.status(400).json({ message: "Invalid session token..." });
    Object.assign(request.body, decoded);
    next();
};
// Get logged user favourites
router.get('/favourites', verifyLogin, utils_1.safe(actions.getFavourites));
// Add favourite planet
router.post('/favourite/planet/:id', verifyLogin, utils_1.safe(actions.addFavouritePlanet));
// Add favourite character
router.post('/favourite/character/:id', verifyLogin, utils_1.safe(actions.addFavouriteCharacter));
// Delete favourite planet
router["delete"]('/favourite/planet/:id', verifyLogin, utils_1.safe(actions.deleteFavouritePlanet));
// Delete favourite character
router["delete"]('/favourite/character/:id', verifyLogin, utils_1.safe(actions.deleteFavouriteCharacter));
exports["default"] = router;
