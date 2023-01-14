import { User } from './models/models.js';

const fakeUsers = [
  {
    name: 'Mateo Presa',
    user: 'mateopresa',
    email: 'mateopresacastro@gmail.com',
    password: 'secret',
    bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id neque at nulla suscipit dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id neque at nulla suscipit dapibus.`,
    profile_pic_path: 'mateo_pic.jpeg',
    track0: '',
    track1: '',
    track2: '',
  },
  {
    name: 'Random Producer',
    user: 'randomproducer',
    email: 'randomproducer@gmail.com',
    password: 'secret',
    bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id neque at nulla suscipit dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id neque at nulla suscipit dapibus.`,
    profile_pic_path: 'randomproducer_pic.jpg',
    track0: 'audio1.wav',
    track1: 'audio2.wav',
  },
];

export default async function () {
  try {
    await User.deleteMany({});
    console.log('Starting seed: all users deleted correctly');

    for (const fakeUser of fakeUsers) {
      const user = new User(fakeUser);
      await user.save();
    }

    console.log('Seed successful: all users added 🤞🏼');
  } catch (error) {
    console.log(error);
  }
}
