import { User, IUser } from '../models/models.js';
import { Request, Response } from 'express';

const getUser = async (req: Request, res: Response) => {
  try {
    const username :string = req.body.username;
    const user: IUser | null = await User.findOne({ user: username });

    // if user exists, return 200 and return the user, otherwise 404
    user ? res.status(200).send(user) : res.sendStatus(404);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error });
  }
};
export { getUser };
