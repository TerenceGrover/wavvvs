import express from 'express';
import multer from 'multer'
import * as Track from './controllers/Track.controller';
import * as User from './controllers/User.controller';
import { auth } from './middle-ware/auth';
import fs from 'fs'

const storage = multer.diskStorage({
  destination: (req, _, cb) => {
    const { username } = req.body;
    const path = `./public/tracks/${username}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    cb(null, path);
  },
  filename: (_, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });
const router = express.Router();


/** ---------- NON - PROTECTED ROUTES ---------- **/


// LOGIN & REGISTER
router.post('/login', User.loginOne);

router.post('/register', User.registerOne);

// GET ANOTHER USER INFO (protected only if user has set isPrivate to true so im gonna check it inside.)
router.get('/user/:id', User.getAnotherUser);


/** ------------ PROTECTED ROUTES ------------ **/


/* -- USER RELATED ROUTES --*/

// UPDATE PROFILE INFO
router.put('/me', auth, User.updateOne);

// DELETE USER
router.delete('/user', auth, User.deleteUser);

// GET USER INFO
router.get('/user', auth, User.getUser);

// GET PROFILE INFO FROM SONG ID
router.get('/user/tracks/:id', auth, User.getUserFromSongId);

// FOLLOWS USER PASSED IN BODY 
router.put('/user/follow', auth, User.followUser);


/* -- TRACKS RELATED ROUTES --*/


// POST TRACK 
router.post('/user/tracks', auth, Track.saveTrackUrl);

// TESTING PORPUSES ONLY - POST TRACK BUT INJECTING YESTERDAY AS DATE
router.post('/test/user/tracks', auth, Track.TESTsaveTrackUrl);


// DELETE TRACK
router.delete('/track', auth, Track.deleteTrack);

// GET ALL TRACKS
router.get('/tracks/all', auth, Track.getAllTracks);

// LIKE A TRACK 
router.put('/track/like', auth, Track.likeTrack);

export default router;
