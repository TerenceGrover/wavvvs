import express from 'express';
import multer from 'multer'
import * as Track from './controllers/Track.controller';
import * as User from './controllers/User.controller';
import checkFileSize from './middle-ware/checkFileSize';

const upload = multer({ dest: './public/tracks' });

const router = express.Router();

// refactored 
router.post('/user/tracks',
  checkFileSize,
  upload.single('track'),
  Track.uploadTrack
);

router.delete('/delete/tracks', Track.deleteTrack);

// refactored 
router.get('/user/tracks', Track.getUserTracks);

// THIS NEVER GETS CALLED. DELETE ?
router.get('/alltracks', Track.getAllTracks);

// refactored
router.get('/users', User.getUser);

export default router;
