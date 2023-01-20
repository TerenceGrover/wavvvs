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
exports.registerOne = exports.loginOne = exports.getUser = void 0;
const models_js_1 = require("../models/models.js");
const userServices = __importStar(require("../services/User.service"));
const error_util_1 = require("../utils/error.util");
const getUser = async (req, res) => {
    try {
        const username = req.body.username;
        const user = await models_js_1.User.findOne({ user: username });
        // if user exists, return 200 and return the user, otherwise 404
        user ? res.status(200).send(user) : res.sendStatus(404);
    }
    catch (error) {
        console.log({ error });
        res.status(500).send({ error });
    }
};
exports.getUser = getUser;
const loginOne = async (req, res) => {
    try {
        const foundUser = await userServices.login(req.body);
        res.status(200).send(foundUser);
    }
    catch (error) {
        return res.status(500).send({ error: (0, error_util_1.getErrorMessage)(error) });
    }
};
exports.loginOne = loginOne;
const registerOne = async (req, res) => {
    try {
        console.log(req.body);
        await userServices.register(req.body);
        res.status(200).send(true);
    }
    catch (error) {
        return res.status(500).send((0, error_util_1.getErrorMessage)(error));
    }
};
exports.registerOne = registerOne;
