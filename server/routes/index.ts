import { db } from '../db/db';
import { Todo } from '../models/todo';

export default defineEventHandler(async (event) => {
  const method = event.method;
  const id = getRouterParam(event, 'id');

  if (method === 'GET' && !id) {
    return db.todos;
  }

  if (method === 'GET' && id) {
    return db.todos.find((todo) => todo.id === id);
  }

  if (method === 'POST') {
    const body = await readBody<Omit<Todo, 'id'>>(event);
    const newTodo: Todo = {
      id: Date.now().toString(),
      ...body,
      completed: false,
    };
    db.todos.push(newTodo);
    return newTodo;
  }

  if (method === 'PUT' && id) {
    const body = await readBody<Partial<Todo>>(event);
    const todoIndex = db.todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      db.todos[todoIndex] = { ...db.todos[todoIndex], ...body };
      return db.todos[todoIndex];
    }
    throw createError({ statusCode: 404, message: 'Todo not found' });
  }

  if (method === 'DELETE' && id) {
    const todoIndex = db.todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      const [removedTodo] = db.todos.splice(todoIndex, 1);
      return removedTodo;
    }
    throw createError({ statusCode: 404, message: 'Todo not found' });
  }
});
