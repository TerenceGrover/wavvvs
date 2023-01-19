"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const models_js_1 = require("../models/models.js");
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
