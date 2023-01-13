import { User } from './models/models.js';
import mongoose from 'mongoose';

export default async function () {
  try {
    await User.deleteMany({});
    console.log('Starting seed: all users deleted correctly');
  } catch (error) {
    console.log(error);
  }
  const fakeUser = {
    name: 'Mateo Presa',
    user_name: 'mateopresa',
    email: 'mateopresacastro@gmail.com',
    password: 'secret',
    bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id neque at nulla suscipit dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id neque at nulla suscipit dapibus.`,
    profile_pic_path: 'mateo_pic.jpeg',
    track0: 'audio0.wav',
    track1: 'audio1.wav',
    track2: 'audio2.wav',
  };
  try {
    const user = new User(fakeUser);
    await user.save();
    console.log('Seed successful: all users added 🤞🏼');
  } catch (error) {
    console.log(error);
  }
}
