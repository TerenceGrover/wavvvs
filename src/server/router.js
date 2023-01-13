import express from 'express';
import multer from 'multer';
import uploadTrack from './controllers/upload-track.controller.js';

const upload = multer({ dest: './public/tracks' });

const router = express.Router();

router.post('/:userID/tracks', upload.single('track'), uploadTrack);
// router.get('/:userID',)

export default router;
