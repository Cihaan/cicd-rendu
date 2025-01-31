import * as h3 from 'h3';
import { H3Event } from 'h3';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { db } from '../../../db/db';
import todosHandler from './index';

vi.mock('h3', async () => {
  const actual = await vi.importActual('h3');
  return {
    ...(actual as Object),
    readBody: vi.fn(),
  };
});

vi.mock('../../../db/db', () => ({
  db: {
    todos: [],
  },
}));

describe('todos route handler', () => {
  beforeEach(() => {
    db.todos = [];
    vi.clearAllMocks();
  });

  it('GET should return all todos', async () => {
    const mockTodos = [
      { id: '1', title: 'Test todo', completed: false },
      { id: '2', title: 'Another todo', completed: true },
    ];
    db.todos = mockTodos;

    const mockEvent = {
      method: 'GET',
      node: {
        req: {},
      },
    } as unknown as H3Event;

    const result = await todosHandler(mockEvent);
    // should break
    expect(result).toEqual([]);
  });

  it('POST should create and return a new todo', async () => {
    const mockDate = '1234567890';
    vi.spyOn(Date, 'now').mockImplementation(() => Number(mockDate));

    const todoData = {
      title: 'New todo',
    };

    vi.mocked(h3.readBody).mockResolvedValue(todoData);

    const mockEvent = {
      method: 'POST',
      node: {
        req: {},
      },
    } as unknown as H3Event;

    const expectedTodo = {
      id: mockDate,
      title: 'New todo',
      completed: false,
    };

    const result = await todosHandler(mockEvent);
    expect(result).toEqual(expectedTodo);
    expect(db.todos).toHaveLength(1);
    expect(db.todos[0]).toEqual(expectedTodo);
  });
});
