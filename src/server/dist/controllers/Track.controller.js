"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TESTsaveTrackUrl = exports.likeTrack = exports.saveTrackUrl = exports.deleteTrack = exports.getAllTracks = void 0;
const models_1 = require("../models/models");
const general_util_1 = require("../utils/general.util");
const getAllTracks = async (req, res) => {
    try {
        let { limit } = req.body;
        if (!limit)
            limit = 20;
        let { sort } = req.body;
        // if sort is not passed in the body, i dont want to sort
        const tracks = await models_1.Track.find({}, null, { limit: limit });
        let arrOfTracks = [];
        tracks.forEach((track) => {
            arrOfTracks.push({
                _id: track._id.toString(),
                path: track.path,
                title: track.title,
                size: track.size,
                date: track.date,
                likes: track.likes,
            });
        });
        if (sort) {
            const now = Date.now();
            switch (sort) {
                case 'date':
                    arrOfTracks.sort((a, b) => {
                        now - b.date - (now - a.date);
                    });
                    break;
                case 'likes':
                    arrOfTracks.sort((a, b) => {
                        b.likes - a.likes;
                    });
                    break;
                default:
                    arrOfTracks.sort((a, b) => {
                        b.likes - a.likes;
                    });
                    break;
            }
        }
        res.status(200).send(arrOfTracks);
    }
    catch (error) {
        console.log({ error });
        res.status(500).send({ error });
    }
};
exports.getAllTracks = getAllTracks;
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
        const del = await (0, general_util_1.deleteTrackFromCloudinaryAndDb)(id, path);
        if (del) {
            res.sendStatus(204);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (error) {
        // TODO : notify user of the error (means send back the error)
        // TODO : notify the developer of the error (maybe email the error)
        console.log({ error });
        res.status(500).send({ error });
    }
};
exports.deleteTrack = deleteTrack;
const saveTrackUrl = async (req, res) => {
    try {
        const decoded = (0, general_util_1.getIdOfUserFromJWT)(req);
        if (decoded) {
            const id = decoded.id;
            const { url } = req.body;
            const { title } = req.body;
            const track = {
                likes: 0,
                liked_by: [],
                uploaded_by: id,
                path: url,
                date: Date.now(),
                title: title,
            };
            await models_1.Track.create(track);
            res.sendStatus(204);
        }
        else {
            // getIdOfUserFromJWT returns null if the token is invalid so we send 401
            res.status(401).send('Unauthorized');
        }
    }
    catch (error) {
        // TODO : notify user of the error (means send back the error)
        // TODO : notify the developer of the error (maybe email the error)
        console.log({ error });
        res.status(500).send({ error });
    }
};
exports.saveTrackUrl = saveTrackUrl;
const likeTrack = async (req, res) => {
    try {
        const decoded = (0, general_util_1.getIdOfUserFromJWT)(req);
        if (decoded) {
            const id = decoded.id;
            const { trackId } = req.body;
            const track = await models_1.Track.findOne({ _id: trackId });
            if (track) {
                // if the user already liked the track, we remove the like
                if (track.liked_by.includes(id)) {
                    await models_1.Track.updateOne({ _id: trackId }, { $pull: { liked_by: id } });
                    await models_1.Track.updateOne({ _id: trackId }, { $inc: { likes: -1 } });
                    console.log('removed like, likes of the track is now: ' + track.likes);
                    return res.sendStatus(204);
                }
                else {
                    // if the user didn't like the track, we add the like
                    await models_1.Track.updateOne({ _id: trackId }, { $push: { liked_by: id } });
                    await models_1.Track.updateOne({ _id: trackId }, { $inc: { likes: 1 } });
                    console.log('added like, likes of the track is now: ' + track.likes);
                    return res.sendStatus(204);
                }
            }
            else {
                return res.sendStatus(404);
            }
        }
        else {
            // getIdOfUserFromJWT returns null if the token is invalid so we send 401
            return res.status(401).send('Unauthorized');
        }
    }
    catch (error) {
        // TODO : notify user of the error (means send back the error)
        // TODO : notify the developer of the error (maybe email the error)
        console.log({ error });
        return res.status(500).send({ error });
    }
};
exports.likeTrack = likeTrack;
const TESTsaveTrackUrl = async (req, res) => {
    try {
        const decoded = (0, general_util_1.getIdOfUserFromJWT)(req);
        if (decoded) {
            const id = decoded.id;
            const { url } = req.body;
            const { title } = req.body;
            const twoDaysAgo = new Date(Date.now());
            twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
            const newTimestamp = twoDaysAgo.getTime();
            const track = {
                likes: 0,
                liked_by: [],
                uploaded_by: id,
                path: url,
                date: newTimestamp,
                title: title,
            };
            await models_1.Track.create(track);
            res.sendStatus(204);
        }
        else {
            // getIdOfUserFromJWT returns null if the token is invalid so we send 401
            res.status(401).send('Unauthorized');
        }
    }
    catch (error) {
        // TODO : notify user of the error (means send back the error)
        // TODO : notify the developer of the error (maybe email the error)
        console.log({ error });
        res.status(500).send({ error });
    }
};
exports.TESTsaveTrackUrl = TESTsaveTrackUrl;
