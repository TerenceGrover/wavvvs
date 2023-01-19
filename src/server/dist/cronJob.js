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
const fs = __importStar(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const models_js_1 = require("./models/models.js");
const EVERY_30SECONDS = 30000;
const DAY_IN_MS = 86400000;
const removeExpiredTracksCronJob = () => {
    return setInterval(async () => {
        try {
            console.log('CRON JOB: Removing all expired tracks from db and file system ⏱...');
            await models_js_1.Track.deleteMany({ date: { $lt: Date.now() - DAY_IN_MS } }); // remove expired tracks
            const remainingTracksInDb = await models_js_1.Track.find({}, 'path -_id'); // get only the path field, removing also the _id field
            const numberOfDeletedFiles = await removeExpiredTracksFromFileSystem(remainingTracksInDb);
            console.log(`${numberOfDeletedFiles} files deleted\n`);
        }
        catch (error) {
            console.log({ error });
        }
    }, EVERY_30SECONDS);
};
const removeExpiredTracksFromFileSystem = async (remainingTracksInDb) => {
    // go inside folder, and check if there is some songs that are NOT in the remainingTracksInDb array passed.
    // if some is found, it is deleted.
    try {
        let numberOfDeleteFiles = 0;
        const tracksPublicDirectory = './public/tracks';
        const pathsInDbArr = remainingTracksInDb.map((obj) => obj.path);
        const tracksInFs = await fs.readdir(tracksPublicDirectory);
        for (const track of tracksInFs) {
            if (!pathsInDbArr.includes(track)) {
                await fs.unlink(node_path_1.default.join(tracksPublicDirectory, track));
                numberOfDeleteFiles++;
                console.log(`Expired track removed from file system: file name: ${track}`);
            }
        }
        return numberOfDeleteFiles;
    }
    catch (error) {
        let msg = 'Unknow Error';
        if (error instanceof Error)
            msg = error.message;
        throw new Error(msg);
    }
};
exports.default = removeExpiredTracksCronJob;
