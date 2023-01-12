import app from './index.js';
import multer from 'multer';
import uploadTrack from './controllers/upload-track.controller.js';

const upload = multer({ dest: './public/tracks' });

const router = app.router();

router.post('/:userID/tracks', upload.single('uploaded_file'), uploadTrack);

export default router;
