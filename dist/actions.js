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
exports.__esModule = true;
exports.getUser = exports.getUsers = exports.signup = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var User_1 = require("./entities/User");
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
