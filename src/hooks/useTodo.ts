import { useCallback, useState } from 'react';
import { ITodo } from 'interfaces';
import { TodoService } from 'services';

export const useTodo = () => {
  const [tasks, setTasks] = useState<ITodo[]>([]);

  const getTodos = useCallback(async () => {
    const { status, data } = await TodoService.getTodos();

    if (status !== 200) {
      throw new Error();
    }

    setTasks(data);
  }, []);

  const createTodo = useCallback(async (todo: Pick<ITodo, 'title' | 'completed'>) => {
    const { status } = await TodoService.createTodo(todo);
    if (status !== 201) throw new Error();
  }, []);

  const updateTodo = useCallback(async (id: string, todo: Pick<ITodo, 'title' | 'completed'>) => {
    const { status } = await TodoService.updateTodo(id, todo);
    if (status !== 200) throw new Error();
  }, []);

  return {
    tasks,
    getTodos,
    createTodo,
    updateTodo,
  };
};
