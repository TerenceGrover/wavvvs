import * as fs from 'node:fs/promises';
import path from 'node:path';
import { Track } from './models/models.js';
import { millisecondsToHours } from 'date-fns';

const EVERY_30SECONDS = 30000;
const DAY_IN_MS = 86400000;

const removeExpiredTracksCronJob = () => {
  return setInterval(async () => {
    try {
      console.log('\n--------------------------------');
      console.log(
        'CRON JOB: Remove all expired tracks from db and file system ⏱'
      );
      await Track.deleteMany({ date: { $lt: Date.now() - DAY_IN_MS } }); // remove expired tracks
      let remainingTracksInDb = await Track.find({}, 'path -_id'); // get only the path field, removing also the _id field
      removeExpiredTracksFromFileSystem(remainingTracksInDb);
      console.log('\n--------------------------------');
    } catch (error) {
      console.log({ error: error });
    }
  }, EVERY_30SECONDS);
};

const removeExpiredTracksFromFileSystem = async (remainingTracksInDb) => {
  try {
    const tracksPublicDirectory = './public/tracks';
    const pathsInDbArr = remainingTracksInDb.map((obj) => obj.path);
    const filesInFs = await fs.readdir(tracksPublicDirectory);
    for (const file of filesInFs) {
      if (pathsInDbArr.includes(file) === false) {
        await fs.unlink(path.join(tracksPublicDirectory, file));
        console.log(
          `Expired track removed from file system: file name: ${file}`
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default removeExpiredTracksCronJob;
