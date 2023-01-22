import request from 'supertest';
import app from '../index';

describe('GET /', () => {

  test('waits 5 second before running', async () => {
    jest.useFakeTimers();
    const callback = jest.fn();
    setTimeout(callback, 5000);
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
  });

  it('should respond 404 if try to login an user not registered', async () => {
    const res = await request(app).post('/api/user/login').send({
      email: 'ale@gmail.com',
      password: '12345689',
    });
    expect(res.status).toBe(404);
  });
});
