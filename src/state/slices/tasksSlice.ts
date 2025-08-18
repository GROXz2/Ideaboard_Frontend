import { StateCreator } from 'zustand';
import Api from '../../client/Api';
import { Task } from '../../types/dto';

export interface TasksSlice {
  tasks: Task[];
  loadTasks: (boardId: string) => Promise<void>;
  createTask: (nodeId?: string) => Promise<Task>;
  updateTask: (task: Task) => Promise<void>;
}

export const createTasksSlice: StateCreator<TasksSlice> = (set, get) => ({
  tasks: [],
  loadTasks: async (boardId) => {
    const res = await Api.get('/tasks', { params: { boardId } });
    set({ tasks: res.data.tasks });
  },
  createTask: async (nodeId) => {
    const res = await Api.post('/tasks', { nodeId });
    set({ tasks: [...get().tasks, res.data.task] });
    return res.data.task;
  },
  updateTask: async (task) => {
    await Api.patch(`/tasks/${task.id}`, task);
    set({ tasks: get().tasks.map((t) => (t.id === task.id ? task : t)) });
  },
});
