import { Todo } from '../models/todo';

interface DB {
  todos: Todo[];
}

export const db: DB = {
  todos: [],
};
