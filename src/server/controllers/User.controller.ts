import { User, Track } from '../models/models';
import { IUser } from '../entities/allEntities';
import { Request, Response } from 'express';
import * as userServices from '../services/User.service';
import { getErrorMessage } from '../utils/general.util';
import { getIdOfUserFromJWT } from '../utils/general.util';

const getUser = async (req: Request, res: Response) => {
  try {
    const decoded = getIdOfUserFromJWT(req);
    if (decoded) {
      const id = decoded.id;
      // Fetch the user by id
      const user = await User.findOne({ _id: id });
      let userToSend: any = {};
      if (user) {
        userToSend = {
          username: user.username,
          email: user.email,
          isPrivate: user.isPrivate,
          isNewUser: user.isNewUser,
          profile_pic_path: user.profile_pic_path,
          bio: user.bio,
          tracks: [],
        };
        // seach in Track all the tracks that have the user id as uploaded by
        const tracks = await Track.find({ uploaded_by: id });
        let arrOfTracks: any = [];
        tracks.forEach((track) => {
          arrOfTracks.push({
            _id: track._id,
            path: track.path,
          });
        });
        userToSend.tracks = arrOfTracks;
        return res.status(200).send(userToSend);
      } else return res.sendStatus(404);
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
    const decoded = getIdOfUserFromJWT(req);
    if (decoded) {
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
      isPrivate: userToFind.isPrivate,
      // TODO : tracks ??
    };
    // if user asked is private, go on checking auth token.
    if (userToFind.isPrivate) {
      const decoded = getIdOfUserFromJWT(req);
      if (decoded) {
        return res.status(200).send(userToSend);
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
    const decoded = getIdOfUserFromJWT(req);
    let deleted;
    if (decoded) {
      deleted = await User.deleteOne({ _id: decoded.id });
    } else {
      return res.status(401).send('unauthorized');
    }
    if (deleted) {
      return res.sendStatus(204);
    } else return res.sendStatus(500);
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
