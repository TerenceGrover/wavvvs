import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { Track } from '../models/models';
import { ITrack } from '../entities/allEntities';
import jwt from 'jsonwebtoken';
const { SECRET_KEY } = process.env;

const uploadTrack = async (req: Request, res: Response) => {
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
      const newTrack: ITrack = {
        uploaded_by: decoded.id,
        path: req.file!.filename,
        title: req.file!.originalname,
        size: req.file!.size,
        date: Date.now(),
      };
      await Track.create(newTrack);
      res.status(200).send(newTrack);
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
    const track: ITrack | null = await Track.findOne({ path: id });
    // if the track doesn't exist, send 404
    if (!track) {
      return res.sendStatus(404);
    }
    // store the url of the track to delete
    const { path } = track;
    // delete the track from cloudinary
    const { deleted } = await cloudinary.uploader.destroy(path);
    // if its deleted, delete it from the database
    if (deleted) {
      // delete the track from the database
      await Track.deleteOne({ path: id });
      console.log('deleted from cloudinary');
    }
    res.sendStatus(204);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error });
  }
};

const saveTrackUrl = async (req: Request, res: Response) => {
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
      const { url } = req.body;
      const track: ITrack = {
        uploaded_by: id,
        path: url,
      };
      await Track.create(track);
    }
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error });
  }
};
export { uploadTrack, getAllTracks, deleteTrack, getUserTracks, saveTrackUrl };
