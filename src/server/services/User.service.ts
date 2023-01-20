import { DocumentDefinition } from 'mongoose';
import { User, IUser } from '../models/models';
import bcrypt from 'bcrypt';
const saltRounds = 8;

// this works. Maybe sanitize inputs.
export async function register(user: DocumentDefinition<IUser>) {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  try {
    const createdUser = await User.create(user);
    if(createdUser) {
      createdUser.toJSON();
      delete createdUser.password
      return createdUser;
    }
  } catch (error) {
    throw error;
  }
}

// this works. Also sanitize inputs.
export async function login(user: DocumentDefinition<IUser>) {
  try {
    const foundUser = await User.findOne({ name: user.name });
    if (!foundUser) {
      throw new Error('Name of user is not correct');
    }
    const isMatch = bcrypt.compareSync(user.password!, foundUser.password!);
    if (isMatch) {
      return foundUser;
    } else {
      throw new Error('Password is not correct');
    }
  } catch (error) {
    throw error;
  }
}
