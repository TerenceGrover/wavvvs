import express from 'express';
import multer from 'multer';
import * as Track from './controllers/Track.controller.js';
import * as User from './controllers/User.controller.js';

const upload = multer({ dest: './public/tracks' });

const router = express.Router();

router.post('/:username/tracks', upload.single('track'), Track.uploadTrack);

router.get('/alltracks', Track.getAllTracks);
router.get('/:username', User.getUser);

export default router;
