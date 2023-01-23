"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveTrackUrl = exports.getUserTracks = exports.deleteTrack = exports.getAllTracks = exports.uploadTrack = void 0;
const cloudinary_1 = require("cloudinary");
const models_1 = require("../models/models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { SECRET_KEY, CLOUD_NAME, API_KEY, API_SECRET } = process.env;
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
const deleteTrack = async (req, res) => {
    try {
        // get the id of the track to delete
        const { id } = req.body;
        // take the url of the track to delete from the database
        const track = await models_1.Track.findOne({ _id: id });
        // if the track doesn't exist, send 404
        if (!track) {
            return res.sendStatus(404);
        }
        // store the url of the track to delete
        const { path } = track;
        // using api key and secret
        cloudinary_1.v2.config({
            cloud_name: CLOUD_NAME,
            api_key: API_KEY,
            api_secret: API_SECRET,
        });
        // delete the track from cloudinary
        // get last part of the url
        const lastPartOfUrl = path.split('/').pop();
        const lastPartOfUrlWithoutExtension = lastPartOfUrl === null || lastPartOfUrl === void 0 ? void 0 : lastPartOfUrl.split('.').shift();
        console.log(lastPartOfUrlWithoutExtension);
        const buff = await cloudinary_1.v2.uploader.destroy(lastPartOfUrlWithoutExtension, { type: 'upload', resource_type: 'video' });
        // if its deleted, delete it from the database
        if (buff.result === 'ok') {
            // delete the track from the database
            await models_1.Track.deleteOne({ _id: id });
            console.log('deleted from cloudinary AND database');
        }
        res.sendStatus(204);
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
            res.sendStatus(204);
        }
    }
    catch (error) {
        console.log({ error });
        res.status(500).send({ error });
    }
};
exports.saveTrackUrl = saveTrackUrl;
