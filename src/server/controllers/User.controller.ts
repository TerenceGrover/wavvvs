import { User } from '../models/models';
import { IUser } from '../entities/allEntities';
import { Request, Response } from 'express';
import * as userServices from '../services/User.service';
import { getErrorMessage } from '../utils/error.util';
import jwt from 'jsonwebtoken';
const { SECRET_KEY } = process.env;

const getUser = async (req: Request, res: Response) => {
  try {
    if (req.headers && req.headers.authorization) {
      console.log(req.headers.authorization);
      let authorization = req.headers.authorization.split(' ')[1],
        decoded: any;
      try {
        decoded = jwt.verify(authorization, SECRET_KEY!);
      } catch (e) {
        return res.status(401).send('unauthorized');
      }
      const id = decoded.id;
      // Fetch the user by id
      User.findOne({ _id: id }).then(function (user) {
        if (user) {
          user.password = '';
          return res.status(200).send(user);
        } else return res.sendStatus(404);
      });
    }
    // return res.send(500);
  } catch (error) {
    console.log({ error });
    return res.status(500).send({ error: getErrorMessage(error) });
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
      isPrivate: false,
      isNewUser: true,
      username,
      email,
      password,
    };
    const user = await userServices.register(userToRegister);
    res.status(200).send(user);
  } catch (error) {
    let strError = getErrorMessage(error);
    if (strError === 'User already exists') return res.sendStatus(409);
    return res.status(500).send({ error: getErrorMessage(error) });
  }
};

const updateOne = async (req: Request, res: Response) => {
  try {
    if (req.headers && req.headers.authorization) {
      console.log(req.headers.authorization);
      let authorization = req.headers.authorization.split(' ')[1],
        decoded: any;
      try {
        decoded = jwt.verify(authorization, SECRET_KEY!);
      } catch (e) {
        return res.status(401).send('unauthorized');
      }
      const id = decoded.id;
      const { name, bio, profile_pic_path, isPrivate } = req.body;
      // here whatever is not being passed in req body will be undefined.
      const userToUpdate = {
        _id: id,
        isNewUser: false,
        isPrivate,
        name,
        bio,
        profile_pic_path,
      };
      const user = await userServices.updateProfileInfo(userToUpdate);
      if (user) res.sendStatus(204);
      else res.sendStatus(500);
    }
  } catch (error) {
    return res.status(500).send({ error: getErrorMessage(error) });
  }
};

// gets info about another user.
// if the user we want the info bout is private, im gonna check if you sent auth token.
const getAnotherUser = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const userToFind = await User.findOne({ username: username });
    if (!userToFind) throw new Error('User not found');
    const userToSend = {
      name: userToFind.name,
      bio: userToFind.bio,
      username: userToFind.username,
      email: userToFind.email,
      profile_pic_path: userToFind.profile_pic_path,
      // tracks ??
    };
    // if user asked is private, go on checking auth token.
    if (userToFind.isPrivate) {
      if (req.headers && req.headers.authorization) {
        let authorization = req.headers.authorization.split(' ')[1],
          decoded: any;
        try {
          decoded = jwt.verify(authorization, SECRET_KEY!);
        } catch (e) {
          return res.status(401).send('unauthorized');
        }
        if (decoded) {
          return res.status(200).send(userToSend);
        }
      } else return res.status(401).send('unauthorized');
    } else {
      // here user asked for is not private, so send it straight away.
      return res.status(200).send(userToSend);
    }
  } catch (error) {
    return res.status(500).send({ error: getErrorMessage(error) });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    if (req.headers && req.headers.authorization) {
      let authorization = req.headers.authorization.split(' ')[1],
        decoded: any;
      try {
        decoded = jwt.verify(authorization, SECRET_KEY!);
      } catch (e) {
        return res.status(401).send('unauthorized');
      }
      let deleted;
      if (decoded) {
        deleted = await User.deleteOne({ _id: decoded.id });
      }
      if (deleted) {
        return res.sendStatus(204);
      } else return res.sendStatus(500);
    } else return res.status(401).send('unauthorized');
  } catch (error) {
    return res.status(500).send({ error: getErrorMessage(error) });
  }
};

export {
  getUser,
  loginOne,
  registerOne,
  updateOne,
  getAnotherUser,
  deleteUser,
};
