import { Track } from '../models/models.js';
// todo error handling

const uploadTrack = async (req, res) => {
  const { username } = req.params;
  const { originalname, filename, size } = req.file;
  const newTrack = new Track({
    uploaded_by: username,
    path: filename,
    title: originalname,
    size: size,
    date: new Date(),
  });
  await newTrack.save();
  res.status(200);
  res.send(newTrack);
};

const getAllTracks = async (req, res) => {
  const tracks = await Track.find({});
  res.status(200);
  res.send(tracks);
};

export { uploadTrack, getAllTracks };
