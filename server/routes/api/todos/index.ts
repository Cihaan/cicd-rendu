import { db } from '../../../db/db';
import { Todo } from '../../../models/todo';

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    return db.todos;
  }

  if (event.method === 'POST') {
    const body = await readBody<Omit<Todo, 'id'>>(event);
    const newTodo: Todo = {
      id: Date.now().toString(),
      ...body,
      completed: false,
    };
    db.todos.push(newTodo);
    return newTodo;
  }
});
