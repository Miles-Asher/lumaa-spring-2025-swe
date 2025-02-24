import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import yaml from 'js-yaml';
import swaggerUi, {JsonObject} from 'swagger-ui-express';
import fs from 'fs';
import path from 'node:path';
import OpenApiValidator from 'express-openapi-validator';
import {fileURLToPath} from 'node:url';
import jwt from 'jsonwebtoken';

import * as auth from './auth.js';
import * as tasks from './tasks.js';
import {JWT_SECRET} from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');
const apiDoc = yaml.load(fs.readFileSync(apiSpec, 'utf8')) as JsonObject;
app.use('/api/v0/docs', swaggerUi.serve, swaggerUi.setup(apiDoc));

app.use(cors({origin: 'http://localhost:3010'}));

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);

function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) =>
    Promise<Response | void>) {
      return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
      };
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader ? authHeader.split(' ')[1] : null;
  if (token == null) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    req.user = user;
    next();
  });
}

// Auth routes
app.post('/api/v0/auth/register', asyncHandler(auth.register));
app.post('/api/v0/auth/login', asyncHandler(auth.login));

// Task routes
app.get('/api/v0/tasks', authenticateToken, asyncHandler(tasks.getTasks));
app.post('/api/v0/tasks', authenticateToken, asyncHandler(tasks.createTask));
app.put('/api/v0/tasks/:id', authenticateToken, asyncHandler(tasks.updateTask));
app.delete('/api/v0/tasks/:id', authenticateToken, asyncHandler(tasks.deleteTask));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

app.listen(3000, () => {
  return console.log('Express is listening at http://localhost:3000/api/v0/docs');
});

export default app;
