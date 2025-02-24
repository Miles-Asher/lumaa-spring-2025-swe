import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as db from './db.js';
import {JWT_SECRET} from './config.js';

export async function register(req: Request, res: Response) {
  const {username, password} = req.body;
  const existingUser = await db.getUser(username);
  if (existingUser) {
    return res.status(409).send();
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.addUser(username, hashedPassword);
  return res.status(201).json({message: 'User added'});
}

export async function login(req: Request, res: Response) {
  const {username, password} = req.body;
  const user = await db.getUser(username);
  if (!user) {
    return res.status(401).send();
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).send();
  }
  const token = jwt.sign({username: user.username}, JWT_SECRET, {expiresIn: '1h'});
  return res.status(200).json({token: token, id: user.id});
}