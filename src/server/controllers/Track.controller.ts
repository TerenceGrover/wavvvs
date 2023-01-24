import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { Track } from '../models/models';
import { ITrack } from '../entities/allEntities';
import { getIdOfUserFromJWT } from '../utils/general.util';
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

const uploadTrack = async (req: Request, res: Response) => {
  try {
    // get the id from the token
    const decoded = getIdOfUserFromJWT(req);
    if (decoded) {
      const newTrack: ITrack = {
        uploaded_by: decoded.id,
        path: req.file!.filename,
        title: req.file!.originalname,
        size: req.file!.size,
        date: Date.now(),
      };
      await Track.create(newTrack);
      res.status(200).send(newTrack);
    } else {
      // getIdOfUserFromJWT returns null if the token is invalid so we send 401
      res.status(401).send('Unauthorized');
    }
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error });
  }
};

const getAllTracks = async (req: Request, res: Response) => {
  try {
    const tracks: ITrack[] = await Track.find({});
    res.status(200).send(tracks);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error });
  }
};

const getUserTracks = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const tracks: ITrack[] | undefined = await Track.find({
      uploaded_by: username,
    });
    // if user has tracks, send them. If not, 404
    tracks ? res.status(200).send(tracks) : res.sendStatus(404);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error });
  }
};

const deleteTrack = async (req: Request, res: Response) => {
  try {
    // get the id of the track to delete
    const { id } = req.body;
    // take the url of the track to delete from the database
    const track: ITrack | null = await Track.findOne({ _id: id });
    // if the track doesn't exist, send 404
    if (!track) {
      return res.sendStatus(404);
    }
    // store the url of the track to delete
    const { path } = track;
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
    console.log(lastPartOfUrlWithoutExtension);
    const buff = await cloudinary.uploader.destroy(
      lastPartOfUrlWithoutExtension!,
      { type: 'upload', resource_type: 'video' }
    );
    // if its deleted, delete it from the database
    if (buff.result === 'ok') {
      // delete the track from the database
      await Track.deleteOne({ _id: id });
      console.log('deleted from cloudinary AND database');
    }
    res.sendStatus(204);
  } catch (error) {
    // TODO : notify user of the error (means send back the error)
    // TODO : notify the developer of the error (maybe email the error)
    console.log({ error });
    res.status(500).send({ error });
  }
};

const saveTrackUrl = async (req: Request, res: Response) => {
  try {
    const decoded = getIdOfUserFromJWT(req);
    if (decoded) {
      const id = decoded.id;
      const { url } = req.body;
      const track: ITrack = {
        uploaded_by: id,
        path: url,
      };
      await Track.create(track);
      res.sendStatus(204);
    } else {
      // getIdOfUserFromJWT returns null if the token is invalid so we send 401
      res.status(401).send('Unauthorized');
    }
  } catch (error) {
    // TODO : notify user of the error (means send back the error)
    // TODO : notify the developer of the error (maybe email the error)
    console.log({ error });
    res.status(500).send({ error });
  }
};
export { uploadTrack, getAllTracks, deleteTrack, getUserTracks, saveTrackUrl };
