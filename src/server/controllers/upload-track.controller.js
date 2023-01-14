import { Track } from '../models/models.js';
// todo error handling
export default async function uploadTrack(req, res) {
  const { username } = req.params;
  const { originalname, filename, size } = req.file;
  const newTrack = new Track({
    uploaded_by: username,
    path: filename,
    title: originalname,
    size: size,
  });
  await newTrack.save();
  res.status(200);
  res.send(newTrack);
}
