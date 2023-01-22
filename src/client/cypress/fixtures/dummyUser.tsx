import type { CurrentUser } from '../../src/Interfaces';

export const notNewdummyUser : CurrentUser = {
  name: 'John Doe',
  profile_pic_path: 'https://i.imgur.com/1Q9ZQ9r.jpg',
  _id: '1',
  _v: 1,
  email: 'dummyUser@gmail.com',
  isNew : false,
  bio: 'I am a dummy user',
  username : 'dummyUser',
  tracks : [],
};

export const newdummyUser : CurrentUser = {
  name: 'John Doe',
  profile_pic_path: 'https://i.imgur.com/1Q9ZQ9r.jpg',
  _id: '1',
  _v: 1,
  email: 'dummyUser@gmail.com',
  isNew : true,
  bio: 'I am a dummy user',
  username : 'dummyUser',
  tracks : [],
};
