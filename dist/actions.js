"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deleteFavouriteCharacter = exports.deleteFavouritePlanet = exports.addFavouriteCharacter = exports.addFavouritePlanet = exports.getFavourites = exports.login = exports.getCharacter = exports.getCharacters = exports.createCharacter = exports.getPlanet = exports.createPlanet = exports.getPlanets = exports.getUser = exports.getUsers = exports.signup = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var User_1 = require("./entities/User");
var Planet_1 = require("./entities/Planet");
var Character_1 = require("./entities/Character");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Favourite_1 = require("./entities/Favourite");
var signup = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUser, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Validations
                if (!request.body.first_name)
                    return [2 /*return*/, response.status(400).json({ message: "Missing firtName property in body..." })];
                if (!request.body.last_name)
                    return [2 /*return*/, response.status(400).json({ message: "Missing lastName property in body..." })];
                if (!request.body.email)
                    return [2 /*return*/, response.status(400).json({ message: "Missing email property in body..." })];
                if (!request.body.password)
                    return [2 /*return*/, response.status(400).json({ message: "Missing password property in body..." })];
                if (!request.body.nick)
                    return [2 /*return*/, response.status(400).json({ message: "Missing nick property in body..." })];
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({
                        where: { email: request.body.email }
                    })];
            case 1:
                user = _a.sent();
                if (user)
                    return [2 /*return*/, response.status(400).json({ message: "Email already in use..." })];
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({
                        where: { nick: request.body.nick }
                    })];
            case 2:
                // Verify nick
                user = _a.sent();
                if (user)
                    return [2 /*return*/, response.status(400).json({ message: "Nick already in use..." })];
                newUser = typeorm_1.getRepository(User_1.User).create({
                    first_name: request.body.first_name,
                    last_name: request.body.last_name,
                    email: request.body.email,
                    password: request.body.password,
                    nick: request.body.nick
                });
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(newUser)];
            case 3:
                result = _a.sent();
                return [2 /*return*/, response.status(201).json({ message: "User registered successfuly...", user: result })];
        }
    });
}); };
exports.signup = signup;
var getUsers = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, response.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
var getUser = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!request.params.nick)
                    return [2 /*return*/, response.status(400).json({ message: "Missing nick param..." })];
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({
                        where: { nick: request.params.nick }
                    })];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, response.json({ message: "No users with this nick..." })];
                return [2 /*return*/, response.json(user)];
        }
    });
}); };
exports.getUser = getUser;
var getPlanets = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).find()];
            case 1:
                planets = _a.sent();
                return [2 /*return*/, response.json(planets)];
        }
    });
}); };
exports.getPlanets = getPlanets;
var createPlanet = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var newPlanet, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!request.body.name)
                    return [2 /*return*/, response.status(400).json({ message: "Missing planet name property in body..." })];
                if (!request.body.description)
                    return [2 /*return*/, response.status(400).json({ message: "Missing planet description property in body..." })];
                if (!request.body.img)
                    return [2 /*return*/, response.status(400).json({ message: "Missing planet img property in body..." })];
                if (!request.body.diameter)
                    return [2 /*return*/, response.status(400).json({ message: "Missing planet diameter property in body..." })];
                if (!request.body.rotation_period)
                    return [2 /*return*/, response.status(400).json({ message: "Missing planet rotation_period property in body..." })];
                if (!request.body.orbital_period)
                    return [2 /*return*/, response.status(400).json({ message: "Missing planet orbital_period property in body..." })];
                if (!request.body.gravity)
                    return [2 /*return*/, response.status(400).json({ message: "Missing planet gravity property in body..." })];
                if (!request.body.population)
                    return [2 /*return*/, response.status(400).json({ message: "Missing planet population property in body..." })];
                if (!request.body.climate)
                    return [2 /*return*/, response.status(400).json({ message: "Missing planet climate property in body..." })];
                if (!request.body.terrain)
                    return [2 /*return*/, response.status(400).json({ message: "Missing planet terrain property in body..." })];
                if (!request.body.surface_water)
                    return [2 /*return*/, response.status(400).json({ message: "Missing planet surface_water property in body..." })];
                newPlanet = typeorm_1.getRepository(Planet_1.Planet).create({
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
                return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).save(newPlanet)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, response.status(201).json({ message: "Planet saved successfuly...", planet: result })];
        }
    });
}); };
exports.createPlanet = createPlanet;
var getPlanet = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var planet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!request.params.id)
                    return [2 /*return*/, response.status(400).json({ message: "Missing planet id param..." })];
                return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).findOne({
                        where: { id: request.params.id }
                    })];
            case 1:
                planet = _a.sent();
                if (!planet)
                    return [2 /*return*/, response.json({ message: "No planets with this id..." })];
                return [2 /*return*/, response.json(planet)];
        }
    });
}); };
exports.getPlanet = getPlanet;
var createCharacter = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var planet, newCharacter, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!request.body.name)
                    return [2 /*return*/, response.status(400).json({ message: "Missing character name property in body..." })];
                if (!request.body.description)
                    return [2 /*return*/, response.status(400).json({ message: "Missing character description property in body..." })];
                if (!request.body.img)
                    return [2 /*return*/, response.status(400).json({ message: "Missing character img property in body..." })];
                if (!request.body.heigth)
                    return [2 /*return*/, response.status(400).json({ message: "Missing character heigth property in body..." })];
                if (!request.body.mass)
                    return [2 /*return*/, response.status(400).json({ message: "Missing character mass property in body..." })];
                if (!request.body.hair_color)
                    return [2 /*return*/, response.status(400).json({ message: "Missing character hairColor property in body..." })];
                if (!request.body.skin_color)
                    return [2 /*return*/, response.status(400).json({ message: "Missing character skinColor property in body..." })];
                if (!request.body.eye_color)
                    return [2 /*return*/, response.status(400).json({ message: "Missing character eye_color property in body..." })];
                if (!request.body.gender)
                    return [2 /*return*/, response.status(400).json({ message: "Missing character gender property in body..." })];
                if (!request.body.home_planet_id)
                    return [2 /*return*/, response.status(400).json({ message: "Missing character home_planet_id property in body..." })];
                if (!request.body.birth_year)
                    return [2 /*return*/, response.status(400).json({ message: "Missing character birth_year property in body..." })];
                return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).findOne({
                        where: { id: request.body.home_planet_id }
                    })];
            case 1:
                planet = _a.sent();
                if (!planet)
                    return [2 /*return*/, response.status(400).json({ message: "Invalid home_planet_id..." })];
                newCharacter = typeorm_1.getRepository(Character_1.Character).create({
                    name: request.body.name,
                    description: request.body.description,
                    img: request.body.img,
                    heigth: request.body.heigth,
                    mass: request.body.mass,
                    hair_color: request.body.hair_color,
                    skin_color: request.body.skin_color,
                    eye_color: request.body.eye_color,
                    gender: request.body.gender,
                    home_planet: planet,
                    birth_year: request.body.birth_year
                });
                return [4 /*yield*/, typeorm_1.getRepository(Character_1.Character).save(newCharacter)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, response.status(201).json({ message: "Character saved successfuly...", planet: result })];
        }
    });
}); };
exports.createCharacter = createCharacter;
var getCharacters = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var characters;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Character_1.Character).find()];
            case 1:
                characters = _a.sent();
                return [2 /*return*/, response.json(characters)];
        }
    });
}); };
exports.getCharacters = getCharacters;
var getCharacter = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var character;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!request.params.id)
                    return [2 /*return*/, response.status(400).json({ message: "Missing character id param..." })];
                return [4 /*yield*/, typeorm_1.getRepository(Character_1.Character).findOne({
                        where: { id: request.params.id },
                        relations: ['home_planet']
                    })];
            case 1:
                character = _a.sent();
                if (!character)
                    return [2 /*return*/, response.json({ message: "No characters with this id..." })];
                return [2 /*return*/, response.json(character)];
        }
    });
}); };
exports.getCharacter = getCharacter;
var login = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!request.body.email)
                    return [2 /*return*/, response.status(400).json({ message: "Missing email property in body..." })];
                if (!request.body.password)
                    return [2 /*return*/, response.status(400).json({ message: "Missing password property in body..." })];
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({
                        where: {
                            email: request.body.email
                        }
                    })];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, response.status(400).json({ message: "No user with this email..." })];
                // Validate password
                if (user.password !== request.body.password)
                    return [2 /*return*/, response.status(400).json({ message: "Incorrect password..." })];
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
                return [2 /*return*/, response.json({ message: "Login successful...", user: user, token: token })];
        }
    });
}); };
exports.login = login;
var getFavourites = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var user, favourites;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(request.body.user.id)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Favourite_1.Favourite).find({
                        where: { user: user },
                        relations: ['planet', 'character']
                    })];
            case 2:
                favourites = _a.sent();
                if (user) {
                    user.favourites = favourites;
                }
                return [2 /*return*/, response.json(user)];
        }
    });
}); };
exports.getFavourites = getFavourites;
var addFavouritePlanet = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var planet, favourite, newFavourite, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Validate planet
                if (!request.params.id)
                    return [2 /*return*/, response.status(400).json({ message: "Missing planet id param..." })];
                return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).findOne(request.params.id)];
            case 1:
                planet = _a.sent();
                if (!planet)
                    return [2 /*return*/, response.status(400).json({ message: "Invalid planet id..." })];
                return [4 /*yield*/, typeorm_1.getRepository(Favourite_1.Favourite).findOne({
                        where: {
                            user: request.body.user,
                            planet: planet
                        }
                    })];
            case 2:
                favourite = _a.sent();
                if (favourite)
                    return [2 /*return*/, response.status(400).json({ message: "Planet is already a favourite..." })];
                newFavourite = typeorm_1.getRepository(Favourite_1.Favourite).create({
                    planet: planet,
                    user: request.body.user,
                    type: "Planet"
                });
                return [4 /*yield*/, typeorm_1.getRepository(Favourite_1.Favourite).save(newFavourite)];
            case 3:
                result = _a.sent();
                return [2 /*return*/, response.status(201).json({ message: "Favourite planet saved successfuly...", favourite: result })];
        }
    });
}); };
exports.addFavouritePlanet = addFavouritePlanet;
var addFavouriteCharacter = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var character, favourite, newFavourite, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Validate planet
                if (!request.params.id)
                    return [2 /*return*/, response.status(400).json({ message: "Missing character id param..." })];
                return [4 /*yield*/, typeorm_1.getRepository(Character_1.Character).findOne(request.params.id)];
            case 1:
                character = _a.sent();
                if (!character)
                    return [2 /*return*/, response.status(400).json({ message: "Invalid character id..." })];
                return [4 /*yield*/, typeorm_1.getRepository(Favourite_1.Favourite).findOne({
                        where: {
                            user: request.body.user,
                            character: character
                        }
                    })];
            case 2:
                favourite = _a.sent();
                if (favourite)
                    return [2 /*return*/, response.status(400).json({ message: "Character is already a favourite..." })];
                newFavourite = typeorm_1.getRepository(Favourite_1.Favourite).create({
                    character: character,
                    user: request.body.user,
                    type: "Character"
                });
                return [4 /*yield*/, typeorm_1.getRepository(Favourite_1.Favourite).save(newFavourite)];
            case 3:
                result = _a.sent();
                return [2 /*return*/, response.status(201).json({ message: "Favourite character saved successfuly...", favourite: result })];
        }
    });
}); };
exports.addFavouriteCharacter = addFavouriteCharacter;
var deleteFavouritePlanet = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var planet, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!request.params.id)
                    return [2 /*return*/, response.status(400).json({ message: "Missing planet id param..." })];
                return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).findOne({
                        where: { id: request.params.id }
                    })];
            case 1:
                planet = _a.sent();
                if (!planet)
                    return [2 /*return*/, response.status(400).json({ message: "Invalid planet id..." })];
                return [4 /*yield*/, typeorm_1.getRepository(Favourite_1.Favourite)["delete"]({
                        user: request.body.user,
                        planet: planet
                    })];
            case 2:
                result = _a.sent();
                return [2 /*return*/, response.json(result)];
        }
    });
}); };
exports.deleteFavouritePlanet = deleteFavouritePlanet;
var deleteFavouriteCharacter = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var character, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!request.params.id)
                    return [2 /*return*/, response.status(400).json({ message: "Missing character id param..." })];
                return [4 /*yield*/, typeorm_1.getRepository(Character_1.Character).findOne({
                        where: { id: request.params.id }
                    })];
            case 1:
                character = _a.sent();
                if (!character)
                    return [2 /*return*/, response.status(400).json({ message: "Invalid character id..." })];
                return [4 /*yield*/, typeorm_1.getRepository(Favourite_1.Favourite)["delete"]({
                        user: request.body.user,
                        character: character
                    })];
            case 2:
                result = _a.sent();
                return [2 /*return*/, response.json(result)];
        }
    });
}); };
exports.deleteFavouriteCharacter = deleteFavouriteCharacter;
