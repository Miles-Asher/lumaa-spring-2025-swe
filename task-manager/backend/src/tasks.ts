import {Request, Response} from 'express';
import * as db from './db.js';

export async function getTasks(req: Request, res: Response) {
  const userId = req.query.userId as string;
  let tasks;
  if (userId) {
    tasks = await db.getTasksByUserId(userId);
  } else {
    tasks = await db.getAllTasks();
  }
  return res.status(200).json(tasks);
}

export async function createTask(req: Request, res: Response) {
  const {userId, title, description} = req.body;
  if (!userId || !title) {
    return res.status(400).send();
  }
  await db.addTask(userId, title, description);
  return res.status(201).json({message: 'Task created'});
}

export async function updateTask(req: Request, res: Response) {
  const {id} = req.params;
  const {title, description, isComplete} = req.body;
  if (!id) {
    return res.status(400).send();
  }
  const task = await db.updateTask(id, title, description, isComplete);
  if (!task) {
    return res.status(404).send();
  }
  return res.status(200).json({message: 'Task updated'});
}

export async function deleteTask(req: Request, res: Response) {
  const {id} = req.params;
  if (!id) {
    return res.status(400).send();
  }
  const result = await db.deleteTask(id);
  if (!result) {
    return res.status(404).send();
  }
  return res.status(204).send();
}