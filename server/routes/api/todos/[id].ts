import { db } from '../../../db/db';
import { Todo } from '../../../models/todo';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  if (event.method === 'GET') {
    const todo = db.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw createError({ statusCode: 404, message: 'Todo not found' });
    }
    return todo;
  }

  if (event.method === 'PUT') {
    const body = await readBody<Partial<Todo>>(event);
    const todoIndex = db.todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      db.todos[todoIndex] = { ...db.todos[todoIndex], ...body };
      return db.todos[todoIndex];
    }
    throw createError({ statusCode: 404, message: 'Todo not found' });
  }

  if (event.method === 'DELETE') {
    const todoIndex = db.todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      const [removedTodo] = db.todos.splice(todoIndex, 1);
      return removedTodo;
    }
    throw createError({ statusCode: 404, message: 'Todo not found' });
  }
});
