import fs from 'fs';
import path from 'path';
import type { User } from '../../types/types';

const filePath = path.resolve(__dirname, '../../data/users.json');

export function readUsers(): User[] {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data) as User[];
}

export function writeUsers(users: User[]): void {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}
