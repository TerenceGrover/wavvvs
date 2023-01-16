import * as fs from 'node:fs/promises';
import path from 'node:path';
import { Track } from '../models/models.js';

const uploadTrack = async (req, res) => {
  try {
    const { username } = req.params;
    const { originalname, filename, size } = req.file;
    const newTrack = new Track({
      uploaded_by: username,
      path: filename,
      title: originalname,
      size: size,
      date: new Date(),
    });
    await newTrack.save();
    res.status(200).send(newTrack);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.find({});
    res.status(200).send(tracks);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getUserTracks = async (req, res) => {
  try {
    const { username } = req.params;
    console.log(username);
    const tracks = await Track.find({ uploaded_by: username });
    res.status(200).send(tracks);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const tracksPublicDirectory = './public/tracks'; // path relative to the node process

const deleteTrack = async (req, res) => {
  try {
    // The name of the file is the id of the track, and the path at the same time.
    const { id } = req.params;
    const { deletedCount } = await Track.deleteOne({ path: id });
    if (deletedCount) {
      await fs.unlink(path.join(tracksPublicDirectory, id));
    }
    res.status(200).send({ deletedCount });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

export { uploadTrack, getAllTracks, deleteTrack, getUserTracks };
