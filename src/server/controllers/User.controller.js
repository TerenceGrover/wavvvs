import { User } from '../models/models.js';

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).send(users[0]);
};

export { getAllUsers };
