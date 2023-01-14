import { User, Track } from './models/models.js';

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
    title: 'Track 1',
    size: 123456,
  },
  {
    uploaded_by: 'randomproducer',
    path: 'audio1.wav',
    title: 'Track 2',
    size: 123456,
  },
];

export default async function () {
  try {
    await User.deleteMany({});
    await Track.deleteMany({});
    console.log('Starting seed: all users and tracks deleted correctly');

    for (const fakeUser of fakeUsers) {
      const user = new User(fakeUser);
      await user.save();
    }
    for (const fakeTrack of fakeTracks) {
      const track = new Track(fakeTrack);
      await track.save();
    }

    console.log('Seed successful: all users and tracks added 🤞🏼');
  } catch (error) {
    console.log(error);
  }
}
