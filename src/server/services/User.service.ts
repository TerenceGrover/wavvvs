import { DocumentDefinition } from 'mongoose';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/models';
import bcrypt from 'bcrypt';
const saltRounds = 8;
const { SECRET_KEY } = process.env;

// this works. Maybe sanitize inputs.
export async function register(user: DocumentDefinition<IUser>) {
  const exists = await User.findOne({ email: user.email });
  if (exists) {
    throw new Error('User already exists');
  }
  if (user.password) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  try {
    // setting isNew to true so next time he logs in he will be automatically redirected to modify user page.
    const userToInsert = {
      isNew: true,
      name: user.name,
      email: user.email,
      bio: '',
      profile_pic_path: user.profile_pic_path,
    };
    const createdUser = await User.create(userToInsert);
    if (createdUser) {
      createdUser.toJSON();
      createdUser.password = '';
      return createdUser;
    }
  } catch (error) {
    throw error;
  }
}

// this works. Also sanitize inputs.
export async function login(user: DocumentDefinition<IUser>) {
  try {
    const foundUser = await User.findOne({ email: user.email });
    if (!foundUser) {
      throw new Error('Email of user is not correct');
    }
    const isMatch = bcrypt.compareSync(user.password!, foundUser.password!);
    if (isMatch) {
      const token = jwt.sign(
        { _id: foundUser._id?.toString(), name: foundUser.email },
        SECRET_KEY!,
        {
          expiresIn: '2 days',
        }
      );
      return {
        user: { name: foundUser.name, _id: foundUser._id },
        token: token,
      };
    } else {
      throw new Error('Password is not correct');
    }
  } catch (error) {
    throw error;
  }
}

export async function updateProfileInfo(user: DocumentDefinition<IUser>) {
  try {
    const foundUser = await User.findOne({ email: user.email });
    if (!foundUser) {
      throw new Error('Email of user is not correct');
    }
    foundUser.name = user.name;
    foundUser.bio = user.bio;
    foundUser.profile_pic_path = user.profile_pic_path;
    // change isNew to false since now it has logged in one time and from now on he will be redirected to dashboard
    foundUser.isNew = false;
    foundUser.save();
  } catch (error) {
    throw error;
  }
}
