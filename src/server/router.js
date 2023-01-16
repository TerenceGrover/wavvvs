import express from 'express';
import multer from 'multer';
import * as Track from './controllers/Track.controller.js';
import * as User from './controllers/User.controller.js';
import checkFileSize from './middle-ware/checkFileSize.js';

const upload = multer({ dest: './public/tracks' });

const router = express.Router();

router.post(
  '/:username/tracks',
  checkFileSize,
  upload.single('track'),
  Track.uploadTrack
);

router.delete('/delete/tracks/:id', Track.deleteTrack);

router.get('/:username/tracks', Track.getUserTracks);
router.get('/alltracks', Track.getAllTracks);
router.get('/:username', User.getUser);

export default router;
