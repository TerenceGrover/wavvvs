import express from 'express';
import multer from 'multer';
import uploadTrack from './controllers/upload-track.controller.js';

// const upload = multer({ dest: './public/tracks' });

const router = express.Router();

router.get('/tracks', (req, res) => {
  res.status(200);
  res.send('Post works');
});
// router.post('/:userID/tracks', upload.single('uploaded_file'), uploadTrack);

export default router;
