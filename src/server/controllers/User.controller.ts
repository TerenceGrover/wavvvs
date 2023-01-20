import { User, IUser } from '../models/models.js';
import { Request, Response } from 'express';
import * as userServices from '../services/User.service';
import { getErrorMessage } from '../utils/error.util';

const getUser = async (req: Request, res: Response) => {
  try {
    const username: string = req.body.username;
    const user: IUser | null = await User.findOne({ user: username });
    if (user) {
      const userToSend = {
        name: user.name,
        email: user.email,
        bio: user.bio,
        profile_pic_path: user.profile_pic_path,
      };
      res.status(200).send(userToSend);
    }
    // if user exists, return 200 and return the user, otherwise 404
    res.sendStatus(404);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error: getErrorMessage(error) });
  }
};

const loginOne = async (req: Request, res: Response) => {
  try {
    const foundUser = await userServices.login(req.body);
    res.status(200).send(foundUser);
  } catch (error) {
    return res.status(500).send({ error: getErrorMessage(error) });
  }
};

const registerOne = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const user = await userServices.register(req.body);
    res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: getErrorMessage(error) });
  }
};

const updateOne = async (req: Request, res: Response) => {
  try {
    const user = await userServices.updateProfileInfo(req.body);
    res.status(204).send(user);
  } catch (error) {
    return res.status(500).send({ error: getErrorMessage(error) });
  }
};

export { getUser, loginOne, registerOne, updateOne };
