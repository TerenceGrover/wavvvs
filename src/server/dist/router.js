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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const Track = __importStar(require("./controllers/Track.controller"));
const User = __importStar(require("./controllers/User.controller"));
const checkFileSize_1 = __importDefault(require("./middle-ware/checkFileSize"));
const auth_1 = require("./middle-ware/auth");
const upload = (0, multer_1.default)({ dest: './public/tracks' });
const router = express_1.default.Router();
// LOGIN & REGISTER
router.post('/login', User.loginOne);
router.post('/register', User.registerOne);
/** ------------ PROTECTED ROUTES ------------ **/
// UPDATE PROFILE INFO
router.put('/me', auth_1.auth, User.updateOne);
// POST TRACK 
router.post('/user/tracks', auth_1.auth, checkFileSize_1.default, upload.single('track'), Track.uploadTrack);
// DELETE TRACK
router.delete('/delete/tracks', auth_1.auth, Track.deleteTrack);
// GET TRACKS OF USER 
router.get('/user/tracks', auth_1.auth, Track.getUserTracks);
// THIS NEVER GETS CALLED. DELETE ?
router.get('/alltracks', auth_1.auth, Track.getAllTracks);
// GET USER INFO
router.get('/users', auth_1.auth, User.getUser);
exports.default = router;
