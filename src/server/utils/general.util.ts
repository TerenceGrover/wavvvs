import { Request } from 'express';
import jwt from 'jsonwebtoken';
const { SECRET_KEY } = process.env;
import { v2 as cloudinary } from 'cloudinary';
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
import { Track, User } from '../models/models';

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const getIdOfUserFromJWT = (req: Request) => {
  if (req.headers && req.headers.authorization) {
    let authorization = req.headers.authorization.split(' ')[1];
    let decoded: any = null;
    try {
      decoded = jwt.verify(authorization, SECRET_KEY!);
    } catch (e) {
      console.log(e);
    }
    return decoded;
  }
  return null;
};

export const deleteTrackFromCloudinaryAndDb = async (id: any, path: string) => {
  try {
    // using api key and secret
    cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
    });
    // delete the track from cloudinary
    // get last part of the url
    const lastPartOfUrl = path.split('/').pop();
    const lastPartOfUrlWithoutExtension = lastPartOfUrl?.split('.').shift();
    const buff = await cloudinary.uploader.destroy(
      lastPartOfUrlWithoutExtension!,
      { type: 'upload', resource_type: 'video' }
    );
    // if its deleted, delete it from the database
    if (buff.result === 'ok') {
      // delete the track from the database
      await Track.deleteOne({ _id: id });
      return true;
    }
    return false;
  } catch (error) {
    console.log({ error });
    return false;
  }
};

export const deleteUserBelongings = async (id: any) => {
  // get all tracks of the user
  const tracks = await Track.find({ uploaded_by: id });
  // delete all tracks from cloudinary and database
  for (const track of tracks) {
    await deleteTrackFromCloudinaryAndDb(track._id, track.path);
  }
  // delete all likes of the user
  const allTracks = await Track.find({});
  for (const track of allTracks) {
    let idx = track.liked_by.indexOf(id);
    if (idx !== -1) {
      track.liked_by.splice(idx, 1);
      await track.save();
    }
  }
  // delete the user from all other users followers
  const allUsers = await User.find({});
  for (const user of allUsers) {
    let idx = user.followers.indexOf(id);
    if (idx !== -1) {
      user.followers.splice(idx, 1);
      await user.save();
    }
  }
  // should be done. 
  return
};
