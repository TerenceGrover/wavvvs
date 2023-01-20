import { DocumentDefinition } from 'mongoose';
import { User, IUser } from '../models/models';
import bcrypt from 'bcrypt';

export async function register(user: DocumentDefinition<IUser>): Promise<void> {
  console.log(user);
  try {
    await User.create(user);
  } catch (error) {
    throw error;
  }
}

// export async function login(user: DocumentDefinition<IUser>) {
//   try {
//     const foundUser = await User.findOne({
//       name: user.name,
//       password: user.password,
//     });
//   } catch (error) {
//     throw error;
//   }
// }

export async function login(user: DocumentDefinition<IUser>) {
  try {
    const foundUser = await User.findOne({ name: user.name });

    if (!foundUser) {
      throw new Error('Name of user is not correct');
    }

    const isMatch = bcrypt.compareSync(user.password, foundUser.password);

    if (isMatch) {
      return foundUser;
    } else {
      throw new Error('Password is not correct');
    }
  } catch (error) {
    throw error;
  }
}
