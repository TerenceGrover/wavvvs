import { Request } from 'express';
import jwt from 'jsonwebtoken';
const { SECRET_KEY } = process.env;

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const getIdOfUserFromJWT = (req: Request) => {
  if (req.headers && req.headers.authorization) {
    let authorization = req.headers.authorization.split(' ')[1];
    let decoded: any = null;
    try {
      decoded = jwt.verify(authorization, SECRET_KEY!);
    } catch (e) {
      console.log(e);
    }
    return decoded;
  }
  return null;
};