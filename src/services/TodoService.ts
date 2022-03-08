import { ITodo } from 'interfaces';
import { Api } from 'providers';

const getTodos = () => Api.get<ITodo[]>('/todos');

const createTodo = (todo: Pick<ITodo, 'title' | 'completed'>) => Api.post('/todos', todo);

const updateTodo = (id: string, todo: Pick<ITodo, 'title' | 'completed'>) => Api.put(`/todos/${id}`, todo);

export const TodoService = {
  getTodos,
  createTodo,
  updateTodo,
};
