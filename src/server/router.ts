import express from 'express';
import multer from 'multer'
import * as Track from './controllers/Track.controller';
import * as User from './controllers/User.controller';
import checkFileSize from './middle-ware/checkFileSize';
import { auth } from './middle-ware/auth';

const upload = multer({ dest: './public/tracks' });
const router = express.Router();

// LOGIN & REGISTER
router.post('/login', User.loginOne);

router.post('/register', User.registerOne);

// refactored 
router.post('/user/tracks',
auth,
checkFileSize,
upload.single('track'),
Track.uploadTrack
);

router.delete('/delete/tracks', auth, Track.deleteTrack);

// refactored 
router.get('/user/tracks', auth, Track.getUserTracks);

// THIS NEVER GETS CALLED. DELETE ?
router.get('/alltracks', auth, Track.getAllTracks);

// refactored
router.get('/users', auth, User.getUser);

export default router;
