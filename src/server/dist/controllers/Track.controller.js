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
exports.saveTrackUrl = exports.getUserTracks = exports.deleteTrack = exports.getAllTracks = exports.uploadTrack = void 0;
const fs = __importStar(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const models_1 = require("../models/models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { SECRET_KEY } = process.env;
const uploadTrack = async (req, res) => {
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
            const newTrack = {
                uploaded_by: decoded.id,
                path: req.file.filename,
                title: req.file.originalname,
                size: req.file.size,
                date: Date.now(),
            };
            await models_1.Track.create(newTrack);
            res.status(200).send(newTrack);
        }
    }
    catch (error) {
        console.log({ error });
        res.status(500).send({ error });
    }
};
exports.uploadTrack = uploadTrack;
const getAllTracks = async (req, res) => {
    try {
        const tracks = await models_1.Track.find({});
        res.status(200).send(tracks);
    }
    catch (error) {
        console.log({ error });
        res.status(500).send({ error });
    }
};
exports.getAllTracks = getAllTracks;
const getUserTracks = async (req, res) => {
    try {
        const { username } = req.body;
        const tracks = await models_1.Track.find({
            uploaded_by: username,
        });
        // if user has tracks, send them. If not, 404
        tracks ? res.status(200).send(tracks) : res.sendStatus(404);
    }
    catch (error) {
        console.log({ error });
        res.status(500).send({ error });
    }
};
exports.getUserTracks = getUserTracks;
const tracksPublicDirectory = './public/tracks'; // path relative to the node process
const deleteTrack = async (req, res) => {
    try {
        // The name of the file is the id of the track, and the path to it, at the same time.
        const { id } = req.body; // refactored
        const { deletedCount } = await models_1.Track.deleteOne({ path: id });
        if (deletedCount) {
            await fs.unlink(node_path_1.default.join(tracksPublicDirectory, id));
        }
        res.status(200).send({ deletedCount });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send({ error });
    }
};
exports.deleteTrack = deleteTrack;
const saveTrackUrl = async (req, res) => {
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
            const { url } = req.body;
            const track = {
                uploaded_by: id,
                path: url,
            };
            await models_1.Track.create(track);
        }
    }
    catch (error) {
        console.log({ error });
        res.status(500).send({ error });
    }
};
exports.saveTrackUrl = saveTrackUrl;
