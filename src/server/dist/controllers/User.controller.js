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
exports.buyPremium = exports.search = exports.getAllUsers = exports.followUser = exports.getUserFromSongId = exports.deleteUser = exports.getAnotherUser = exports.updateOne = exports.registerOne = exports.loginOne = exports.getUser = void 0;
const models_1 = require("../models/models");
const userServices = __importStar(require("../services/User.service"));
const general_util_1 = require("../utils/general.util");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUser = async (req, res) => {
    try {
        const decoded = (0, general_util_1.getIdOfUserFromJWT)(req);
        if (decoded) {
            const id = decoded.id;
            // Fetch the user by id
            const user = await models_1.User.findOne({ _id: id });
            let userToSend = {};
            if (user) {
                userToSend = {
                    _id: user._id.toString(),
                    username: user.username,
                    email: user.email,
                    name: user.name,
                    isPrivate: user.isPrivate,
                    isNewUser: user.isNewUser,
                    profile_pic_path: user.profile_pic_path,
                    bio: user.bio,
                    numberOfFollowers: user.followers.length,
                    followers: user.followers,
                    isPremium: user.isPremium,
                    tracks: [],
                };
                // seach in Track all the tracks that have the user id as uploaded by
                const tracks = await models_1.Track.find({ uploaded_by: id });
                let arrOfTracks = [];
                tracks.forEach((track) => {
                    arrOfTracks.push({
                        _id: track._id.toString(),
                        path: track.path,
                        title: track.title,
                        size: track.size,
                        date: track.date,
                        likes: track.liked_by.length,
                        liked_by: track.liked_by,
                    });
                });
                userToSend.tracks = arrOfTracks;
                return res.status(200).send(userToSend);
            }
            else
                return res.sendStatus(404);
        }
        else
            return res.sendStatus(404);
    }
    catch (error) {
        console.log({ error });
        return res.status(500).send({ error: (0, general_util_1.getErrorMessage)(error) });
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
        let strError = (0, general_util_1.getErrorMessage)(error);
        if (strError === 'credentials are not correct')
            return res.sendStatus(404);
        return res.status(500).send({ error: strError });
    }
};
exports.loginOne = loginOne;
const registerOne = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userToRegister = {
            isPrivate: false,
            isNewUser: true,
            username,
            email,
            password,
            followers: [],
            isPremium: false,
        };
        const user = await userServices.register(userToRegister);
        res.status(200).send(user);
    }
    catch (error) {
        let strError = (0, general_util_1.getErrorMessage)(error);
        if (strError === 'User already exists')
            return res.sendStatus(409);
        return res.status(500).send({ error: strError });
    }
};
exports.registerOne = registerOne;
const updateOne = async (req, res) => {
    try {
        const decoded = (0, general_util_1.getIdOfUserFromJWT)(req);
        if (decoded) {
            const id = decoded.id;
            const { name, bio, profile_pic_path, isPrivate } = req.body;
            // here whatever is not being passed in req body will be undefined.
            const userToUpdate = {
                _id: id,
                isNewUser: false,
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
        return res.status(500).send({ error: (0, general_util_1.getErrorMessage)(error) });
    }
};
exports.updateOne = updateOne;
// gets info about another user.
// if the user we want the info bout is private, im gonna check if you sent auth token.
const getAnotherUser = async (req, res) => {
    try {
        const id = req.params.id;
        let userToFind;
        if (id.length >= 24) {
            userToFind = await models_1.User.findOne({ _id: id });
        }
        // here first i search in the db dearching for the id
        // if i dont get anything, i try with username.
        if (!userToFind) {
            userToFind = await models_1.User.findOne({ username: id });
        }
        if (!userToFind)
            throw new Error('User not found');
        const userToSend = {
            id: userToFind._id,
            name: userToFind.name,
            bio: userToFind.bio,
            username: userToFind.username,
            email: userToFind.email,
            profile_pic_path: userToFind.profile_pic_path,
            followers: userToFind.followers,
            isPremium: userToFind.isPremium,
            isPrivate: userToFind.isPrivate,
            numberOfFollowers: userToFind.followers.length,
            tracks: [],
        };
        // seach in Track all the tracks that have the user id as uploaded by
        const tracks = await models_1.Track.find({ uploaded_by: id });
        let arrOfTracks = [];
        tracks.forEach((track) => {
            arrOfTracks.push({
                _id: track._id.toString(),
                path: track.path,
                title: track.title,
                size: track.size,
                date: track.date,
                likes: track.liked_by.length,
                liked_by: track.liked_by,
            });
        });
        userToSend.tracks = arrOfTracks;
        // if user asked is private, go on checking auth token.
        if (userToFind.isPrivate) {
            const decoded = (0, general_util_1.getIdOfUserFromJWT)(req);
            if (decoded) {
                return res.status(200).send(userToSend);
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
        return res.status(500).send({ error: (0, general_util_1.getErrorMessage)(error) });
    }
};
exports.getAnotherUser = getAnotherUser;
const deleteUser = async (req, res) => {
    try {
        const pwd = req.body.password;
        const decoded = (0, general_util_1.getIdOfUserFromJWT)(req);
        // check if the password is correct before deleting the user
        const foundUser = await models_1.User.findOne({ _id: decoded.id });
        if (!foundUser) {
            return res.status(404).send('User not found');
        }
        const isMatch = bcrypt_1.default.compareSync(pwd, foundUser.password);
        if (!isMatch) {
            return res.status(401).send('unauthorized');
        }
        let deleted;
        if (decoded) {
            deleted = await models_1.User.deleteOne({ _id: decoded.id });
        }
        else {
            return res.status(401).send('unauthorized');
        }
        if (deleted) {
            // dont await this. its gonna take a while.
            await (0, general_util_1.deleteUserBelongings)(decoded.id);
            return res.sendStatus(204);
        }
        else
            return res.sendStatus(500);
    }
    catch (error) {
        return res.status(500).send({ error: (0, general_util_1.getErrorMessage)(error) });
    }
};
exports.deleteUser = deleteUser;
const getUserFromSongId = async (req, res) => {
    try {
        const songId = req.params.id;
        console.log(songId);
        const song = await models_1.Track.findOne({ _id: songId });
        const ownerId = song === null || song === void 0 ? void 0 : song.uploaded_by;
        const owner = await models_1.User.findOne({ _id: ownerId === null || ownerId === void 0 ? void 0 : ownerId.toString() });
        if (owner) {
            const userToSend = {
                name: owner.name,
                bio: owner.bio,
                username: owner.username,
                profile_pic_path: owner.profile_pic_path,
                numberOfFollowers: owner.followers.length,
                followers: owner.followers,
                isPremium: owner.isPremium,
            };
            if (owner.isPrivate) {
                // check if the user who made the request follows the owner of the song.
                const decoded = (0, general_util_1.getIdOfUserFromJWT)(req);
                if (decoded) {
                    const user = await models_1.User.findOne({ _id: decoded.id });
                    if (user) {
                        if (owner.followers.includes(user._id.toString())) {
                            return res.status(200).send(userToSend);
                        }
                    }
                }
                return res.status(401).send({ error: 'Private' });
            }
            return res.status(200).send(userToSend);
        }
        return res.status(404).send({ error: 'User not found' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: (0, general_util_1.getErrorMessage)(error) });
    }
};
exports.getUserFromSongId = getUserFromSongId;
const followUser = async (req, res) => {
    try {
        const decoded = (0, general_util_1.getIdOfUserFromJWT)(req);
        if (decoded) {
            if (decoded.id === req.body.id) {
                return res.status(400).send({
                    error: 'What a fool. You cannot follow yourself. Nice try.',
                });
            }
            const idOfUserToFollow = req.body.id;
            const userToFollow = await models_1.User.findOne({ _id: idOfUserToFollow });
            if (userToFollow) {
                const idx = userToFollow.followers.indexOf(decoded.id);
                if (idx === -1) {
                    // we dont follow the user
                    userToFollow.followers.push(decoded.id);
                }
                else {
                    // we already follow the user so we splice
                    userToFollow.followers.splice(idx, 1);
                }
                await userToFollow.save();
                return res.sendStatus(204);
            }
            else {
                return res.status(404).send({ error: 'User not found' });
            }
        }
        else {
            return res.status(401).send({ error: 'Unauthorized' });
        }
    }
    catch (error) {
        return res.status(500).send({ error: (0, general_util_1.getErrorMessage)(error) });
    }
};
exports.followUser = followUser;
const getAllUsers = async (req, res) => {
    try {
        const LIMIT = 10;
        let { sort } = req.body;
        // if sort is not passed in the body, i dont want to sort
        const USERS = await models_1.User.find({});
        let arrOfUsers = [];
        for (let user of USERS) {
            let totalLikes = 0;
            const tracksOfUser = await models_1.Track.find({
                uploaded_by: user._id.toString(),
            });
            totalLikes = tracksOfUser.reduce((acc, track) => acc + track.liked_by.length, 0);
            arrOfUsers.push({
                _id: user._id.toString(),
                name: user.name,
                bio: user.bio,
                username: user.username,
                email: user.email,
                profile_pic_path: user.profile_pic_path,
                followers: user.followers,
                isPremium: user.isPremium,
                isPrivate: user.isPrivate,
                numberOfFollowers: user.followers.length,
                totalLikes: totalLikes,
                tracks: user.tracks,
            });
        }
        if (sort) {
            switch (sort) {
                case 'followers':
                    arrOfUsers.sort((a, b) => b.numberOfFollowers - a.numberOfFollowers);
                    break;
                case 'totalLikes':
                    arrOfUsers.sort((a, b) => b.totalLikes - a.totalLikes);
                    break;
                default:
                    arrOfUsers.sort((a, b) => b.numberOfFollowers - a.numberOfFollowers);
                    break;
            }
        }
        if (arrOfUsers.length > LIMIT) {
            return res.status(200).send(arrOfUsers.slice(0, LIMIT));
        }
        else {
            return res.status(200).send(arrOfUsers);
        }
    }
    catch (error) {
        console.log({ error });
        res.status(500).send({ error });
    }
};
exports.getAllUsers = getAllUsers;
const search = async (req, res) => {
    try {
        const { query } = req.params;
        console.log(query);
        const users = await models_1.User.find({
            $or: [
                { username: { $regex: new RegExp(query, 'i') } },
                { name: { $regex: new RegExp(query, 'i') } },
            ],
        });
        console.log(users);
        let usersToSend = [];
        if (users) {
            users.forEach((user) => {
                usersToSend.push({
                    name: user.name,
                    username: user.username,
                    id: user._id,
                    profile_pic_path: user.profile_pic_path,
                });
            });
            return res.status(200).send(usersToSend);
        }
        // if no users send 404
        return res.sendStatus(404);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};
exports.search = search;
const buyPremium = async (req, res) => {
    try {
        let duration = req.body.duration;
        if (!duration)
            duration = 1; // if no duration is passed, set it to 1 month
        const decoded = (0, general_util_1.getIdOfUserFromJWT)(req);
        if (decoded) {
            // check if the user is already premium
            const user = await models_1.User.findOne({ _id: decoded.id });
            // if yes, add the duration to the current date
            if (user) {
                if (user === null || user === void 0 ? void 0 : user.isPremium) {
                    const premiumUser = await models_1.Premium.findOne({ email: user.email });
                    if (premiumUser) {
                        // take the current date and add the duration to it
                        premiumUser.end_date = new Date(premiumUser.end_date).setDate(new Date(premiumUser.end_date).getDate() + duration);
                        // save the user
                        user.isPremium = true;
                        await user.save();
                        await premiumUser.save();
                        return res.sendStatus(204);
                    }
                }
                else {
                    // if no, set the date to the current date + duration
                    const premiumUser = new models_1.Premium({
                        email: user === null || user === void 0 ? void 0 : user.email,
                        start_date: new Date(),
                        end_date: new Date().setDate(new Date().getDate() + duration),
                    });
                    user.isPremium = true;
                    await user.save();
                    // save the user
                    await premiumUser.save();
                    return res.sendStatus(204);
                }
            }
        }
        return res.sendStatus(401);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};
exports.buyPremium = buyPremium;
