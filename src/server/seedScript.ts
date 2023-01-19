import { User, Track, ITrack, IUser } from './models/models';
import * as fs from 'node:fs/promises';
import path from 'node:path';

const fakeUsers = [
  {
    name: 'Mateo Presa',
    user: 'mateopresa',
    email: 'mateopresacastro@gmail.com',
    password: 'secret',
    bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id neque at nulla suscipit dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id neque at nulla suscipit dapibus.`,
    profile_pic_path: 'mateo_pic.jpeg',
  },
  {
    name: 'Random Producer',
    user: 'randomproducer',
    email: 'randomproducer@gmail.com',
    password: 'secret',
    bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id neque at nulla suscipit dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id neque at nulla suscipit dapibus.`,
    profile_pic_path: 'randomproducer_pic.jpg',
  },
];

const fakeTracks = [
  {
    uploaded_by: 'randomproducer',
    path: 'audio0.wav',
    title: 'throwaway...',
    size: 123456,
    date: Date.now() // 6 hours ago
  },
  {
    uploaded_by: 'randomproducer',
    path: 'audio1.wav',
    title: 'vibes',
    size: 123456,
    date: Date.now(), // 5 hours ago
  },
  {
    uploaded_by: 'randomproducer',
    path: 'audio2.wav',
    title: 'this track will be deleted because it was uploaded 25 hours ago',
    size: 123456,
    date: Date.now(), // 25 hours ago
  },
];

const tracksToKeep = ['audio0.wav', 'audio1.wav', 'audio2.wav'];

const tracksPublicDirectory = './public/tracks';

export default async function () {
  try {
    for (const file of await fs.readdir(tracksPublicDirectory)) {
      if (tracksToKeep.includes(file) === false) {
        await fs.unlink(path.join(tracksPublicDirectory, file));
      }
    }
    console.log('Deleting files from public track directory...');

    await User.deleteMany({});
    await Track.deleteMany({});
    console.log('Starting seed: all users and tracks deleted from database');

    for (const fakeUser of fakeUsers) {
      const user : IUser = fakeUser;
      await User.create(user);
    }
    for (const fakeTrack of fakeTracks) {
      const track : ITrack = fakeTrack;
      await Track.create(track);
    }

    console.log('Seed successful: all users and tracks added to database🤞🏼\n');
  } catch (error) {
    console.log({ error });
  }
}
