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
const models_1 = require("./models/models");
const fs = __importStar(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const fakeUsers = [
    {
        isNew: false,
        name: 'Mateo Presa',
        user: 'mateopresa',
        email: 'mateopresacastro@gmail.com',
        password: 'secret',
        bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id neque at nulla suscipit dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id neque at nulla suscipit dapibus.`,
        profile_pic_path: 'mateo_pic.jpeg',
    },
    {
        isNew: true,
        name: 'Random Producer',
        user: 'randomproducer',
        email: 'randomproducer@gmail.com',
        password: 'secret',
        bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id neque at nulla suscipit dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id neque at nulla suscipit dapibus.`,
        profile_pic_path: 'randomproducer_pic.jpg',
    },
];
const fakeTracks = [
    {
        uploaded_by: 'randomproducer',
        path: 'audio0.wav',
        title: 'throwaway...',
        size: 123456,
        date: Date.now() // 6 hours ago
    },
    {
        uploaded_by: 'randomproducer',
        path: 'audio1.wav',
        title: 'vibes',
        size: 123456,
        date: Date.now(), // 5 hours ago
    },
    {
        uploaded_by: 'randomproducer',
        path: 'audio2.wav',
        title: 'this track will be deleted because it was uploaded 25 hours ago',
        size: 123456,
        date: Date.now(), // 25 hours ago
    },
];
const tracksToKeep = ['audio0.wav', 'audio1.wav', 'audio2.wav'];
const tracksPublicDirectory = './public/tracks';
async function default_1() {
    try {
        for (const file of await fs.readdir(tracksPublicDirectory)) {
            if (tracksToKeep.includes(file) === false) {
                await fs.unlink(node_path_1.default.join(tracksPublicDirectory, file));
            }
        }
        console.log('Deleting files from public track directory...');
        await models_1.User.deleteMany({});
        await models_1.Track.deleteMany({});
        console.log('Starting seed: all users and tracks deleted from database');
        for (const fakeUser of fakeUsers) {
            const user = fakeUser;
            await models_1.User.create(user);
        }
        for (const fakeTrack of fakeTracks) {
            const track = fakeTrack;
            await models_1.Track.create(track);
        }
        console.log('Seed successful: all users and tracks added to database🤞🏼\n');
    }
    catch (error) {
        console.log({ error });
    }
}
exports.default = default_1;
