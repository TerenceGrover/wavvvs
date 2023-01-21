"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnotherUser = exports.updateOne = exports.registerOne = exports.loginOne = exports.getUser = void 0;
const models_js_1 = require("../models/models.js");
const userServices = __importStar(require("../services/User.service"));
const error_util_1 = require("../utils/error.util");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { SECRET_KEY } = process.env;
const getUser = async (req, res) => {
    try {
        if (req.headers && req.headers.authorization) {
            console.log(req.headers.authorization);
            let authorization = req.headers.authorization.split(' ')[1], decoded;
            try {
                decoded = jsonwebtoken_1.default.verify(authorization, SECRET_KEY);
            }
            catch (e) {
                return res.status(401).send('unauthorized');
            }
            const id = decoded.id;
            // Fetch the user by id
            models_js_1.User.findOne({ _id: id }).then(function (user) {
                if (user) {
                    user.password = '';
                    return res.status(200).send(user);
                }
                else
                    return res.sendStatus(404);
            });
        }
        // return res.send(500);
    }
    catch (error) {
        console.log({ error });
        return res.status(500).send({ error: (0, error_util_1.getErrorMessage)(error) });
    }
};
exports.getUser = getUser;
const loginOne = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userToLog = {
            email,
            password,
        };
        const foundUser = await userServices.login(userToLog);
        res.status(200).send(foundUser);
    }
    catch (error) {
        return res.status(500).send({ error: (0, error_util_1.getErrorMessage)(error) });
    }
};
exports.loginOne = loginOne;
const registerOne = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userToRegister = {
            isPrivate: false,
            isNew: true,
            username,
            email,
            password,
        };
        const user = await userServices.register(userToRegister);
        res.status(200).send(user);
    }
    catch (error) {
        let strError = (0, error_util_1.getErrorMessage)(error);
        if (strError === 'User already exists')
            return res.sendStatus(409);
        return res.status(500).send({ error: (0, error_util_1.getErrorMessage)(error) });
    }
};
exports.registerOne = registerOne;
const updateOne = async (req, res) => {
    try {
        if (req.headers && req.headers.authorization) {
            console.log(req.headers.authorization);
            let authorization = req.headers.authorization.split(' ')[1], decoded;
            try {
                decoded = jsonwebtoken_1.default.verify(authorization, SECRET_KEY);
            }
            catch (e) {
                return res.status(401).send('unauthorized');
            }
            const id = decoded.id;
            const { name, bio, profile_pic_path, isPrivate } = req.body;
            // here whatever is not being passed in req body will be undefined.
            const userToUpdate = {
                _id: id,
                isNew: false,
                isPrivate,
                name,
                bio,
                profile_pic_path,
            };
            const user = await userServices.updateProfileInfo(userToUpdate);
            if (user)
                res.sendStatus(204);
            else
                res.sendStatus(500);
        }
    }
    catch (error) {
        return res.status(500).send({ error: (0, error_util_1.getErrorMessage)(error) });
    }
};
exports.updateOne = updateOne;
// gets info about another user.
// if the user we want the info bout is private, im gonna check if you sent auth token.
const getAnotherUser = async (req, res) => {
    try {
        const username = req.params.username;
        const userToFind = await models_js_1.User.findOne({ username: username });
        if (!userToFind)
            throw new Error('User not found');
        const userToSend = {
            name: userToFind.name,
            bio: userToFind.bio,
            username: userToFind.username,
            email: userToFind.email,
            profile_pic_path: userToFind.profile_pic_path,
            // tracks ??
        };
        // if user asked is private, go on checking auth token.
        if (userToFind.isPrivate) {
            if (req.headers && req.headers.authorization) {
                let authorization = req.headers.authorization.split(' ')[1], decoded;
                try {
                    decoded = jsonwebtoken_1.default.verify(authorization, SECRET_KEY);
                }
                catch (e) {
                    return res.status(401).send('unauthorized');
                }
                if (decoded) {
                    return res.status(200).send(userToSend);
                }
            }
            else
                return res.status(401).send('unauthorized');
        }
        else {
            // here user asked for is not private, so send it straight away.
            return res.status(200).send(userToSend);
        }
    }
    catch (error) {
        return res.status(500).send({ error: (0, error_util_1.getErrorMessage)(error) });
    }
};
exports.getAnotherUser = getAnotherUser;
