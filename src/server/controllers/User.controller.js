import { User } from '../models/models.js';

const getUser = async (req, res) => {
  const { username } = req.params;
  const user = await User.find({ user: username});
  res.status(200).send(user);
};

export { getUser };
