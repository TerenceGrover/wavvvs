import { User } from '../models/models.js';

export default async function uploadTrack(req, res) {
  const { username } = req.params;
  const { originalname, filename } = req.file;
  // todo: save path to track on user Model in database
  const user = await User.findOne({ user: username });
  if (!user.track0) {
    await User.findOneAndUpdate({ user: username }, { track0: filename });
  }
  if (!user.track1) {
    await User.findOneAndUpdate({ user: username }, { track1: filename });
  }
  if (!user.track2) {
    await User.findOneAndUpdate({ user: username }, { track2: filename });
  }
  const updatedUser = await User.findOne({ user: username });
  res.status(200);
  res.send(updatedUser);
}
