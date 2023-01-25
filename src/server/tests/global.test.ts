import request from 'supertest';
import * as http from 'http';
import app from '../index';
import cloudinary from 'cloudinary';
import * as mypath from 'path';
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

let server: http.Server;

function startServer(): Promise<http.Server> {
  return new Promise((resolve) => {
    server = http.createServer(app);
    server.listen(3000, () => {
      resolve(server);
    });
  });
}

function stopServer(): Promise<void> {
  return new Promise((resolve) => {
    server.close(() => {
      resolve();
    });
  });
}

describe('login & register functionalities', () => {
  let token: string;
  beforeAll(async () => {
    await startServer();
  });

  afterAll(async () => {
    await stopServer();
  });

  it('should respond 200 if try to register an user', async () => {
    const res = await request(app).post('/register').send({
      email: 'test@gmail.com',
      password: '123456789',
      username: 'testale',
    });
    expect(res.status).toBe(200);
  });

  it('should respond 404 if try to login an user not registered', async () => {
    const res = await request(app).post('/login').send({
      email: 'notAle@gmail.com',
      password: '12345689111',
    });
    expect(res.status).toBe(404);
  });

  it('should respond 200 if try to login an user registered and give a token back', async () => {
    const res = await request(app).post('/login').send({
      email: 'test@gmail.com',
      password: '123456789',
    });
    token = res.body.token;
    expect(token).toBeTruthy();
    expect(res.status).toBe(200);
  });

  it('should respond 409 if try to register an user already registered', async () => {
    const res = await request(app).post('/register').send({
      email: 'test@gmail.com',
      password: '123456789',
      username: 'testale',
    });
    expect(res.status).toBe(409);
  });

  it('should delete a user', async () => {
    const res = await request(app)
      .delete('/user')
      .set('Authorization', `Bearer ${token}`)
      .send({
        password: '123456789',
      });
    expect(res.status).toBe(204);
  });
});

describe('interact with user functionalities', () => {
  let tokenOfUser1: string;
  beforeAll(async () => {
    await startServer();

    await request(app).post('/register').send({
      email: 'test@gmail.com',
      password: '12345689',
      username: 'testale',
    });
    const res = await request(app).post('/login').send({
      email: 'test@gmail.com',
      password: '12345689',
    });
    tokenOfUser1 = res.body.token;
  });

  afterAll(async () => {
    // delete ale
    await request(app)
      .delete('/user')
      .set('Authorization', `Bearer ${tokenOfUser1}`)
      .send({
        password: '12345689',
      });
    // delete terence
    await request(app)
      .delete('/user')
      .set('Authorization', `Bearer ${tokenOfUser2}`)
      .send({
        password: '123456789',
      });
    await stopServer();
  });

  it('should update an user profile', async () => {
    const res = await request(app)
      .put('/me')
      .send({
        name: 'test',
        bio: 'bio',
        profile_pic_path: 'path',
        isPrivate: false,
      })
      .set('Authorization', `Bearer ${tokenOfUser1}`);
    expect(res.status).toBe(204);
  });

  it('should post a track for the user', async () => {
    const filePath = mypath.join(
      __dirname,
      '..',
      'tests',
      'mocks',
      'rickroll.m4a'
    );
    cloudinary.v2.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
    });
    const upload = await cloudinary.v2.uploader.upload(filePath, {
      resource_type: 'video',
    });
    const path = upload.secure_url;
    console.log(path);
    const res = await request(app)
      .post('/user/tracks')
      .send({
        url: path,
      })
      .set('Authorization', `Bearer ${tokenOfUser1}`);
    expect(res.status).toBe(204);
  });

  let idOfUser1 = '';
  let arrOfTracks: any[];
  it('should get the user profile', async () => {
    const res = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${tokenOfUser1}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('test');

    idOfUser1 = res.body._id;
    arrOfTracks = res.body.tracks;
  });

  it('should automatically delete a track if its user is deleted', async () => {
    // TODO : implement this test
  });

  it('should throw an error if user tries to follow himself', async () => {
    // get user calling the /me endpoint
    const res = await request(app)
      .put('/user/follow')
      .send({
        id: idOfUser1,
      })
      .set('Authorization', `Bearer ${tokenOfUser1}`);
    expect(res.status).toBe(400);
  });

  let tokenOfUser2 = '';
  let idOfUser2 = '';
  it('should follow a new user', async () => {
    // register a new user
    await request(app).post('/register').send({
      email: 'test2@gmail.com',
      password: '123456789',
      username: 'testterence',
    });
    // login the new user
    const res = await request(app).post('/login').send({
      email: 'test2@gmail.com',
      password: '123456789',
    });
    tokenOfUser2 = res.body.token;
    // get the id of the new user
    const res2 = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${tokenOfUser2}`);
    idOfUser2 = res2.body._id;
    // follow the new user with the other user
    const res3 = await request(app)
      .put('/user/follow')
      .send({
        id: idOfUser2,
      })
      .set('Authorization', `Bearer ${tokenOfUser1}`);
    expect(res3.status).toBe(204);
    // get new user profile to see if the other user is in the followers array
    const res4 = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${tokenOfUser2}`);
    expect(res4.status).toBe(200);
    expect(res4.body.followers.length).toBe(1);
    expect(res4.body.followers[0]).toBe(idOfUser1);
  }, 5000);

  it('should remove one from followers if calls the follow endpoint while being already a follower', async () => {
    // follow the new user with the other user
    const res3 = await request(app)
      .put('/user/follow')
      .send({
        id: idOfUser2,
      })
      .set('Authorization', `Bearer ${tokenOfUser1}`);
    expect(res3.status).toBe(204);
    // get new user profile to see if the other user is removed from the followers array
    const res4 = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${tokenOfUser2}`);
    expect(res4.status).toBe(200);
    expect(res4.body.followers.length).toBe(0);
  });

  it('should like a user track', async () => {
    // make the user terence like ale song
    const res = await request(app)
      .put('/track/like')
      .send({
        trackId: arrOfTracks[0]._id,
      })
      .set('Authorization', `Bearer ${tokenOfUser2}`);
    expect(res.status).toBe(204);

    const res2 = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${tokenOfUser1}`);
    expect(res2.status).toBe(200);
    expect(res2.body.name).toBe('test');
    expect(res2.body.tracks[0].likes).toBe(1);
  });

  it('should remove like if user already likes the track', async () => {
    // make the user test2 like ale song
    const res = await request(app)
      .put('/track/like')
      .send({
        trackId: arrOfTracks[0]._id,
      })
      .set('Authorization', `Bearer ${tokenOfUser2}`);
    expect(res.status).toBe(204);

    const res2 = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${tokenOfUser1}`);
    expect(res2.status).toBe(200);
    expect(res2.body.name).toBe('test');
    expect(res2.body.tracks[0].likes).toBe(0);
  });

  it('should delete likes and following of user when user gets deleted', async () => {
    // make terence follow ale again
    const res = await request(app)
      .put('/user/follow')
      .send({
        id: idOfUser1,
      })
      .set('Authorization', `Bearer ${tokenOfUser2}`);
    expect(res.status).toBe(204);

    // make terence like ale's song again
    const res2 = await request(app)
      .put('/track/like')
      .send({
        trackId: arrOfTracks[0]._id,
      })
      .set('Authorization', `Bearer ${tokenOfUser2}`);
    expect(res2.status).toBe(204);

    const buff = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${tokenOfUser1}`);
    expect(buff.status).toBe(200);
    expect(buff.body.name).toBe('test');
    expect(buff.body.followers.length).toBe(1)
    // expect test's song lieks to be 0
    expect(buff.body.tracks[0].likes).toBe(1);

    // delete test2
    const res3 = await request(app)
      .delete('/user')
      .set('Authorization', `Bearer ${tokenOfUser2}`)
      .send({
        password: '123456789',
      });
    expect(res3.status).toBe(204);

    // expect test followers to be 0
    const res4 = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${tokenOfUser1}`);
    expect(res4.status).toBe(200);
    expect(res4.body.name).toBe('test');
    expect(res4.body.followers.length).toBe(0)
    // expect test's song lieks to be 0
    expect(res4.body.tracks[0].likes).toBe(0);

  });

  // delete ale's track
  it('should delete a track for the user', async () => {
    const res = await request(app)
      .delete('/track')
      .send({
        id: arrOfTracks[0]._id,
      })
      .set('Authorization', `Bearer ${tokenOfUser1}`);
    expect(res.status).toBe(204);

    const res2 = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${tokenOfUser1}`);
    expect(res2.status).toBe(200);
    expect(res2.body.name).toBe('test');
    expect(res2.body.tracks.length).toBe(0);
  });
});

describe('Server cronJob functionalities', () => { 
  let tokenOfUser1: string;
  beforeAll(async () => {
    await startServer();

    await request(app).post('/register').send({
      email: 'test@gmail.com',
      password: '12345689',
      username: 'test',
    });
    const res = await request(app).post('/login').send({
      email: 'test@gmail.com',
      password: '12345689',
    });
    tokenOfUser1 = res.body.token;
  });

  afterAll(async () => {
    // delete test
    await request(app)
      .delete('/user')
      .set('Authorization', `Bearer ${tokenOfUser1}`)
      .send({
        password: '12345689',
      });
    await stopServer();
  });

  it('should delete a track after 24 hours', async () => {
    // first post a track
    const filePath = mypath.join(
      __dirname,
      '..',
      'tests',
      'mocks',
      'rickroll.m4a'
    );
    cloudinary.v2.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
    });
    const upload = await cloudinary.v2.uploader.upload(filePath, {
      resource_type: 'video',
    });
    const path = upload.secure_url;
    console.log(path);
    // we can't wait 24 hours in a test so we will just post to a test route that injects a date in the past
    const res = await request(app)
      .post('/test/user/tracks')
      .send({ url: path })
      .set('Authorization', `Bearer ${tokenOfUser1}`);
    expect(res.status).toBe(204);

    // we wait 10 second to be sure that the track is deleted
    await new Promise((resolve) => {
      setTimeout(resolve, 15000);
    });
    const res2 = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${tokenOfUser1}`);
    expect(res2.status).toBe(200);
    expect(res2.body.tracks.length).toBe(0);
  }, 20000);
})

// describe('Frontend needs functionalities', async() => {
//   it('should retrieve top 10 users based on followers or total likes') {
//     // implement 
//   }
// })