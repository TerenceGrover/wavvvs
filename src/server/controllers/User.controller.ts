import { User, IUser } from '../models/models.js';
import { Request, Response } from 'express';
import * as userServices from '../services/User.service';
import { getErrorMessage } from '../utils/error.util';
import jwt, {Secret} from 'jsonwebtoken';
const { SECRET_KEY } = process.env;

const getUser = async (req: Request, res: Response) => {
  try {

    if (req.headers && req.headers.authorization) {
      let authorization = req.headers.authorization.split(' ')[1],
          decoded:any;
      try {
          decoded = jwt.verify(authorization, SECRET_KEY!);
      } catch (e) {
          return res.status(401).send('unauthorized');
      }
      const id = decoded.id;
      // Fetch the user by id 
      User.findOne({_id: id}).then(function(user){
          // Do something with the user
          user!.password = '';
          return res.status(200).send(user);
      });
  }
  return res.send(500);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error: getErrorMessage(error) });
  }
};

const loginOne = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userToLog = {
      email,
      password,
    };
    const foundUser = await userServices.login(userToLog);
    res.status(200).send(foundUser);
  } catch (error) {
    return res.status(500).send({ error: getErrorMessage(error) });
  }
};

const registerOne = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const userToRegister: IUser = {
      isNew: true,
      username,
      email,
      password,
    };
    const user = await userServices.register(userToRegister);
    res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: getErrorMessage(error) });
  }
};

const updateOne = async (req: Request, res: Response) => {
  try {
    const { name, email, bio, profile_pic_path } = req.body;
    const userToUpdate: IUser = {
      isNew: false,
      name,
      email,
      bio,
      profile_pic_path,
      password: '',
    };
    const user = await userServices.updateProfileInfo(userToUpdate);
    res.status(204).send(user);
  } catch (error) {
    return res.status(500).send({ error: getErrorMessage(error) });
  }
};

export { getUser, loginOne, registerOne, updateOne };
