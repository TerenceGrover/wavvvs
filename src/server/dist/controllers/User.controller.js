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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOne = exports.registerOne = exports.loginOne = exports.getUser = void 0;
const models_js_1 = require("../models/models.js");
const userServices = __importStar(require("../services/User.service"));
const error_util_1 = require("../utils/error.util");
const getUser = async (req, res) => {
    try {
        const username = req.body.username;
        const user = await models_js_1.User.findOne({ user: username });
        if (user) {
            const userToSend = {
                name: user.name,
                email: user.email,
                bio: user.bio,
                profile_pic_path: user.profile_pic_path,
            };
            res.status(200).send(userToSend);
        }
        // if user exists, return 200 and return the user, otherwise 404
        res.sendStatus(404);
    }
    catch (error) {
        console.log({ error });
        res.status(500).send({ error: (0, error_util_1.getErrorMessage)(error) });
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
            isNew: true,
            username,
            email,
            password,
        };
        const user = await userServices.register(userToRegister);
        res.status(200).send(user);
    }
    catch (error) {
        return res.status(500).send({ error: (0, error_util_1.getErrorMessage)(error) });
    }
};
exports.registerOne = registerOne;
const updateOne = async (req, res) => {
    try {
        const { name, email, bio, profile_pic_path } = req.body;
        const userToUpdate = {
            isNew: false,
            name,
            email,
            bio,
            profile_pic_path,
            password: '',
        };
        const user = await userServices.updateProfileInfo(userToUpdate);
        res.status(204).send(user);
    }
    catch (error) {
        return res.status(500).send({ error: (0, error_util_1.getErrorMessage)(error) });
    }
};
exports.updateOne = updateOne;
