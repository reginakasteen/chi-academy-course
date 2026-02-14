import express, { Request, Response } from 'express';
import cors from 'cors';
import { body, param, validationResult } from 'express-validator';
import fs from 'fs';
import path from 'path';

import type { User } from './types/types';


const app = express();
app.use(cors());
app.use(express.json());


//read and write data
const filePath = path.resolve(__dirname, './data/users.json');

function readUsers(): User[] {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data) as User[];
}

function writeUsers(users: User[]): void {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}



//routes
app.get('/', (_req: Request, res: Response) => {
  res.json({ author: 'Albina Kostyuchenko' });
});

app.get('/users', (_req: Request, res: Response) => {
  res.json(readUsers());
});

app.get(
  '/users/:id',
  param('id').isInt({ min: 1 }),
  (req: Request<{ id: string }>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const users = readUsers();
    const user = users.find(u => u.id === Number(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  }
);

app.post(
  '/users',
  body('user').isString(),
  body('email').isEmail(),
  (req: Request<{}, {}, { user: string; email: string }>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const users = readUsers();
    const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;

    const newUser: User = {
      id: newId,
      user: req.body.user,
      email: req.body.email
    };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json(newUser);
  }
);

app.patch(
  '/users/:id',
  param('id').isInt({ min: 1 }),
  body('user').optional().isString(),
  body('email').optional().isEmail(),
  (req: Request<{ id: string }, {}, Partial<{ user: string; email: string }>>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const users = readUsers();
    const user = users.find(u => u.id === Number(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });

    Object.assign(user, req.body);
    writeUsers(users);

    res.json(user);
  }
);

app.delete(
  '/users/:id',
  param('id').isInt({ min: 1 }),
  (req: Request<{ id: string }>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const users = readUsers();
    const filtered = users.filter(u => u.id !== Number(req.params.id));
    if (filtered.length === users.length) return res.status(404).json({ message: 'User not found' });

    writeUsers(filtered);
    res.json({ success: true });
  }
);

app.use((err: any, _req: Request, res: Response, _next: Function) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
