import { beforeEach } from 'vitest';
import { db } from '../db/db';

beforeEach(() => {
  db.todos = [];
});
