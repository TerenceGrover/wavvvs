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


/** ------------ PROTECTED ROUTES ------------ **/

// UPDATE PROFILE INFO
router.put('/me', auth, User.updateOne);

// POST TRACK 
router.post('/user/tracks',
auth,
checkFileSize,
upload.single('track'),
Track.uploadTrack
);

// DELETE TRACK
router.delete('/delete/tracks', auth, Track.deleteTrack);

// GET TRACKS OF USER 
router.get('/user/tracks', auth, Track.getUserTracks);

// THIS NEVER GETS CALLED. DELETE ?
router.get('/alltracks', auth, Track.getAllTracks);

// GET USER INFO
router.get('/user', auth, User.getUser);

export default router;
