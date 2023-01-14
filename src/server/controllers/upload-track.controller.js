import { User } from '../models/models.js';

export default async function uploadTrack(req, res) {
  console.log('im here in uploadTrack controller');
  const { username } = req.params;
  const { originalname, filename } = req.file;
  // todo: save path to track on user Model in database
  const user = await User.findOne({ user: username });
  console.log({ user });
  if (user.track0 === '') {
    await User.findOneAndUpdate({ user: username }, { track0: filename });
    sendUserBackToClient(username, res);
  }
  if (user.track1 === '') {
    await User.findOneAndUpdate({ user: username }, { track1: filename });
    sendUserBackToClient(username, res);
  }
  if (user.track2 === '') {
    await User.findOneAndUpdate({ user: username }, { track2: filename });
    sendUserBackToClient(username);
  }
  // const updatedUser = await User.findOne({ user: username });
  // console.log({ updatedUser });
  // res.status(200);
  // res.send(updatedUser);
}

const sendUserBackToClient = async (username, res) => {
  const updatedUser = await User.findOne({ user: username });
  console.log({ updatedUser });
  res.status(200);
  res.send(updatedUser);
};
