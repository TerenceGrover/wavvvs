import express from 'express';
import multer from 'multer'
import * as Track from './controllers/Track.controller';
import * as User from './controllers/User.controller';
import checkFileSize from './middle-ware/checkFileSize';
import { auth } from './middle-ware/auth';
import fs from 'fs'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { username } = req.body;
    const path = `./public/tracks/${username}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });
const router = express.Router();

// LOGIN & REGISTER
router.post('/login', User.loginOne);

router.post('/register', User.registerOne);

// GET ANOTHER USER INFO (protected only if user has set isPrivate to true so im gonna check it inside.)
router.get('/user/:username', User.getAnotherUser);

/** ------------ PROTECTED ROUTES ------------ **/

// UPDATE PROFILE INFO
router.put('/me', auth, User.updateOne);

// POST TRACK 
router.post('/user/tracks',auth,checkFileSize,upload.single('track'),Track.uploadTrack);

// DELETE TRACK
router.delete('/delete/tracks', auth, Track.deleteTrack);

// GET TRACKS OF USER 
router.get('/user/tracks', auth, Track.getUserTracks);

// THIS NEVER GETS CALLED. DELETE ?
router.get('/alltracks', auth, Track.getAllTracks);

// GET USER INFO
router.get('/user', auth, User.getUser);



export default router;
