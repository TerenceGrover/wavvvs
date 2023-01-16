import { User } from '../models/models.js';

const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ user: username });
    res.status(200).send(user);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error });
  }
};
export { getUser };
